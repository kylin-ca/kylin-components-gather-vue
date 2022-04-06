<!--
 * @Author: your name
 * @Date: 2022-03-15 14:21:20
 * @LastEditTime: 2022-03-17 11:24:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \kylin-components-gather-vue\src\components\Label\index.vue
-->
<template>
  <div class="label">
    <span></span>
    <p>{{content}}</p>
  </div>
</template>

<script>
/**
 * 信息标签
 * 使用： <info-label>需要插入的文字<info-label>
 */
export default {
  data() {
    return {
      content:''
    }
  },
  created() {
    if (this.$slots.default) {
      // if(this.$slots.default.length > 1){
      //     throw new Error('只能插入一个文本')
      // }
      this.content = this.$slots.default[0].text
      // console.log(this.$slots.default[0].text)
    }
  },
}
</script>

<style lang="scss" scoped>
.label {
  height: 34px;
  padding-left: 10px;
  width: 100%;
  background-color: #edf0f5;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: #666;
  font-size: 12px;
  span {
    display: block;
    width: 8px;
    height: 8px;
    background-color: #666;
    border-radius: 5px;
    margin-right: 8px;
  }
  p{
    padding-top: 1px;
  }
}
</style>