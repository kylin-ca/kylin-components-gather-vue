<template>
  <div class="select-container">
    <single-choice-tree />
    <multiple-select />
    <VueTreeSelect
    :multiple="true"
    :options="options"
    placeholder="Select your favourite(s)..."
    v-model="value"
    :searchable="false"
    />
  <MultipleSelectTree  :selectedList.sync="selectedList" :selectDataList="selectDataList" />
  </div>
</template>

<script>
import SingleChoiceTree from '@/components/SingleChoiceTree'
import MultipleSelect from '@/components/MultipleSelect'
import VueTreeSelect from '@/components/VueTreeSelect/components/Treeselect.vue'
import MultipleSelectTree from '@/components/MultipleSelectTree'
export default {
  components: { SingleChoiceTree, MultipleSelect, VueTreeSelect,MultipleSelectTree },
  data() {
    return {

      selectedList:[1,2,3],
      selectDataList: [{
          label: '一级 1',
          id: 1,
          disabled: true,
          children: [{
            label: '二级 1-1',
             id: 2,
            children: [{
               id: 3,
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
           id: 4,
          children: [{
             id: 5,
            label: '二级 2-1',
            children: [{
               id: 6,
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
             id: 7,
            children: [{
               id: 8,
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
           id: 9,
          children: [{
            label: '二级 3-1',
             id: 10,
            children: [{
               id: 11,
              label: '三级 3-1-1'
            }]
          }, {
             id: 12,
            label: '二级 3-2',
            children: [{
               id: 13,
              label: '三级 3-2-1'
            }]
          }]
        }],
       value: [3],
    options: [ {
      id: 'fruits',
      label: 'Fruits',
      children: [ {
        id: 'apple',
        label: 'Apple 🍎',
        isNew: true,
      }, {
        id: 'grapes',
        label: 'Grapes 🍇',
      }, {
        id: 'pear',
        label: 'Pear 🍐',
      }, {
        id: 'strawberry',
        label: 'Strawberry 🍓',
      }, {
        id: 'watermelon',
        label: 'Watermelon 🍉',
      } ],
    }, {
      id: 'vegetables',
      label: 'Vegetables',
      children: [ {
        id: 'corn',
        label: 'Corn 🌽',
      }, {
        id: 'carrot',
        label: 'Carrot 🥕',
      }, {
        id: 'eggplant',
        label: 'Eggplant 🍆',
      }, {
        id: 'tomato',
        label: 'Tomato 🍅',
      } ],
    } ],
    }
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