<template>
  <aside>{{ content }}</aside>
</template>

<script>
export default {
  data() {
    return {
      content: '',
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
aside {
  background: #eef1f6;
  padding: 8px 24px;
  margin-bottom: 20px;
  border-radius: 2px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>