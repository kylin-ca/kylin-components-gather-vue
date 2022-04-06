<!--
 * @Author: your name
 * @Date: 2022-03-03 15:32:55
 * @LastEditTime: 2022-03-03 15:47:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \kylin-components-gather-vue\src\components\Dotted\index.vue
-->
<template>
  <div>
    <div class="box">
      <span
        v-for="(item, index) in new Array(20)"
        :key="index"
        :class="'span' + index"
      >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  //   props: {
  //     boxWidth: {
  //       type: String,
  //       default: '500px',
  //     },
  //     boxHeight: {
  //       type: String,
  //       default: '30px',
  //     },
  //     dottedWidth: {
  //       type: String,
  //       default: '30px',
  //     },
  //     dottedHeigt: {
  //       type: String,
  //       default: '30px',
  //     },
  //   },
}
</script>

<style lang="scss" scoped>
.box {
  width: 500px;
  height: 30px;
  background-color: #67c23a;
  display: flex;
  align-items: center;
  overflow: hidden;
}
span {
  display: block;
  width: 40px;
  height: 10px;
  background-color: #fff;
  margin-right: 10px;
  flex-shrink: 0;
  animation: move 3s infinite linear;
}
@keyframes move {
  from {
    transform: translateX(-500px);
  }
  to {
    transform: translateX(0px);
  }
}
.span19 {
  margin: 0;
}
</style>