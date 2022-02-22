<template>
  <div
    ref="node"
    :style="nodeContainerStyle"
    @click="clickNode"
    @mouseup="changeNodeSite"
    :class="nodeContainerClass"
    @contextmenu.prevent="contextmenu"
  >
    <!-- 最左侧的那条竖线 -->
    <div class="ef-node-left"></div>
    <!-- 节点类型的图标 -->
    <div class="ef-node-left-ico flow-node-drag">
      <i :class="nodeIcoClass"></i>
    </div>
    <!-- 节点名称 -->
    <div class="ef-node-text" :show-overflow-tooltip="true">
      {{ node.name }}
    </div>
    <!-- 节点状态图标 -->
    <div class="ef-node-right-ico">
      <i
        class="el-icon-circle-check el-node-state-success"
        v-show="node.state === 'success'"
      ></i>
      <i
        class="el-icon-circle-close el-node-state-error"
        v-show="node.state === 'error'"
      ></i>
      <i
        class="el-icon-warning-outline el-node-state-warning"
        v-show="node.state === 'warning'"
      ></i>
      <i
        class="el-icon-loading el-node-state-running"
        v-show="node.state === 'running'"
      ></i>
    </div>
    <div class="config">
      <el-dropdown @command="handleCommand" trigger="click">
        <i class="el-icon-setting"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <!-- <ul class="menv">
        <li>删除</li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: Object,
    activeElement: Object,
  },
  data() {
    return {}
  },
  computed: {
    nodeContainerClass() {
      return {
        'ef-node-container': true,
        'ef-node-active':
          this.activeElement.type == 'node'
            ? this.activeElement.nodeId === this.node.id
            : false,
      }
    },
    // 节点容器样式
    nodeContainerStyle() {
      return {
        top: this.node.top,
        left: this.node.left,
      }
    },
    nodeIcoClass() {
      var nodeIcoClass = {}
      nodeIcoClass[this.node.ico] = true
      // 添加该class可以推拽连线出来，viewOnly 可以控制节点是否运行编辑
      nodeIcoClass['flow-node-drag'] = this.node.viewOnly ? false : true
      return nodeIcoClass
    },
  },
  created() {
    console.log('节点创建')
  },
  methods: {
    //点击菜单
    handleCommand(command) {
      console.log(command)
      switch (command) {
        case 'a':
          this.$emit('delNode', this.node.id)
      }
    },
    // 点击节点
    clickNode() {
      this.$emit('clickNode', this.node.id)
    },
    // 鼠标移动后抬起
    changeNodeSite() {
      // 避免抖动
      // if (
      //   this.node.left == this.$refs.node.style.left &&
      //   this.node.top == this.$refs.node.style.top
      // ) {
      //   return
      // }
      // this.$emit('changeNodeSite', {
      //   nodeId: this.node.id,
      //   left: this.$refs.node.style.left,
      //   top: this.$refs.node.style.top,
      // })
    },
    //鼠标右击
    // contextmenu() {
    //   console.log('右击')
    // },
  }
}
</script>
<style lang="scss" scoped>
// .menv {
//   padding: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #fff;
//   color: #000;
//   font-size: 14px;
//   position: absolute;
//   text-align: center;
//   z-index: 999999;
//   cursor: pointer;
//   border: #E4E7ED solid 1px;
//   li {
//     width: 100px;
//     height: 20px;
//     line-height: 20px;
//     list-style: none;
//   }
// }
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.jtk-overlay {
  cursor: pointer;
  color: #4a4a4a;
}

/*节点的最外层容器*/
.ef-node-container {
  position: absolute;
  display: flex;
  width: 200px;
  height: 32px;
  border: 1px solid #e0e3e7;
  border-radius: 5px;
  background-color: #fff;
}

.ef-node-container:hover {
  /* 设置移动样式*/
  cursor: move;
  background-color: #f0f7ff;
  /*box-shadow: #1879FF 0px 0px 12px 0px;*/
  background-color: #f0f7ff;
  border: 1px dashed #1879ff;
}

/*节点激活样式*/
.ef-node-active {
  background-color: #f0f7ff;
  /*box-shadow: #1879FF 0px 0px 12px 0px;*/
  background-color: #f0f7ff;
  border: 1px solid #1879ff;
}

/*节点左侧的竖线*/
.ef-node-left {
  width: 4px;
  background-color: #1879ff;
  border-radius: 4px 0 0 4px;
}

/*节点左侧的图标*/
.ef-node-left-ico {
  line-height: 32px;
  margin-left: 8px;
}

.ef-node-left-ico:hover {
  /* 设置拖拽的样式 */
  cursor: crosshair;
}

/*节点显示的文字*/
.ef-node-text {
  color: #565758;
  font-size: 12px;
  line-height: 32px;
  margin-left: 8px;
  width: 100px;
  /* 设置超出宽度文本显示方式*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  user-select: none;
}

/*节点右侧的图标*/
.ef-node-right-ico {
  line-height: 32px;
  position: absolute;
  right: 25px;
  color: #84cf65;
  cursor: default;
}
.config {
  line-height: 32px;
  position: absolute;
  right: 10px;
  // color: #84cf65;
  cursor: pointer;
  & i:hover{
    color: #bec1c7;
  }
}

/*节点的几种状态样式*/
.el-node-state-success {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #84cf65;
  cursor: default;
}

.el-node-state-error {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #f56c6c;
  cursor: default;
}

.el-node-state-warning {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #e6a23c;
  cursor: default;
}

.el-node-state-running {
  line-height: 32px;
  position: absolute;
  right: 5px;
  color: #84cf65;
  cursor: default;
}

/*node-form*/
.ef-node-form-header {
  height: 32px;
  border-top: 1px solid #dce3e8;
  border-bottom: 1px solid #dce3e8;
  background: #f1f3f4;
  color: #000;
  line-height: 32px;
  padding-left: 12px;
  font-size: 14px;
}

.ef-node-form-body {
  margin-top: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
}

/* 连线中的label 样式*/
.jtk-overlay.flowLabel:not(.aLabel) {
  padding: 4px 10px;
  background-color: white;
  color: #565758 !important;
  border: 1px solid #e0e3e7;
  border-radius: 5px;
}

/* label 为空的样式 */
// .emptyFlowLabel {
// }

.ef-dot {
  background-color: #1879ff;
  border-radius: 10px;
}

.ef-dot-hover {
  background-color: red;
}

.ef-rectangle {
  background-color: #1879ff;
}

.ef-rectangle-hover {
  background-color: red;
}

.ef-drop-hover {
  border: 1px dashed #1879ff;
}
</style> 