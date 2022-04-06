<template>
  <div class="select-container">
    <single-choice-tree />
    <multiple-select/>
  </div>
</template>

<script>
import SingleChoiceTree from '@/components/SingleChoiceTree'
import MultipleSelect from '@/components/MultipleSelect'
export default {
  components: { SingleChoiceTree, MultipleSelect },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.select-container {
  padding: 15px 30px;
}
.accordion {
  width: 320px;
  height: 800px;
  border: #ccc solid 1px;
  ul {
    position: relative;
  }
  li {
    width: 100%;
    height: 40px;
    background-color: rgb(26, 65, 192);
  }
  .active {
    position: relative;
    bottom: 0;
  }
}
</style>