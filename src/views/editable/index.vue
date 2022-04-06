<!--
 * @Author: chenang
 * @Date: 2022-04-01 14:45:11
 * @LastEditTime: 2022-04-06 15:47:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sunyard_components_store_vue\src\views\table\index.vue
-->
<template>
  <div class="app-container">
    <Editable :data="tableData" :fields="fields" :operation="operation" />
  </div>
</template>

<script>
import Editable from '@/components/Editable'
export default {
  components: { Editable },
  data() {
    return {
      operation:[
        {
          name: '新增',
          click:(row) =>{
            console.log(row)
          }
        }
      ],
        tableData: [ 
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            edit: {
              name: false,
              date: false
            }
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            edit: {
              name: false,
              date: false
            }
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            edit: {
              name: false,
              date: false
            }
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            edit: {
              name: false,
              date: false
            }
          },
        ],
      fields: [
        {
          field: 'name',
          title: 'name',
          // render: '<div>{{row.name}}</div>'
          type: 'input',
          show: () => true,
          width: '300px',
          inputFunc: (row) =>{
            row.edit.name = false
          }
        },
          {
          field: 'date',
          title: 'date',
          type: 'input',
          show: () => true,
          width: '300px',
          inputFunc: (row) =>{
            row.edit.date = false
          }
        },
        {
          field: 'address',
          title: 'address',
          type: 'select',
          show: () => true,
          optionFunc: () => {
            return [
              {
                key: '上海市普陀区金沙江路 1516 弄',
                value: '上海市普陀区金沙江路 1516 弄',
              },
            ]
          },
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>

</style>