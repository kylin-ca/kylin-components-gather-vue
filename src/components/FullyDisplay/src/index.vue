<!--
 * @Author: your name
 * @Date: 2022-02-07 16:05:44
 * @LastEditTime: 2022-02-07 16:32:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-admin-template-master\src\components\FullyDisplay\src\index.vue
-->
<template>
  <transition name="fade">
    <div id="display-tool" v-show="isShow">
      <p>{{ content }}</p>
    </div>
  </transition>
</template>
<script>
export default {
  name: "FullyDisplay",
  data() {
    return {
      isShow: false,
      content: ""
    };
  },
  methods: {
    show(content) {
      const toolDiv = document.getElementById("display-tool");
      this.isShow = true;
      this.content = content;
    },
    hide() {
      this.isShow = false;
      this.content = "";
    },
    update(x, y) {
      const toolDiv = document.getElementById("display-tool");
      toolDiv.style.left = x + 15 + "px";
      toolDiv.style.top = y + 15 + "px";
    }
  }
};
</script>
<style lang="scss" scoped>
#display-tool {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  border-radius: 3px;
  // padding: 0px 5px;
  // height: 30px;
  // line-height: 0;
  p {
    display: block;
    padding: 0px 5px;
    // height: 10px;
    // line-height: 30px;
    font-size: 12px;
    color: #fff;
    white-space: wrap;
    word-break: break-all;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
