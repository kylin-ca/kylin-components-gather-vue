<template>
  <el-input
    v-model="childVal"
    @input="inputChange"
    placeholder="请输入内容"
  ></el-input>
</template>

<script>
export default {
  props: {
    // 子组件接收值
    // 必须要使用value
    value: { type: String, default: '' },
  },
  data() {
    return {
      childVal: '',
    }
  },
  methods: {
    inputChange(value) {
      console.log('子组件的值', value)
      this.$emit('input', value) // 这儿必须用input 发送数据，发送的数据会被父级v-model="inputVal"接收到，再被value=inputVal传回来。
    },
  },
}
</script>

<style>
</style>