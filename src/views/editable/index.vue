<!--
 * @Author: chenang
 * @Date: 2022-04-01 14:45:11
 * @LastEditTime: 2022-07-19 09:54:26
 * @LastEditors: chenang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sunyard_components_store_vue\src\views\table\index.vue
-->
<template>
  <div class="app-container">
    <Editable :height="600" :data="tableData" :operation="operation" :fields="fields" />
  </div>
</template>

<script>
import Editable from '@/components/Editable';
import { randomString } from '@/utils';
export default {
  components: { Editable },
  data() {
    return {
      operation: [
        {
          name: '新增',
          click: (row) => {
            this.tableData.push({
              id: randomString(),
              date: '2016-05-02',
              name: '王小虎',
              sex: '男',
              address: '1',
            });
            this.$message('新增回调');
          },
        },
        {
          name: '删除',
          click: (row) => {
            this.tableData = this.tableData.filter(
              (item) => item.id !== row.id
            );
            this.$message('删除回调');
          },
        },
      ],
      tableData: [
        {
          id: randomString(),
          date: '2016-05-02',
          name: '王小虎',
          sex: '男',
          address: '2',
        },
      ],
      fields: [
        {
          field: 'name',
          title: '姓名',
          type: 'input',
          show: () => true,
          inputFunc: (row) => {
            this.$message(`输入框的值为${row.name}`);
          },
        },
        {
          field: 'sex',
          title: '性别',
          show: () => true,
        },
        {
          field: 'date',
          title: '日期',
          type: 'datePicker',
          show: () => true,
          width: '300px',
          changeFunc: (value, row, index) => {
            this.$message(`日期框的值改变为${value}`);
          },
        },
        {
          field: 'address',
          title: '地址',
          type: 'select',
          show: () => true,
          width: '300px',
          //  options: [
          //   {
          //       key: '1',
          //       value: '上海市普陀区金沙江路 1516 弄',
          //     },
          //     {
          //       key: '2',
          //       value: '上海市普陀区金沙江路 2000 弄',
          //     },
          // ],
          optionFunc: () => {
            return [
              {
                key: '1',
                value: '上海市普陀区金沙江路 1516 弄',
              },
              {
                key: '2',
                value: '上海市普陀区金沙江路 2000 弄',
              },
            ];
          },
          changeFunc: (value, row, index) => {
            this.$message(`下拉框的值改变为${value}`);
          },
          visibleChange: (show, row, index) => {
            this.$notify.info({
              title: '消息',
              message: `下拉框${show ? '展开' : '收起'}`,
              position: 'bottom-right',
            });
          },
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
</style>