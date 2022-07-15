<template>
  <div>
    <div class="echart2" ref="chart"></div>
  </div>
</template>

<script>
/* eslint-disable */
// import echarts from 'echarts'
const echarts = require('echarts')
export default {
  name: 'Echarts',
  props: {
    legend: {
      type: [Object, Array]
    },
    series: {
      type: [Object, Array]
    },
    Xdate: {
      type: [Object, Array]
    }
  },
  data() {
    return {
      myPick: null
    }
  },
  methods: {
    myChart() {
      if (this.$refs.chart == null) {
        return
      }
      echarts.dispose(this.$refs.chart)
      this.myPick = echarts.init(this.$refs.chart)
      this.myPick.setOption({
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        legend: {
          data: this.legend
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.Xdate
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        /* 数据位置 */
        series: this.series
      })
    }
  },
  mounted() {
    this.myChart()
  },
  watch: {
    Xdate: {
      handler() {
        this.myChart()
      },
      deep: true
    }
  },
  /* 切换其他组件统计图时，出现卡顿问题如何解决（必会） */
  beforeDestroy() {
    this.myPick.clear()
  }
}
</script>

<style lang="less" scoped>
.echart2 {
  width: 100%;
  height: 800px;
  background-color: #ffffff;
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px 5px #afafaf;
  margin-top: 30px;
}
</style>
