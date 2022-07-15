<template>
  <div>
    <div class="echart1" ref="chart"></div>
  </div>
</template>

<script>
/* eslint-disable */
// import echarts from 'echarts'
const echarts = require('echarts')
export default {
  name: 'Echarts',
  data() {
    return {
      myPick: null
    }
  },
  methods: {
    myChart() {
      this.myPick = echarts.init(this.$refs.chart)
      this.myPick.setOption({
        title: {
          text: '店铺销售额【测试】'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['服饰', '饰品', '电器', '玩具', '五金']
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        /* 数据位置 */
        series: [
          {
            name: '服饰',
            type: 'line',
            stack: 'Total',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '饰品',
            type: 'line',
            stack: 'Total',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '电器',
            type: 'line',
            stack: 'Total',
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '玩具',
            type: 'line',
            stack: 'Total',
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '五金',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      })
    }
  },
  mounted() {
    this.myChart()
  },
  /* 切换其他组件统计图时，出现卡顿问题如何解决（必会） */
  beforeDestroy() {
    this.myPick.clear()
  }
}
</script>

<style lang="less" scoped>
.echart1 {
  width: 100%;
  height: 800px;
  background-color: #ffffff;
  padding: 20px 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px 5px #afafaf;
}
</style>
