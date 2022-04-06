<!--
 * @Author:  chenang
 * @Date: 2022-04-01 10:56:49
 * @LastEditTime: 2022-04-06 15:48:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sunyard_components_store_vue\src\views\elSelect\index.vue
-->
<template>
  <div>
    <el-table
      :data="data"
      border
      size="mini"
      @selection-change="handleSelectionChange"
      @cell-click="cellClick"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="(item, index) in fields"
        :label="item.title"
        :prop="item.field"
        :key="index"
        :width="item.width ? item.width : 'auto'"
      >
        <template slot-scope="{ row, $index }">
          <span
            v-if="row.edit && row.edit[item.field] && item.type === 'input'"
          >
            <el-input
              v-if="item.type === 'input'"
              v-model="row[item.field]"
              style="width: 100%"
              clearable
              size="mini"
              @blur="item.inputFunc ? item.inputFunc(row) : () => {}"
            ></el-input>
          </span>
          <span v-else-if="item.type && item.type !== 'input'">
            <el-date-picker
              :editable="false"
              v-if="item.type === 'datePicker'"
              value-format="yyyy-MM-dd"
              v-model="row[item.field]"
              style="width: 90%"
              type="date"
              clearable
              size="mini"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-select
              size="mini"
              v-else-if="item.type === 'select'"
              v-model="row[item.field]"
              :disabled="item.isSelectDiasabled"
              :clearable="!item.isNoClearable"
              :multiple="item.multiple || false"
              @change="
                item.changeFunc
                  ? item.changeFunc(row[item.field], row, index)
                  : () => {}
              "
              @visible-change="
                (show) => {
                  item.visibleChange
                    ? item.visibleChange(show, row, index)
                    : () => {}
                }
              "
            >
              <el-option
                v-for="option in item.optionFunc
                  ? item.optionFunc(row)
                  : item.options"
                :key="option.index"
                :label="option.value"
                :value="option.key"
              >
              </el-option>
            </el-select>
          </span>
          <span
            v-else-if="!item.type && item.render"
            :ref="`${item.field}${index}_${$index}`"
          ></span>
          <span v-else>{{ formatVal(item, row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="operation.length > 0" width="100">
        <template slot-scope="scope">
          <el-button
            v-for="(button, index) in operation"
            :key="index"
            v-show="!button.hidden"
            @click.stop="button.click(scope.row)"
            type="text"
            size="small"
            >{{ button.name }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'BaseTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    operation: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      obj: {},
      multipleSelection: [],
    }
  },
  watch: {
    fields: {
      handler(val, oldVal) {
        // this.fieldsSave = val.filter(item => item.render);
      },
      deep: true,
      immediate: true,
    },
    data: {
      handler(val, oldVal) {
        this.$nextTick(() => {
          val &&
            val.map((item, index) => {
              this.fields.map((citem, cindex) => {
                if (!citem.type && citem.render) {
                  let render = null
                  if (typeof citem.render == 'string') {
                    render = new (Vue.extend({
                      template: citem.render,
                      data() {
                        return {
                          row: item,
                          index,
                        }
                      },
                    }))()
                  } else {
                    // render = new (citem.render(item, index))({
                    //   data: {
                    //     row: item,
                    //     index,
                    //   },
                    // })
                  }
                  const str = citem.field + cindex + '_' + index,
                    fieldEL = this.obj[str]
                  this.obj[str] = render.$mount(this.$refs[str][0])
                  console.log(this.obj[str])
                  if (fieldEL) {
                    fieldEL.row = item
                    fieldEL.index = index
                    this.$set(this.obj, str, fieldEL)
                  }
                }
              })
            })
        })
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    console.log(this.$refs)
  },
  methods: {
    formatVal(item, data) {
      var str = data[item.field]
      //表格数据格式化
      return str
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    cellClick(row, column, cell, event) {
      row.edit[column.label] = true
      // if (!row.edit) {
      //   console.log(column.label)
      //   // if(column.label)
      //   // this.fields.map(i =>{
      //   //   i.field === column.label
      //   // })
      //   row.edit = true
      this.$nextTick(() => {
        if (cell.getElementsByTagName('input').length > 0) {
          cell.getElementsByTagName('input')[0].focus()
        }
      })
      // }
    },
  },
}
</script>
<style scoped lan="scss">
.btn-list {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
