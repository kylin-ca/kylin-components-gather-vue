<!--
 * @Author: chenang
 * @Date: 2022-03-16 17:00:53
 * @LastEditTime: 2022-04-11 17:00:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \kylin-components-gather-vue\src\components\SingleChoiceTree\index.vue
-->
<template>
  <div class="app-container">
    <el-select class="main-select-tree" ref="selectTree" v-model="value"  style="width: 560px;" multiple collapse-tags clearable>
      <el-option v-for="item in formatData(datas)" :key="item.value" :label="item.label" :value="item.value" style="display: none;" />      
      <el-tree class="main-select-el-tree" ref="selecteltree" 
        :data="datas"
        node-key="id" 
        show-checkbox
        highlight-current  
        :props="defaultProps"
        @node-click="handleNodeClick"
        :default-expanded-keys="value"
        :default-checked-keys="value"
        :expand-on-click-node="expandOnClickNode"
        />
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [1,2,3],
      expandOnClickNode: true,
      options:[],
      datas: [{
        id: 1,
        label: '云南',
        children: [{
          id: 2,
          label: '昆明',
          children: [
            {id: 3,label: '五华区',children:[{id: 8,label: '北辰小区'}]},
            {id: 4,label: '盘龙区'}
          ]
        }]
      }, {
        id: 5,
        label: '湖南',
        children: [
          {id: 6,label: '长沙'},
          {id: 7,label: '永州'}
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    // 四级菜单
    formatData(data){
      let options = [];
      data.forEach((item,key) => {
        options.push({label:item.label,value:item.id});
        if(item.children){
          item.children.forEach((items,keys) => {
            options.push({label:items.label,value:items.id});
            if(items.children){
              items.children.forEach((itemss,keyss) => {
                options.push({label:itemss.label,value:itemss.id});
                if(itemss.children){
                  itemss.children.forEach((itemsss,keysss) => {
                    options.push({label:itemsss.label,value:itemsss.id});
                  });
                }
              });
            }
          });
        }
      });
      return options;
    },
    handleNodeClick(node){
      this.value = node.id;
      this.$refs.selectTree.blur();
    }
  }
}
</script>
<style>
.main-select-el-tree .el-tree-node .is-current > .el-tree-node__content{font-weight: bold; color: #409eff;}
.main-select-el-tree .el-tree-node.is-current > .el-tree-node__content{font-weight: bold; color: #409eff;}
</style>