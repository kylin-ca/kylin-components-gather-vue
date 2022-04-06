<template>
  <div class="left-container">
    <div ref="searchContainer">
      <div class="search">
        <search-input @search="listSearch" style="width: 90%" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <svg-icon iconClass="menu" />
            <!-- <i class="el-icon-s-fold"></i> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">新增</el-dropdown-item>
            <el-dropdown-item command="modify">修改</el-dropdown-item>
            <el-dropdown-item command="del">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <slot></slot>
    </div>
    <div class="list-container" :style="{ height: listContainerHeight }">
      <div class="title">{{ lisTitle }}</div>
      <div class="list">
        <p v-if="list.length === 0">无数据！</p>
        <ul>
          <li
            v-for="item in list"
            :key="item.id"
            :class="[
              item.active ? 'active' : '',
              item.search ? 'search-item' : '',
            ]"
            @click="listClickHandle(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/*
slot
列表和搜索框之间的插槽

props 传参
lisTitle 列表的标题 
list 列表 
searchKey搜索框搜索的键值

$emit 事件
searchHandle(item) 搜索回调(item搜索之后选中的数据项) 
listClick(item) 列表点击回调(item 点击的列表项) 
add 菜单栏新增回调 
del(item) 删除回调(item 删除的列表项) 
modify(item) 编辑回调(item 编辑的列表项)

方法 通过ref调用
selectListItem(i) 
设置列表选中项 @param i 需要选中的列表项 根据searchKey匹配
*/
import SearchInput from '../SearchInput'
export default {
  components: { SearchInput },
  props: {
    lisTitle: {
      type: String,
      default: '列表',
    },
    list: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: '11',
        },
        {
          id: 2,
          name: '12',
        },
        {
          id: 3,
          name: '13',
        },
      ],
    },
    searchKey: {
      type: String,
      default: 'name',
    },
  },
  data() {
    return {
      listContainerHeight: '',
    }
  },
  watch: {
    list: {
      handler(newValue, oldValue) {
        newValue.forEach((item, index) => {
          if (index === 0) {
            this.$set(item, 'active', true)
          } else {
            this.$set(item, 'active', false)
            this.$set(item, 'search', false)
          }
        })
      },
      immediate: true,
    },
  },
  mounted() {
    // console.log(this.$refs.searchContainer.offsetHeight)
    let searchHeight = this.$refs.searchContainer.offsetHeight
    // console.log(searchHeight)
    this.listContainerHeight = `calc(100% - ${searchHeight}px)`
  },
  methods: {
    selectListItem(i) {
      let key = this.searchKey
      this.list.forEach((item) => {
        if (i[key] === item[key]) {
          item.active = true
        } else {
          item.active = false
        }
      })
    },
    listClickHandle(item) {
      this.list.forEach((v) => {
        if (item.id !== v.id) {
          v.active = false
        } else {
          v.active = true
        }
      })
      this.activeItem = item
      this.$emit('listClick', item)
    },
    handleCommand(item) {
      if (item === 'add') {
        this.$emit('add')
      } else if (item === 'del') {
        this.$emit('del', this.getActiveItem())
      } else {
        this.$emit('modify', this.getActiveItem())
      }
    },
    getActiveItem() {
      return this.list.filter((item) => item.active)
    },
    listSearch(value) {
      let searchValue = this.trimStr(value)
      // console.log(searchValue)
      if (searchValue === '') {
        this.list.forEach((item, index) => {
          item.search = false
          if (index === 0) {
            this.$emit('searchHandle', item)
            item.active = true
          } else {
            item.active = false
          }
        })
      } else {
        let fliterList = this.list.filter((item) => {
          item.active = false
          item.search = false
          if (item[this.searchKey].includes(searchValue)) {
            item.search = true
            return item
          }
        })
        if (fliterList.length > 0) {
          fliterList[0].active = true
          this.$emit('searchHandle', fliterList[0])
        }
      }
    },
    trimStr(str) {
      return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
    },
  },
}
</script>

<style lang="scss" scoped>
.left-container {
  width: 100%;
  height: 100%;
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 15px 0;
  }
  .el-dropdown-link {
    cursor: pointer;
    font-size: 22px !important;
    background-color: #edf0f5;
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    width: 100%;
    height: 40px;
    background-color: #edf0f5;
    line-height: 40px;
    padding-left: 15px;
    font-size: 12px;
  }
  .list {
    border: 1px solid #e6e6e6;
    height: calc(100% - 40px);
    overflow-y: auto;
    P {
      font-size: 12px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      color: #999;
    }
    .search-item {
      color: #0088ff;
    }
    li {
      padding: 0 0 0 15px;
      font-size: 12px;
      height: 34px;
      line-height: 34px;
      position: relative;
      cursor: pointer;
      user-select: none;
      margin: 2px 0;
      //   transition: all .2s ;
      &:hover {
        color: #0088ff;
        background-image: linear-gradient(to right, #e2f1ff, #ffffff);
        font-weight: bolder;
        &::after {
          content: '';
          display: block;
          width: 2px;
          height: 15px;
          background-color: #0088ff;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .active {
      color: #0088ff;
      background-image: linear-gradient(to right, #e2f1ff, #ffffff);
      font-weight: bolder;
      &::after {
        content: '';
        display: block;
        width: 2px;
        height: 15px;
        background-color: #0088ff;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>