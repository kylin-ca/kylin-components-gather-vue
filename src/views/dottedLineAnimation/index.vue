
<template>
  <div class="dotted-container">
      <Aside>虚线滚动</Aside>
      <Dotted/>
  </div>
</template>

<script>
import Dotted from "@/components/Dotted"
import Aside from '@/components/Aside'
export default {
    components:{Dotted,Aside}
}
</script>

<style lang="scss" scoped>
.dotted-container{
    padding: 15px 30px;
}
</style>