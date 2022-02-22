<!--
 * @Author: your name
 * @Date: 2022-02-07 16:03:16
 * @LastEditTime: 2022-02-07 16:18:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-admin-template-master\src\views\fullyDisplay\index.vue
-->
<template>
  <div class="fullyDisplay-container">
    <Aside>内容超出显示内容</Aside>
    <div style="display: flex">
      <div class="text" v-fullyDisplay>我没有超出</div>
      <div class="text" v-fullyDisplay>我的描述内容太多了，超出了，后面省略号显示。</div>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/Aside'
import fullyDisplay from '@/directive/fullyDisplay/index.js'
export default {
  components: { Aside },
  directives: {
    fullyDisplay,
  },
}
</script>

<style lang="scss" scoped>
.fullyDisplay-container {
  padding: 15px 30px;
}
.text {
  width: 100px;
  height: 30px;
  background-color: #dcdfe6;
  cursor: pointer;
  color: #000;
  margin-right: 15px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>