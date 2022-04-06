<template>
  <div class="splitpane-container">
    <!-- <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container" />
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane> -->
    <split-pane split="horizontal" @resize="resize" :min-percent='0'>
      <template slot="paneL">
        <div class="top-container">
          <el-table
            size="mini"
            border
            :data="tableData"
            stripe
            style="width: 100%"
            height="100%"
          >
            <el-table-column prop="date" label="日期" align="center">
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center">
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="vertical" @resize="resize" :min-percent='0'>
          <template slot="paneL">
            <div class="left-container">
              <div class="bottom-container" id="bottomContainer" />
            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container" id="bottomContainerRight" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import * as echarts from 'echarts'
import { debounce } from '@/utils'
export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  data() {
    return {
      myChart: undefined,
      myChart2: undefined,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  //   computed: {
  //     resize() {
  //       return debounce(() => {
  //           this.myChart.resize()
  //           this.myChart2.resize()
  //       }, 100)
  //     },
  //   },
  mounted() {
    this.initEcharts()
    window.addEventListener('resize', this.resize)
    this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    //当Elem元素的transition属性过渡完成就执行函数
    this.$_sidebarElm &&
      this.$_sidebarElm.addEventListener('transitionend', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    initEcharts() {
      this.myChart = echarts.init(document.getElementById('bottomContainer'))
      this.myChart2 = echarts.init(
        document.getElementById('bottomContainerRight')
      )
      let option = {
        title: {
          text: 'Stacked Line',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      }
      let option2 = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          },
        ],
      }
      this.myChart.setOption(option)
      this.myChart2.setOption(option2)
    },
    resize() {
      this.myChart.resize()
      this.myChart2.resize()
      //   console.log('resize')
    },
    $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.splitpane-container {
  padding: 15px 15px;
  height: calc(100vh - 50px);
}
.left-container {
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  //   background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  //   background-color: #95e1d3;
  height: 100%;
}
</style>