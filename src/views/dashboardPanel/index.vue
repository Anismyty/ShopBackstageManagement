<template>
  <div>
    <h1>欢迎光临：{{ $store.state.userInfo.username }}</h1>
    <EchartOne />
  </div>
</template>

<script>
import EchartOne from '@/views/ECharts/index.vue'
export default {
  name: 'dashboardPanel',
  components: { EchartOne }
}
</script>

<style lang="less" scoped>
h1{
    margin-bottom: 30px;
}
</style>
