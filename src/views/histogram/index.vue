<!--
 * @Author: your name
 * @Date: 2022-03-10 17:05:45
 * @LastEditTime: 2022-03-22 15:36:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \kylin-components-gather-vue\src\views\histogram\index.vue
-->
<template>
  <div class="histogram-container">
    <div class="histogram-main">
      <div class="status">
        <ul>
          <li>
            <span class="green cirl"></span>
            已完成
          </li>
          <li><span class="blue cirl"></span>运行中</li>
          <li><span class="red cirl"></span>运行完成错误</li>
          <li><span class="grey cirl"></span>未完成</li>
        </ul>
      </div>
      <div class="step">
        <div class="tip"><span>开始</span></div>
        <ul>
          <li>
            <span class="introduce-t">
              <span class="introduce-i"></span>
              <span class="introduce-a"></span>
            </span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-b">
              <span class="introduce-d"></span>
              <span class="introduce-i"></span>
            </span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-t">
              <span class="introduce-i"></span>
              <span class="introduce-a"></span>
            </span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-b">
              <span class="introduce-d"></span> <span class="introduce-i"></span
            ></span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-t">
              <span class="introduce-i"></span>
              <span class="introduce-a"></span>
            </span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-b">
              <span class="introduce-d"></span> <span class="introduce-i"></span
            ></span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-t">
              <span class="introduce-i"></span> <span class="introduce-a"></span
            ></span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-b">
              <span class="introduce-d"></span> <span class="introduce-i"></span
            ></span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-t">
              <span class="introduce-i"></span> <span class="introduce-a"></span
            ></span>
            <span class="step-c1"></span>
          </li>
          <li>
            <span class="introduce-b">
              <span class="introduce-d"></span>
              <span class="introduce-i"></span></span
            ><span class="step-c1"></span>
            <span class="step-c2"></span>
          </li>
        </ul>
        <div class="tip"><span>结束</span></div>
      </div>
      <div class="flex">
        <div class="time">
          <div class="timetitle">耗时：</div>
          <ul>
            <li v-for="(item, index) in timeList" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="chart mar-l-10">
          <div class="histogram" :style="{ height: height }"></div>
          <span class="hisogram-tip">批量校验</span>
        </div>
        <div class="chart">
          <div class="histogram" :style="{ height: height2 }"></div>
        </div>
        <div class="chart">
          <div class="histogram" :style="{ height: height3 }"></div>
        </div>
        <div class="chart">
          <div class="histogram" :style="{ height: height4 }"></div>
        </div>
        <div class="chart">
          <div class="histogram" :style="{ height: height5 }"></div>
        </div>
        <div class="chart">
          <div class="histogram" :style="{ height: height6 }"></div>
        </div>
        <div class="chart">
          <div class="histogram" :style="{ height: height6 }"></div>
        </div>
        <div class="chart">
          <div class="histogram" :style="{ height: height6 }"></div>
        </div>
        <div class="chart">
          <div class="histogram" :style="{ height: height6 }"></div>
        </div>
        <div class="chart mar-r-10">
          <div class="histogram" :style="{ height: height6 }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: 0,
      height2: 0,
      height3: 0,
      height4: 0,
      height5: 0,
      height6: 0,
      timeList: [6, 5, 4, 3, 2, 1],
      setInter: null,
    }
  },
  mounted() {
    setTimeout(() => {
      this.height = '300px'
      setTimeout(() => {
        this.height2 = '400px'
        this.height = '100px'
        this.timeList = [12, 10, 8, 6, 4, 2]
        setTimeout(() => {
          this.height3 = '250px'
          setTimeout(() => {
            this.height4 = '350px'
            setTimeout(() => {
              this.height5 = '175px'
              setTimeout(() => {
                this.height6 = '225px'
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)
  },
  methods: {
    setfun() {
      this.height = '300px'
      //   this.setInter = setInterval(() => {
      //     this.height2 = this.height + 'px'
      //     this.height++
      //     if (this.time > 0) {
      //       this.time--
      //     }
      //     if (this.height > 400) {
      //       clearInterval(this.setInter)
      //     }
      //   }, 2)
    },
  },
}
</script>

<style lang="scss" spoced>
.histogram-container {
  padding: 15px;
  .histogram-main {
    width: calc(100% - 30px);
    height: 1000px;
    border: 1px solid #000;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .status {
      width: 100%;
      display: flex;
      justify-content: center;
      .cirl {
        width: 10px;
        height: 10px;
        display: block;
        border-radius: 50%;
        margin-right: 5px;
      }
      .green {
        background-color: #67c23a;
      }
      .blue {
        background-color: #409eff;
      }
      .red {
        background-color: #f56c6c;
      }
      .grey {
        background-color: #909399;
      }
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: 150px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .time {
    width: 100px;
    height: 600px;
    text-align: center;
  }
  .timetitle {
    text-align: center;
    height: 20px;
  }
  li {
    height: 100px;
    line-height: 100px;
  }
  .flex {
    width: 100%;
    display: flex;
    margin-bottom: 50px;
  }
  .mar-l-10 {
    margin-left: 10px;
  }
  .mar-r-10 {
    margin-right: 10px;
  }
  .chart {
    margin-top: 70px;
    height: 600px;
    width: calc(((100% - 400px) / 10));
    box-shadow: 0 0 10px 10px rgba($color: #000000, $alpha: 0.1);
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    align-items: center;
    margin-right: 20px;
    position: relative;
    .hisogram-tip {
      width: 100%;
      position: absolute;
      text-align: center;
      bottom: -20px;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
    }
    .histogram {
      width: 80%;
      height: 0;
      background-image: linear-gradient(to top, #fff, #000);
      border-radius: 5px;
      transition: 0.5s ease-in-out;
      cursor: pointer;
    }
  }
}
.step {
  display: flex;
  width: 100%;
  .tip {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #ccc;
      color: #fff;
      font-size: 12px;
    }
  }
  ul {
    width: calc(100% - 200px);
    display: flex;
    align-items: center;
    li {
      width: calc(((100%) / 10));
      height: 18px;
      position: relative;
      background-color: chartreuse;
      .step-c1 {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        border: #000 solid 2px;
        position: absolute;
        left: -10px;
      }
      .introduce-t {
        width: 150px;
        height: 80px;
        color: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -80px;
        display: flex;
        flex-flow: column;
        align-items: center;
        .introduce-i {
          width: 80%;
          height: 50px;
          background-color: #000;
        }
        .introduce-a {
          width: 20px;
          height: 20px;
          background: url('../../assets/upa.png') no-repeat;
          background-size: 100%;
          margin-top: 5px;
        }
      }
      .introduce-b {
        width: 150px;
        height: 80px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -80px;
        display: flex;
        flex-flow: column;
        align-items: center;
        .introduce-i {
          width: 80%;
          height: 50px;
          background-color: #000;
        }
        .introduce-d {
          width: 20px;
          height: 20px;
          background: url('../../assets/downa.png') no-repeat;
          background-size: 100%;
          margin: 5px 0;
        }
      }
      .step-c2 {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        border: #000 solid 2px;
        position: absolute;
        right: -10px;
      }
    }
  }
}
</style>