<template>
  <div>
    <TopNav name1="数据统计" :name2="$route.name" />
    <BigData :legend="legendDate" :series="list.series" :Xdate="xAxis" />
  </div>
</template>

<script>
/* eslint-disable */
import { getBigData } from '@/api/echartData'
import BigData from '@/views/ECharts/bigData.vue'
import TopNav from '@/components/TopNav'
export default {
  name: 'dataReport',
  components: { BigData, TopNav },
  data() {
    return {
      list: [],
      xAxis: [],
      legendDate: []
    }
  },
  methods: {
    async getList() {
      this.list = await getBigData()
      this.xAxis = this.list.xAxis[0].data
      this.legendDate = this.list.legend.data
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style></style>
