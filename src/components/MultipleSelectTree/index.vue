<template>
  <div>
    <el-select
      v-model="selectArr"
      ref="select"
      placeholder="请选择"
      multiple
      :style="{ width: width }"
      @visible-change="selectVisibleChange"
      @change="changeSelect"
      @remove-tag="selectRemoveTag"
    >
      <el-option :label="value" :value="value"> </el-option>
      <div class="popover-box" :style="{ width: width, height: height }">
        <div class="filter-text">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            @input="inputEvent"
          >
          </el-input>
        </div>
        <!--
          default-expanded-keys: 默认展开的节点的 key 的数组
          default-checked-keys：默认勾选的节点的 key 的数组 用于有勾选框
          show-checkbox: 节点是否可被选择
          current-change: 当前选中节点变化时触发的事件 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象
        -->
        <div class="tree">
          <el-scrollbar>
            <el-tree
              ref="tree"
              :node-key="defalutKey"
              show-checkbox
              accordion
              :data="data"
              :default-expanded-keys="defaultOpenList"
              :props="defaultProps"
              :default-checked-keys="defaultChecked"
              :filter-node-method="filterNode"
              @node-expand="nodeExpandEvent"
            />
          </el-scrollbar>
        </div>
        <div class="buttons">
          <el-button @click="handleConfirm" type="primary" plain size="mini"
            >确定</el-button
          >
          <el-button @click="handleSelectAll" size="mini">全选</el-button>
          <el-button @click="handleEmpty" size="mini">清空</el-button>
          <el-button @click="handleCancel" type="info" plain size="mini"
            >取消</el-button
          >
        </div>
      </div>
    </el-select>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  props: {
    // 定义select宽度
    width: {
      type: String,
      default: '280px'
    },
    // 定义下拉框的高度
    height: {
      type: String,
      default: '400px'
    },
    // 默认选中
    selectedList: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 数据源
    selectDataList: {
      type: Array,
      require: true
    },
    // 默认key
    defalutKey: {
      type: String,
      default: 'id'
    },
    // 默认
    defaultProps: {
      type: Object,
      default: () => {
        return {
          value: 'id',
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  data () {
    return {
      data: [],
      filterText: '',
      temporaryList: [], // 临时数组，回显树勾选状态时使用
      nodeExpandId: null, // 存储展开树的ID
      value: '', // options
      defaultChecked: [], // 默认选中的值
      defaultOpenList: [], // 默认展开的选项数组
      selectArr: [] // 选择栏绑定值
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
    this.data = this.selectDataList
    // 树默认展开
    this.defaultOpenList = [this.selectDataList[0][this.defaultProps.value]]
    // 去除下拉框自带的滚动条
    this.initScroll()
    this.$nextTick(() => {
      if (this.selectedList.length) {
        const changeSelectDataList = this.treeToArr(this.selectDataList)
        this.selectedList.forEach(item => {
          changeSelectDataList.forEach(val => {
            if (item === val[this.defaultProps.value]) {
              this.selectArr.push(val[this.defaultProps.label])
            }
          })
        })
        this.selectArr = [...new Set(this.selectArr)]
      }
    })
  },
  methods: {
    // 动态设置树的属性和属性值，并变成平级结构
    treeToArr (data, pid = null, res = []) {
      data.forEach(item => {
        res.push({ pid: pid, [this.defaultProps.value]: item[this.defaultProps.value], [this.defaultProps.label]: item[this.defaultProps.label] })
        if (item[this.defaultProps.children] && item[this.defaultProps.children].length !== 0) {
          this.treeToArr(item[this.defaultProps.children], item[this.defaultProps.value], res)
        }
      })
      return res
    },
    // 初始化滚动条
    initScroll () {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => { ele.style.width = 0 })
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    changeSelect (list) {
      // 设置当前节点的选中状态 val 为数组， 第二个参数为 是否选中
      const treeCheckedIdList = []
      const changeSelectDataList = this.treeToArr(this.selectDataList)
      changeSelectDataList.forEach(item => {
        list.forEach(checked => {
          if (checked === item[this.defaultProps.label]) {
            treeCheckedIdList.push(item[this.defaultProps.value])
          }
        })
      })
      this.$refs.tree.setCheckedKeys(treeCheckedIdList, false)
    },
    handleConfirm () {
      this.selectArr = []
      // 只获取最终的子节点
      let selectTreeNode = this.$refs.tree.getCheckedNodes().map(item => {
        if (!item[this.defaultProps.children] || item[this.defaultProps.children].length === 0) {
          return item
        }
      })
      // 过滤掉为undefined的值
      selectTreeNode = selectTreeNode.filter(item => item !== undefined)
      this.temporaryList = selectTreeNode
      selectTreeNode && selectTreeNode.length && selectTreeNode.forEach(item => {
        this.selectArr.push(item[this.defaultProps.label])
      })
      const selectedList = selectTreeNode.map(item => item[this.defaultProps.value])
      this.$emit('update:selectedList', selectedList)
      // 关闭弹出框
      this.$refs.select.blur()
    },
    handleSelectAll () {
      const selectDataList = this.treeToArr(this.selectDataList)
      selectDataList.forEach(item => {
        this.$refs.tree.setChecked(item, true)
      })
    },
    // select输入框移除tag
    selectRemoveTag (value) {
      const selectDataList = this.treeToArr(this.selectDataList)
      selectDataList.forEach(item => {
        if (item[this.defaultProps.label] === value) {
          this.$refs.tree.setChecked(item, false)
          const selectedList = this.selectedList.filter(val => item[this.defaultProps.value] !== val)
          this.$emit('update:selectedList', selectedList)
        }
      })
    },
    handleEmpty () {
      this.$refs.tree.setCheckedKeys([])
      this.filterText = null
      this.selectArr = []
      this.$emit('update:selectedList', [])

    },
    // 下拉框线索/隐藏时触发
    selectVisibleChange (status) {
      if (!status && this.selectArr.length === 0) {
        this.handleCancel()
      }
      if (status) {
        this.$refs.tree.getCheckedNodes().forEach(item => {
          this.$refs.tree.setChecked(item, false)
        })
        // 解决点击空白勾选状态取消问题
        this.temporaryList.forEach(item => {
          this.$refs.tree.setChecked(item, true)
        })
      }
      // 在树中回显后端返回已勾选数据
      if (status && this.selectedList) {
        this.$refs.tree.setCheckedKeys(this.selectedList, false)
        // 通过递归展开父级
        for (let i = 0; i < this.selectedList.length; i++) {
          this.fondParentId(this.selectedList[i])
        }
      }
    },
    fondParentId (key) {
      const selectDataList = this.treeToArr(this.selectDataList)
      selectDataList.forEach(item => {
        if (item.pid === 0) {
          this.defaultOpenList.push(key)
        } else {
          if (key === item[this.defaultProps.value]) {
            this.defaultOpenList.push(key)
            this.fondParentId(item.pid)
          }
        }
      })
      // 展开数据去重处理
      this.defaultOpenList = [... new Set(this.defaultOpenList)]
    },
    // 取消
    handleCancel () {
      this.handleEmpty()
      // 关闭下拉框
      this.$refs.select.blur()
    },
    inputEvent (value) {
      if (value === '') {
        this.selectDataList.forEach(item => {
          if (item[this.defaultProps.value] === this.nodeExpandId) {
            this.$refs.tree.store.nodesMap[this.nodeExpandId].expanded = true
          } else {
            this.$refs.tree.store.nodesMap[item[this.defaultProps.value]].expanded = false
          }
        })
      }
    },
    // 树节点展开
    nodeExpandEvent (node) {
      this.nodeExpandId = node[this.defaultProps.value]
    }
  }
}
</script>

<style>
.el-select-dropdown__wrap {
  max-height: 400px !important;
}
</style>
<style scoped>
.el-select-dropdown__item {
  display: none;
}

.el-select-dropdown__list {
  padding: 0px !important;
}

.el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.popover-box {
  margin-top: -6px;
  box-sizing: border-box;
}
.filter-text {
  width: 94%;
  margin: 4px auto 6px;
}
.buttons {
  padding: 6px 12px 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

::v-deep .el-tree {
  width: 100%;
  height: 310px;
  overflow: scroll;
  box-sizing: border-box;
}

::v-deep .el-tree > .el-tree-node {
  display: inline-block;
  min-width: 100%;
}

::v-deep .el-icon-caret-right:before {
  content: '\e7a0';
  font-size: 16px;
}
::v-deep .expanded:before {
  content: '\e7a2';
  font-size: 16px;
}
::v-deep .expanded {
  -webkit-transform: rotate(0deg) !important;
  transform: rotate(0deg) !important;
}
</style>
