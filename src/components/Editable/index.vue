<!--
 * @Author:  chenang
 * @Date: 2022-04-01 10:56:49
 * @LastEditTime: 2022-07-19 09:55:49
 * @LastEditors: chenang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sunyard_components_store_vue\src\views\elSelect\index.vue
-->
<script>
/**
 * props传参
 * height 表格高度
 * data 表格数据
 * fields表格字段信息 
 * {
 *    field: '', 字段名
 *    title: '', 列头名称
 *    type: '',  单元格类型 input select datePicker (输入框，下拉框，日期框)
 *    show: () => true, 是否显示
 *    inputFunc:   //type为inpu时的输入框失焦回调函数
 *    optionFunc/options： //type为select时的下拉框数据
 *    changeFunc(value, row, index):  //type为select时返回下拉框数据改变的回调函数 value 下拉框改变之后的值 row该行表格数据 index该行表格索引
 *    visibleChange(show, row, index) //type为select时返回下拉框收起/打开状态改变的回调函数 show下拉框状态 row该行表格数据 index该行表格索引
 * }
 *  operation操作列按钮信息
 * {
 *    name: '', 操作列按钮名称
 *    click:(row) =>{} 点击回调函数 row 该行数据
 *    hidden: true/false 操作列按钮是否隐藏
 * }
 *
 *
 *
 */
const element = {
  input(h, row, item, index) {
    return (
      <span>
        <el-input
          vModel={row[item.field]}
          style={{ width: '100%' }}
          clearable
          size="mini"
          onBlur={
            item.inputFunc
              ? () => {
                  row.edit[item.field] = false;
                  item.inputFunc(row);
                }
              : (row.edit[item.field] = false)
          }
        ></el-input>
      </span>
    );
  },
  datePicker(h, row, item, index) {
    return (
      <el-date-picker
        class="el-date-picker"
        editable={false}
        value-format="yyyy-MM-dd"
        vModel={row[item.field]}
        style={{ width: '100%' }}
        type="date"
        clearable
        size="mini"
        ref={`datePicker_${index}${row[item.field]}`}
        placeholder="选择日期"
        onFocus={() => {
          this.addpickerHideListener(`datePicker_${index}${row[item.field]}`);
        }}
        onBlur={() => {
          this.removepickerHideListener(
            `datePicker_${index}${row[item.field]}`
          );
        }}
        onChange={
          item.changeFunc
            ? () => {
                item.changeFunc(row[item.field], row, index);
              }
            : () => {}
        }
      ></el-date-picker>
    );
  },
  select(h, row, item, index) {
    return (
      <el-select
        size="mini"
        vModel={row[item.field]}
        disabled={item.isSelectDiasabled}
        clearable={!item.isNoClearable}
        multiple={item.multiple || false}
        style={{ width: '100%' }}
        ref={`select_${index}${row[item.field]}`}
        onChange={
          item.changeFunc
            ? () => {
                item.changeFunc(row[item.field], row, index);
              }
            : () => {}
        }
        onVisible-change={
          item.visibleChange
            ? (show) => {
                item.visibleChange(show, row, index);
                this.visibleChange(show, `select_${index}${row[item.field]}`);
              }
            : () => {
                this.visibleChange(show, `select_${index}${row[item.field]}`);
              }
        }
      >
        {item.optionFunc(row)
          ? item
              .optionFunc(row)
              .map((_) => (
                <el-option
                  key={_.key}
                  label={_.value}
                  value={_.key}
                ></el-option>
              ))
          : item.options.map((_) => (
              <el-option key={_.key} label={_.value} value={_.key}></el-option>
            ))}
      </el-select>
    );
  },
  span(h, row, item) {
    let vNode = [];
    vNode.push(<span class="pad over">{this.formatVal(item, row)}</span>);
    return vNode;
  },
};
function columnSlots(h, item) {
  return {
    default: ({ row, $index }) => {
      return (
        <span>
          {row.edit && row.edit[item.field] && item.type === 'input' ? (
            element[item.type].call(this, h, row, item, $index)
          ) : item.type && item.type !== 'input' ? (
            <span>{element[item.type].call(this, h, row, item, $index)}</span>
          ) : (
            element['span'].call(this, h, row, item)
          )}
        </span>
      );
    },
  };
}
function buttonSlots(h) {
  return {
    default: ({ row, $index }) => {
      return (
        <span class="pad">
          {this.operation.reduce((p, button, index) => {
            if (!button.hidden) {
              p.push(
                <el-button
                  key={index}
                  onClick={() => {
                    button.click(row);
                  }}
                  type="text"
                  size="small"
                >
                  {button.name}
                </el-button>
              );
            }
            return p;
          }, [])}
        </span>
      );
    },
  };
}
export default {
  name: 'Editable',
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
    height: {
      type: Number,
    },
  },
  data() {
    return {
      obj: {},
      editField: [],
      // multipleSelection: [],
    };
  },
  render(h) {
    return (
      <div class="editable" ref="editable">
        <el-table
          data={this.tableData}
          border
          height={this.height}
          size="mini"
          onCell-click={this.cellClick}
          class="table"
        >
          {this.fields.map((item, index) => {
            return (
              <el-table-column
                label={item.title}
                prop={item.field}
                key={index}
                width={item.width ? item.width : 'auto'}
                scopedSlots={columnSlots.call(this, h, item)}
              ></el-table-column>
            );
          })}

          {this.operation.length > 0 && this.fields.length > 0 ? (
            <el-table-column
              label="操作"
              width="100"
              scopedSlots={buttonSlots.call(this, h)}
            ></el-table-column>
          ) : (
            ''
          )}
        </el-table>
      </div>
    );
  },
  computed: {
    tableData() {
      if (this.fields.length > 0 && this.data.length > 0) {
        this.editField = [];
        this.fields.map((item) => {
          if (item.type === 'input') {
            this.editField.push(item.field);
          }
        });
        let edit = Object.create(null);
        this.editField.map((i) => {
          edit[i] = false;
        });
        return this.data.reduce((p, c) => {
          if (c.edit) {
            p.push(c);
          } else {
            this.$set(c, 'edit', edit);
            p.push(c);
          }
          return p;
        }, []);
      }
    },
  },
  methods: {
    addpickerHideListener(refId) {
      let scrollTable = this.$refs.editable.getElementsByClassName(
        'el-table__body-wrapper'
      )[0];
      scrollTable.addEventListener(
        'scroll',
        this.$refs[refId].hidePicker.bind(this)
      );
    },
    removepickerHideListener(refId) {
      let scrollTable = this.$refs.editable.getElementsByClassName(
        'el-table__body-wrapper'
      )[0];
      scrollTable.removeEventListener(
        'scroll',
        this.$refs[refId].hidePicker.bind(this)
      );
    },
    visibleChange(show, refId) {
      let scrollTable = this.$refs.editable.getElementsByClassName(
        'el-table__body-wrapper'
      )[0];
      if (show) {
        scrollTable.addEventListener(
          'scroll',
          this.$refs[refId].blur.bind(this)
        );
      } else {
        scrollTable.removeEventListener(
          'scroll',
          this.$refs[refId].blur.bind(this)
        );
      }
    },
    formatVal(item, data) {
      var str = data[item.field];
      //表格数据格式化
      return str;
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    cellClick(row, column, cell, event) {
      if (this.editField.includes(column.property)) {
        row.edit[column.property] = true;
        this.$nextTick(() => {
          if (cell.getElementsByTagName('input').length > 0) {
            cell.getElementsByTagName('input')[0].focus();
          }
        });
      }
    },
  },
};
</script>
<style  lang="scss" scoped>
// ::v-deep .el-table .el-table__cell {
//   height: 40px;
//   line-height: 40px;
// }
// ::v-deep .el-table .cell {
//   font-size: 12px;
// }
::v-deep .el-table {
  .el-table__row--striped {
    background-color: #f7f9fc;
  }
}

.table {
  ::v-deep .el-table__header th {
    background-color: rgb(237, 240, 245) !important;
    height: 40px;
    color: rgb(102, 102, 102) !important;
    border-right: 1px solid #e6e6e6;
  }
  ::v-deep .el-input__inner {
    box-sizing: border-box;
    height: 34px;
    line-height: 35px;
    // width: 259px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    padding-left: 0px;
    // border: 0px;
  }
  ::v-deep .is-focus .el-input__inner {
    border: 1px solid #409eff;
    border: 0px;
  }
}
.el-date-picker {
  ::v-deep .el-input__inner {
    box-sizing: border-box;
    height: 34px;
    line-height: 35px;
    // width: 259px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    padding-left: 30px;
    // border: 0px;
  }
}
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="scss">
.editable {
  width: 100%;
  .el-table--mini .el-table__cell {
    padding-top: 1px;
    padding-bottom: 0px;
  }
}
</style>
