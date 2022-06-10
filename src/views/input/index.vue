<template>
  <div>
      <MyInput v-model="value" />
  </div>
</template>

<script>
import MyInput from '../../components/MyInput'
export default {
    components:{MyInput},
    data() {
        return {
            value: ''
        }
    },
     watch: {
        // 监听父组件的值
        value(e) {
            console.log('父组件的值', e)
        },
    },

}
</script>

<style>

</style>