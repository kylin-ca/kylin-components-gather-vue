<!--
 * @Author: your name
 * @Date: 2022-03-16 15:05:32
 * @LastEditTime: 2022-03-22 17:20:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \kylin-components-gather-vue\src\components\SelectTree\index.vue
-->
<template>
  <el-select
    v-model="selectValue.label"
    placeholder="请选择父级菜单"
    clearable
    size="mini"
    ref="tree"
  >
    <div class="input-b">
      <search-input @search="listSearch"/>
    </div>
    <el-option  value=""  v-show="false" class="option-h"> </el-option>
    <div class="tree-p">
      <el-tree
        highlight-current
        :data="myTreeData"
        size="mini"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="expandedKeys"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }">
          <span
            style="font-size: 12px"
            :class="[data.selected ? 'select' : '']"
            >{{ node.label }}</span
          >
        </span>
      </el-tree>
    </div>
  </el-select>
</template>

<script>
import SearchInput from '../SearchInput'
import { deepCopy } from '@/utils'
export default {
  components: { SearchInput },
  props: {
    // 树形对应
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label',
        }
      },
    },
    treeData: {
      type: Array,
      default: () => {
        return [
          {
            label: '一级 1',
            id: '1',
            children: [
              {
                label: '二级 1-1asdsadsadsadsadsadsadasdassadsadasdasd',
                id: '2',
                children: [
                  {
                    id: '3',
                    label: '三级 1-1-1',
                  },
                ],
              },
            ],
          },
          {
            label: '一级 2',
            id: '4',
            children: [
              {
                label: '二级 2-1',
                id: 5,
                children: [
                  {
                    id: '6',
                    label: '三级 2-1-1',
                  },
                ],
              },
              {
                label: '二级 2-2',
                id: 7,
                children: [
                  {
                    id: '8',
                    label: '三级 2-2-1',
                  },
                ],
              },
            ],
          },
          {
            label: '一级 3',
            id: '9',
            children: [
              {
                id: '10',
                label: '二级 3-1',
                children: [
                  {
                    id: '11',
                    label: '三级 3-1-1',
                  },
                ],
              },
              {
                label: '二级 3-2',
                id: '12',
                children: [
                  {
                    id: '13',
                    label: '三级 3-2-1',
                  },
                ],
              },
            ],
          },
        ]
      },
    },
  },
  watch: {
    treeData: {
      handler: function (newValue) {
        let treeData = deepCopy(newValue)
        this.washTreeData(treeData)
        this.myTreeData = treeData
      },
      immediate: true,
    },
  },
  data() {
    return {
      selectValue: {
        label: '',
        value: ''
      },
      searchValue: '',
      myTreeData: [],
      expandedKeys: [],
      // 存放树形的源数据
    }
  },
  methods: {
    // 树形下拉点击调用
    handleNodeClick(data) {
      if (data.children) return
      console.log(data)
      this.selectValue = {
        ...data
      }
      this.$refs.tree.blur()
    },
    //搜索框回调
    listSearch(value) {
      this.myTreeData = deepCopy(this.treeData)
      this.expandedKeys = []
      this.washTreeData(this.myTreeData)
      if (value === '') return
      this.myTreeData = this.filterTree(this.myTreeData, value)
    },
    //洗一遍数据，增加一些需要的属性
    washTreeData(list) {
      list.forEach((item) => {
        item.selected = false
        if (item.children && item.children.length > 0) {
          this.washTreeData(item.children)
        }
      })
    },
    filterTree(nodes, query) {
      // 条件就是节点的title过滤关键字
      let predicate = function (node) {
        if (node.label.includes(query)) {
          return true
        } else {
          return false
        }
      }
      // 结束递归的条件
      if (!(nodes && nodes.length)) {
        return []
      }
      let children = []
      for (let node of nodes) {
        let subs = this.filterTree(node.children, query)
        if (predicate(node)) {
          node.selected = true
          this.expandedKeys.push(node.id)
          children.push(node)
        } else if (subs && subs.length) {
          node.children = subs
          this.expandedKeys.push(node.id)
          children.push(node)
        }
      }
      return children.length ? children : []
    },
  },
}
</script>
<style lang="scss" scoped>
.select-container {
  padding: 15px 30px;
}
.input-b {
  padding: 0 8px 5px 8px;
}
.tree-p {
  padding: 0 8px;
  height: 220px;
  overflow-y: auto;
}
.select {
  color: #409eff !important;
}
</style>