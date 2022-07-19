<!--
 * @Author: your name
 * @Date: 2022-02-07 17:15:10
 * @LastEditTime: 2022-07-19 09:48:45
 * @LastEditors: chenang
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-admin-template-master\src\views\elscroll\index.vue
-->
<template>
  <div class="elscroll-container">
    <Aside>ele的隐藏组件，滚动条</Aside>
    <div class="scroll">
      <el-scrollbar  style="height: 100%" ref="scrollMenuRef"> 
          <ul>
              <li v-for="(item,index) in new Array(50)" :key="index">我是列表</li>
          </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/Aside'
export default {
  components: { Aside },
}
</script>
<style lang="scss" scoped>
.elscroll-container {
  padding: 15px 30px;
  li{
      list-style: none;
  }
}
.scroll {
  height: 500px;
  width: 200px;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>