<!--
 * @Author: your name
 * @Date: 2022-03-16 15:05:32
 * @LastEditTime: 2022-03-16 16:56:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \kylin-components-gather-vue\src\components\SelectTree\index.vue
-->
<template>
  <el-select
    v-model="selectValue"
    placeholder="请选择父级菜单"
    style="width: 80%"
    clearable
    size="mini"
    ref="tree"
  >
    <div class="input-b">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        size="mini"
      >
      </el-input>
    </div>
    <el-option value="searchValue" v-show="false" class="option-h"> </el-option>
    <div class="tree-p">
      <el-tree
        highlight-current
        :data="pidData"
        size="mini"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="btn-List"><el-button size="mini">默认按钮</el-button>
  <el-button type="primary" size="mini">主要按钮</el-button>
  <el-button type="success" size="mini">成功按钮</el-button>
  <el-button type="info" size="mini">信息按钮</el-button></div>
  </el-select>
</template>

<script>
export default {
  props: {
    select: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectValue: '',
      searchValue: '',
      // 存放树形的源数据
      pidData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      // 树形对应
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      // 选中一条数据的name和id，给值 el-option
    }
  },
  methods: {
    // 树形下拉点击调用
    handleNodeClick(data) {
      this.selectValue = data.label
      this.$refs.tree.blur()
    },
  },
}
</script>
<style lang="scss" scoped>
.select-container {
  padding: 15px 30px;
}
.sel-foot {
  width: 100%;
  background-color: #ebeef5;
  height: 40px;
}
.btn-List {
  width: 100%;
  height: 40px;
  background-color: #e6e6e6;
}
.input-b {
  padding: 0 8px 5px 8px;
}
.tree-p {
  padding: 0 8px;
  height: 180px;
  overflow-y: auto;
}
</style>