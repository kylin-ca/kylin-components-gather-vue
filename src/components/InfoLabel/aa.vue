<template>
  <div class="container">
    <!-- select选择器 -->
    <el-select
      v-model="valueTitle"
      placeholder="请选择"
      ref="select"
      :title="valueTitle"
      style="width: 100%"
      @visible-change="visibleChange"
      @change="selectChange"
      size="mini"
    >
      <!-- 搜索框 -->
      <el-input
        class="selectInput"
        placeholder="检索关键字"
        v-model="filterText"
        clearable
        size="mini"
      >
      </el-input>
      <!-- option -->
      <div style="max-height: 274px" ref="treeContainer">
        <el-option :label="valueTitle" :value="valueTitle">
          <!-- tree结构 -->
          <el-tree
            class="tree"
            :data="newList"
            :props="defaultProps"
            size="mini"
            accordion
            :filter-node-method="filterNode"
            :node-key="defaultProps.value"
            :current-node-key="curtId"
            :default-expanded-keys="expandedList"
            @node-click="handleNodeClick"
            @node-expand="nodeExpandEvent"
            ref="selectTree"
            :highlight-current="true"
          >
            <span
              style="font-size: 12px"
              class="custom-tree-node"
              slot-scope="{ node, data }"
            >
              <span
                style="font-size: 12px"
                :class="{
                  active: setColor(data, filterText),
                  selectActive: isSelect(data),
                }"
                >{{ node.label }}</span
              >
            </span>
          </el-tree>
        </el-option>
      </div>
      <div class="btn">
        <el-button @click="btnClick" size="small">取消</el-button>
      </div>
    </el-select>
  </div>
</template>


<script>
import { scrollTo } from '@/publicFile/utils/scroll-to'
export default {
  watch: {
    filterText(val) {
      if (val) {
        this.$refs.selectTree.filter(val)
      }
    },
    list: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            // console.log(val,"000000000000")
            this.newList = val
          })
        }
      },
      immediate: true,
    },
    curtId: {
      handler(val) {
        this.$nextTick(() => {
          this.initial()
        })
      },
      immediate: true,
    },
    defaultValue: {
      handler(val) {
        if (val) {
          this.valueTitle = val
        } else {
          this.valueTitle = ''
        }
      },
      immediate: true,
    },
    valueTitle(val) {
      if (val) {
        this.selectChange(val)
      }
    },
  },
  props: {
    /* 配置项 */
    defaultProps: {
      type: Object,
      default: () => {
        return {
          // label: '',
          // value: '',
          // children: 'children'
        }
      },
    },
    /* 选项列表数据(树形结构的对象数组) */
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 默认Id
    curtId: {
      type: [Number, String],
      // required: true
    },
    //默认选中的值
    defaultValue: {
      default: '',
    },
  },
  data() {
    return {
      valueTitle: '', // select绑定的值
      filterText: '', // input绑定的值
      nodeExpandId: null, // 展开节点的id
      expandedList: [], // 默认展开的节点
      newList: [],
    }
  },
  mounted() {
    this.initScroll() // 调用初始化滚动条
    // this.initial() // 调用初始值
  },
  methods: {
    // 取消按钮
    btnClick() {
      this.valueTitle = '' //select框置空
      this.$refs.selectTree.setCurrentKey(null)
      this.$refs.select.blur() // 收起下拉框
      this.$emit('cancelEvent', '')
    },
    // 下拉框出现/隐藏时触发 让select框的值高亮显示
    visibleChange(flag) {
      if (flag) {
        this.$nextTick(() => {
          console.log(
            this.$refs.treeContainer.getElementsByClassName('el-tree')[0]
              .scrollHeight,
            this.$refs.treeContainer.getElementsByClassName('el-tree')[0]
              .clientHeight
          )
        })
        // setTimeout(() =>{
        //   console.log(
        //     this.$refs.treeContainer.getElementsByTagName('li')[0].scrollHeight
        //   )
        // },3000)
        setTimeout(() => {
          let top =
            this.$refs.treeContainer.getElementsByClassName('el-tree')[0]
              .offsetTop
          scrollTo(
            top - 120,
            500,
            () =>{},
            this.$refs.treeContainer.getElementsByClassName('el-tree')[0]
          )
          console.log(
            this.$refs.treeContainer.getElementsByClassName('is-current')[0]
              .offsetTop
          )
        }, 3000)
        if (this.curtId) {
          // 默认展开
          this.expandedList = [this.curtId]
          if (this.valueTitle) {
            //如果 select框 有值高亮 没值不高亮
            // 默认高亮
            this.$refs.selectTree.setCurrentKey(this.curtId)
          }
        }
      }
      this.$emit('visibleChange', flag)
    },
    // 父节点颜色
    isSelect(data) {
      return data.nodeType === '1'
    },
    // 初始化值
    initial() {
      if (this.curtId) {
        // 默认回显值
        // console.log(this.curtId)
        // setTimeout(() =>{
        //  console.log()
        // },3000)
        this.$nextTick(() => {
          if (this.$refs.selectTree.getNode(this.curtId)) {
            this.valueTitle = this.$refs.selectTree.getNode(this.curtId).data[
              this.defaultProps.label
            ]
            // console.log(this.valueTitle)
          }
        })
        // 默认展开
        this.expandedList = [this.curtId]
        // 默认高亮
        this.$refs.selectTree.setCurrentKey(this.curtId)
      }
    },
    // 搜索框匹配到的数据改变颜色
    setColor(data, findValue) {
      if (!findValue) {
        return false
      }
      return data[this.defaultProps.label].includes(findValue)
    },
    // 模糊查询
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll(
          '.el-scrollbar .el-select-dropdown__wrap'
        )
        const scrollBar = document.querySelectorAll(
          '.el-scrollbar .el-scrollbar__bar'
        )
        if (scrollWrap && scrollBar) {
          scrollWrap.forEach((e) => {
            e.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
          })
          // scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
          scrollBar.forEach((ele) => {
            ele.style.width = 0
          })
        }
      })
    },
    // tree的点击事件
    handleNodeClick(node) {
      if (node.nodeType === '2') {
        this.valueTitle = node[this.defaultProps.label] // 获取label
      } else {
        return
      }
      this.$emit('changeSelect', node) //讲选中的值传出去
      this.$refs.select.blur() // 收起下拉框
    },
    nodeExpandEvent(node) {
      this.nodeExpandId = node[this.defaultProps.value]
    },
    selectChange(param) {
      this.$emit('selectChange', param)
    },
  },
}
</script>


<style scoped>
.selectInput {
  width: 96%;
  margin: 0 2%;
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: 100%;
  /* width: 222px; */
  /* width: 100%; */
  background-color: #fff;
  width: auto;
  overflow: auto;
  padding: 0;
}
.el-tree {
  overflow: auto;
  width: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
/* 按钮 */
.footer {
  display: flex;
  justify-content: right;
  align-items: center;
}
.footer button {
  margin-left: 10px;
  border: 1px solid black;
  background-color: '#fff';
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item[data-v-28aa128f] {
  background-color: #fff;
}
/* 未展开 */
::v-deep .el-icon-caret-right:before {
  content: '\e7a0';
  font-size: 16px;
}
/* 展开 */
::v-deep .expanded:before {
  content: '\e7a2';
  font-size: 16px;
}
/*  // 展开不旋转 */
::v-deep .expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.active {
  color: #409eff;
}
::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  color: #409eff;
}
.selectActive {
  color: #606266;
}
::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #fff;
}
::v-deep .el-input--suffix .el-input__inner {
  text-overflow: ellipsis;
}
.btn {
  /* margin: 0 auto; */
  padding-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: #f2f6fc solid 1px;
}
</style>
