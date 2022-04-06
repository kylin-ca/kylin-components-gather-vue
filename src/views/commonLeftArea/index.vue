<!--
 * @Author: your name
 * @Date: 2022-03-14 09:39:31
 * @LastEditTime: 2022-03-17 11:22:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \kylin-components-gather-vue\src\views\commonLeftArea\index.vue
-->
<template>
  <div class="main">
    <div class="list-container">
      <left-list-area
        @add="add"
        @del="del"
        @modify="modify"
        @searchHandle="listSearch"
      />
    </div>
    <div class="table-container">
      <el-row :gutter="20">
        <el-col :span="12"> <info-label>规则名称：</info-label></el-col>
        <el-col :span="12"> <info-label>定价单元结构：</info-label></el-col>
      </el-row>
      <search-input @search="tableSearch" class="search" />
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        height="calc(100% - 120px)"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        size="mini"
        stripe
      >
        <el-table-column prop="date" label="定价单元" align="center">
        </el-table-column>
        <el-table-column prop="address" label="曲线名称" align="center">
          <template slot-scope="{ row }">
            <el-select v-model="row.address" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-list">
        <el-button size="mini">默认按钮</el-button>
        <el-button type="primary" size="mini">主要按钮</el-button>
        <el-button type="success" size="mini">成功按钮</el-button>
        <el-button type="info" size="mini">信息按钮</el-button>
        <el-button type="warning" size="mini">警告按钮</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import LeftListArea from '@/components/LeftListArea'
import InfoLabel from '@/components/InfoLabel'
import SearchInput from '@/components/SearchInput'
export default {
  components: { LeftListArea, InfoLabel, SearchInput },
  data() {
    return {
      options: [
        {
          value: '上海市普陀区金沙江路 1518 弄',
          label: '黄金糕',
        },
        {
          value: '上海市普陀区金沙江路 1517 弄',
          label: '双皮奶',
        },
        {
          value: '上海市普陀区金沙江路 1516 弄',
          label: '蚵仔煎',
        },
        {
          value: '上海市普陀区金沙江路 1519 弄',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '上海市普陀区金沙江路 1519 弄',
        },
      ],
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
            },
          ],
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      tableData1: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true,
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  methods: {
    add() {
      console.log('新增')
    },
    del(item) {
      console.log('删除', item)
    },
    modify(item) {
      console.log('修改', item)
    },
    //左侧列表搜索
    listSearch(value) {
      console.log('列表搜索', value)
    },
    //表格搜索
    tableSearch(value) {
      console.log('表格搜索', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 15px;
  height: calc(100vh - 50px);
  display: flex;
  .list-container {
    height: 100%;
    width: 320px;
  }
  .table-container {
    padding: 10px 0 0 16px;
    width: calc(100% - 320px);
    position: relative;
    .search {
      margin: 10px 0;
      width: 500px;
    }
  }
  .btn-list {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>