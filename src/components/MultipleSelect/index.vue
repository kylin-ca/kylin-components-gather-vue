<template>
  <el-select
    v-model="myValue"
    collapse-tags
    placeholder="请选择"
    size="mini"
    @blur="onBlur"
  >
    <div class="input-b">
      <search-input @search="listSearch" />
    </div>
    <el-option value="" v-show="false"></el-option>
    <div class="options">
      <div class="noData" v-if="myOptions.length === 0">无数据</div>
      <el-option
        v-for="item in myOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </div>
  </el-select>
</template>

<script>
import SearchInput from '../SearchInput'
import { deepCopy } from '@/utils'
export default {
  components: { SearchInput },
  props: {
    searchKey: {
      type: String,
      default: 'label',
    },
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => {
        return [
          {
            value: '选项1',
            label: '黄金糕',
          },
          {
            value: '选项2',
            label: '双皮奶',
          },
          {
            value: '选项3',
            label: '蚵仔煎',
          },
          {
            value: '选项4',
            label: '龙须面',
          },
          {
            value: '选项5',
            label: '北京烤鸭',
          },
          {
            value: '选项14',
            label: '龙须面',
          },
          {
            value: '选项15',
            label: '北京烤鸭',
          },
        ]
      },
      value: {
        type: String,
        default: '',
      },
    },
  },
  data() {
    return {
      searchValue: '',
      myOptions: [],
      myValue: '',
    }
  },
  watch: {
    options: {
      handler: function (newValue) {
        this.myOptions = deepCopy(newValue)
      },
      immediate: true,
    },
    value: {
      handler: function (newValue) {
        this.myValue = newValue
      },
      immediate: true,
    },
  },
  methods: {
    listSearch(value) {
      this.myOptions = deepCopy(this.options)
      this.optionsFilter(value)
    },
    optionsFilter(value) {
      this.myOptions = this.myOptions.filter((item) =>
        item[this.searchKey].includes(value)
      )
    },
    onBlur() {
      console.log('失去焦距')
    },
  },
}
</script>

<style lang="scss" scoped>
.options-item {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding-left: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f2f6fc;
  }
}
.options {
  height: 180px;
  overflow-y: auto;
}
.noData {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 15px;
  color: #ccc;
}
.btn {
  width: 100%;
  height: 40px;
  padding: 0 5px;
  background-color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-b {
  // width: 100%;
  // padding-left: 8px;
  // width: calc(100% - 16px);
  padding: 0 8px 5px 8px;
}
</style>