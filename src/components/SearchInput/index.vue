<template>
  <el-input
    v-model="searchValue"
    placeholder="请输入搜索内容"
    size="mini"
    clearable
    prefix-icon="el-icon-search"
    @input="searchList"
  ></el-input>
</template>

<script>
/*
$emit 事件
search(searchValue)搜索框输入的回调函数(searchValue) 输入的值
*/
import { antiShake } from '@/utils'
export default {
  data() {
    return {
      searchValue: '',
    }
  },
  computed: {
    searchList() {
      return antiShake(this.listSearch, 500)
    },
  },
  methods: {
    listSearch() {
      this.$emit('search', this.searchValue)
    },
  },
}
</script>

<style>
</style>