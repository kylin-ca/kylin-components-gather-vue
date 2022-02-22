<template>
  <div class="flow-container">
    <el-row>
      <el-col :span="4">
        <draggable-tree />
      </el-col>
      <el-col :span="20">
        <div class="btn-list">
          <!-- <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delNode"
          ></el-button> -->
        </div>
        <div
          id="efContainer"
          ref="efContainer"
          class="container"
          @drop="drop"
          @dragover="allowDrop"
        >
          <!-- 给画布一个默认的宽度和高度 -->
          <template v-for="node in nodeList">
            <flow-node
              :id="node.id"
              :key="node.id"
              :node="node"
              :activeElement="activeElement"
              @changeNodeSite="changeNodeSite"
              @clickNode="clickNode"
              @delNode="delNode"
            >
            </flow-node>
          </template>
        </div>
      </el-col>
    </el-row>
    <el-drawer
      title="连线信息"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <div style="padding: 0 15px">
        <el-form ref="lineForm" :model="lineForm" label-width="80px">
          <el-form-item label="连线描述:">
            <el-input v-model="lineForm.label"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="drawer = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import DraggableTree from './components/DraggableTree'
import './jsplumb/jsplumb'
import flowNode from './components/Node'
import { easyFlowMixin } from './mixins'
import { nodeList, lineList } from './nodeList'
import { getUUID } from '@/utils'
export default {
  name: 'FlowContainer',
  mixins: [easyFlowMixin],
  components: { DraggableTree, flowNode },
  data() {
    return {
      lineForm: {
        from: '',
        to: '',
        label: '', //描述
      },
      drawer: false, //抽屉
      jsPlumb: null, //jsPlumb实例
      nodeList: [...nodeList], //节点数据
      lineList: [], //连线数据
      // 是否加载完毕标志位
      loadEasyFlowFinish: false,
      // 激活的元素、可能是节点、可能是连线
      activeElement: {
        // 可选值 node 、line
        type: undefined,
        // 节点ID
        nodeId: undefined,
        // 连线ID
        sourceId: undefined,
        targetId: undefined,
        flowLineMousedown: false,
        flowLineStatus: false, //防止拖动连线生成节点
      },
    }
  },
  created() {
    window.oncontextmenu = function (e) {
      //取消默认的浏览器自带右键
      e.preventDefault()
    }
    console.log(this.nodeList)
    // console.log(this.lineList)
    //  window.onclick = function (e) {
    //  console.log(e)
    // }
  },
  mounted() {
    this.jsPlumb = jsPlumb.getInstance()
    this.$nextTick(() => {
      this.jsPlumbInit()
      this.$nextTick(() => {
        this.initFlowChart()
      })
    })
  },
  methods: {
    //抽屉关闭回调
    handleClose(done) {
      Object.assign(this.lineForm, {
        label: '',
        from: '',
        to: '',
      })
      done()
    },
    onSubmit() {
      const { label, from, to } = this.lineForm
      this.setLineLabel(from, to, label)
      this.drawer = false
    },
    //拖动放置节点
    drop(e) {
      e.preventDefault()
      let data, nodeName, nodeData
      try {
        data = JSON.parse(e.dataTransfer.getData('Text'))
        nodeName = data.nodeName
        nodeData = data.nodeData
        if (nodeName !== 'my-draggable-node') {
          throw new Error('不是可拖拽的节点!')
        }
      } catch (error) {
        throw new Error('不是可拖拽的节点!')
      }
      let { offsetHeight, offsetWidth } = this.$refs.efContainer
      let { offsetX: x, offsetY: y } = e
      y = y - 16 < 0 ? 0 : y + 16 > offsetHeight ? offsetHeight - 32 : y - 16
      x = x - 100 < 0 ? 0 : x + 100 > offsetWidth ? offsetWidth - 200 : x - 85
      this.addNode(nodeData, x, y)
    },
    //鼠标允许拖拽的标识
    allowDrop(e) {
      e.preventDefault()
      return false
      // console.log(e)
    },
    //增加节点
    addNode(data, x, y) {
      // console.log(data)
      let node = {
        id: getUUID(),
        name: data,
        // type: 'task',
        left: x + 'px',
        top: y + 'px',
        ico: 'el-icon-present',
      }
      this.nodeList.push(node)
      this.$nextTick(() => {
        this.nodeDraggable(node)
        // 节点可连线
        this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions)
        this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions)
      })
    },
    //初始化 jsPlmb
    jsPlumbInit() {
      this.jsPlumb.ready(() => {
        //   导入默认配置
        this.jsPlumb.importDefaults(this.jsplumbSetting)
        // 会使整个jsPlumb立即重绘。
        this.jsPlumb.setSuspendDrawing(false, true)
        // 单点击了连接线, https://www.cnblogs.com/ysx215/p/7615677.html
        this.jsPlumb.bind('click', (conn, originalEvent) => {
          this.lineForm.label = conn.getLabel()
          this.lineForm.from = conn.sourceId
          this.lineForm.to = conn.targetId
          this.drawer = true
          // console.log(conn.getLabel())
          // this.activeElement.type = 'line'
          // this.activeElement.sourceId = conn.sourceId
          // this.activeElement.targetId = conn.targetId
          // console.log(conn)
          // this.$refs.nodeForm.lineInit({
          //   from: conn.sourceId,
          //   to: conn.targetId,
          //   label: conn.getLabel(),
          // })
        })
        // 连线
        this.jsPlumb.bind('connection', (evt) => {
          let from = evt.source.id
          let to = evt.target.id
          // console.log(from)
          // console.log(to)
          // if (this.loadEasyFlowFinish) {
          //   this.lineList.push({ from: from, to: to })
          // }
          this.lineList.push({ from: from, to: to })
        })
        // 连线右击
        this.jsPlumb.bind('contextmenu', (evt) => {
          this.$confirm('确定删除该条连线吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              var conn = this.jsPlumb.getConnections({
                source: evt.sourceId,
                target: evt.targetId,
              })[0]
              this.jsPlumb.deleteConnection(conn)
              this.$notify({
                title: '提示',
                message: '删除成功!',
                type: 'success',
              })
            })
            .catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '已取消删除',
              // })
            })

          // console.log('contextmenu', evt)
        })
        // 删除连线回调
        this.jsPlumb.bind('connectionDetached', (evt) => {
          this.deleteLine(evt.sourceId, evt.targetId)
        })
        // 改变线的连接节点
        this.jsPlumb.bind('connectionMoved', (evt) => {})
        // 连线
        this.jsPlumb.bind('beforeDrop', (evt) => {
          // let from = evt.sourceId
          // let to = evt.targetId
          // if (from === to) {
          //   this.$message.error('节点不支持连接自己')
          //   return false
          // }
          // if (this.hasLine(from, to)) {
          //   this.$message.error('该关系已存在,不允许重复创建')
          //   return false
          // }
          // if (this.hashOppositeLine(from, to)) {
          //   this.$message.error('不支持两个节点之间连线回环')
          //   return false
          // }
          // this.$message.success('连接成功')
          return true
        })
        // beforeDetach
        this.jsPlumb.bind('beforeDetach', (evt) => {
          console.log('beforeDetach', evt)
        })
      })
    },
    //初始化流程图
    initFlowChart() {
      this.nodeList.map((item) => {
        this.nodeDraggable(item)
      })
      this.setLine()
    },
    //节点可拖动
    nodeDraggable(node) {
      this.jsPlumb.draggable(node.id, {
        containment: 'parent',
        stop: function (el) {
          // 拖拽节点结束后的回调
          console.log('拖拽结束: ', el)
        },
      })
    },
    //初始化连线
    setLine() {
      ;[...lineList].map((item) => {
        let connParam = {
          source: item.from,
          target: item.to,
          label: item.label,
          // connector: item.connector ? item.connector : undefined, //连线类型  字段对应的配置项可查看 mixins.js文件
          // anchors: item.anchors ? item.anchors : undefined,
          // paintStyle: item.paintStyle ? item.paintStyle : undefined,
        }
        this.jsPlumb.connect(connParam, this.jsplumbConnectOptions)
      })
    },
    // //连接
    // connect() {
    //   let connParam = {
    //     source: '1',
    //     target: '2',
    //   }
    //   this.jsPlumb.connect(connParam, this.jsplumbConnectOptions)
    //   this.setLineLabel()
    //   // this.$nextTick(() => {
    //   //   jsPlumb.addEndpoint('1', {
    //   //   anchors: ['Right']
    //   // })

    //   // jsPlumb.addEndpoint('1', {
    //   //   anchor: 'Left'
    //   // })

    //   // jsPlumb.addEndpoint('2', {
    //   //   anchor: 'Right'
    //   // })
    //   // })
    // },

    //重绘
    repaintEverything() {
      this.jsPlumb.repaint()
    },
    // 设置连线条件
    setLineLabel(from, to, label) {
      var conn = this.jsPlumb.getConnections({
        source: from,
        target: to,
      })[0]
      console.log(
        this.jsPlumb.getConnections({
          source: from,
          target: to,
        })
      )
      if (!label || label === '') {
        conn.removeClass('flowLabel')
        conn.addClass('emptyFlowLabel')
      } else {
        conn.addClass('flowLabel')
      }
      conn.setLabel({
        label: label,
      })
      this.lineList.forEach(function (line) {
        if (line.from == from && line.to == to) {
          line.label = label
        }
      })
      this.$nextTick(() => {
        this.repaintEverything()
      })
    },
    //点击节点
    clickNode(nodeId) {
      this.activeElement.nodeId = nodeId
      this.activeElement.type = 'node'
      // console.log(this.activeElement.nodeId)
    },
    // 删除线
    deleteLine(from, to) {
      this.lineList = this.lineList.filter(function (line) {
        if (line.from == from && line.to == to) {
          return false
        }
        return true
      })
    },
    //删除节点
    delNode(nodeId) {
      // console.log(this.lineList)
      // const { nodeId } = this.activeElement
      this.$confirm('确定要删除选中节点' + nodeId + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
      })
        .then(() => {
          /**
           * 这里需要进行业务判断，是否可以删除
           */
          this.nodeList = this.nodeList.filter(function (node) {
            if (node.id === nodeId) {
              return false
            }
            return true
          })
          this.$nextTick(function () {
            this.jsPlumb.removeAllEndpoints(nodeId)
            this.$notify({
              title: '提示',
              message: '删除成功!',
              type: 'success',
            })
            console.log(this.lineList)
          })
        })
        .catch(() => {})
      return true
    },
    // 改变节点的位置
    changeNodeSite(data) {
      // for (var i = 0; i < this.nodeList.length; i++) {
      //   let node = this.nodeList[i]
      //   if (node.id === data.nodeId) {
      //     node.left = data.left
      //     node.top = data.top
      //   }
      // }
    },
    // destroyed() {
    //   this.jsPlumb = null
    // },
  },
}
</script>

<style lang="scss" scoped>
.flow-container {
  padding: 15px;
}
.btn-list {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.container {
  width: 100%;
  height: 800px;
  position: relative;
  border: #dcdfe6 1px solid;
  background: url('../../assets/line.svg');
  background-size: 20px;
}
</style>