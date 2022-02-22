<template>
  <div class="virtual-list-container">
    <Aside>虚拟列表（当页面中数据过多的时候，只渲染可视区域内的dom）</Aside>
    <div
      ref="list"
      class="infinite-list-container"
      @scroll="scrollEvent($event)"
    >
      <div
        class="infinite-list-phantom"
        :style="{ height: listHeight + 'px' }"
      ></div>
      <div class="infinite-list" :style="{ transform: getTransform }">
        <div
          ref="items"
          class="infinite-list-item"
          v-for="item in visibleData"
          :key="item.id"
          :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/Aside'
export default {
  components: { Aside },
  data() {
    return {
      //所有列表数据
      listData: [],
      //每项高度
      itemSize: 200,
      //可视区域高度
      screenHeight: 0,
      //偏移量
      startOffset: 0,
      //起始索引
      start: 0,
      //结束索引
      end: null,
    }
  },
  computed: {
    //列表总高度
    listHeight() {
      return this.listData.length * this.itemSize
    },
    //可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`
    },
    //获取真实显示列表数据
    visibleData() {
      return this.listData.slice(
        this.start,
        Math.min(this.end, this.listData.length)
      )
    },
  },
  created() {
    for (let i = 0; i < 30000; i++) {
      this.listData.push({ id: i, value: i })
    }
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight
    this.start = 0
    this.end = this.start + this.visibleCount
  },
  methods: {
    scrollEvent() {
      //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize)
      //此时的结束索引
      this.end = this.start + this.visibleCount
      //此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize)
    },
  },
}
</script>

<style lang="scss" scoped>
.virtual-list-container {
  padding: 15px 30px;
  width: 100%;
  font-size: 14px;
  height: 100%;
}
.infinite-list-container {
  margin-top: 30px;
  height: 500px;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 0 10px 10px rgba($color: #000000, $alpha: 0.1);
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #409eff;
}
</style>