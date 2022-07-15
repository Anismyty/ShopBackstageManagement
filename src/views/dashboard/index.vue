<template>
  <el-container class="container">
    <el-header><Header /></el-header>
    <el-container>
      <SidePannel />
      <el-container class="right">
        <el-main style="background-color: #d4d4d4">
          <!-- 子级路由 -->
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import SidePannel from './components/SidePannel.vue'
import Header from './components/Header.vue'
export default {
  name: 'dashboard',
  components: { SidePannel, Header }
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  .el-header {
    background-color: #38383a;
    color: white;
    height: 15vh;
  }
  .el-container {
    height: 85vh;
    .el-aside {
      background-color: #4f4f4f;
      color: white;
    }
    .right {
      height: 92.7vh;
      .el-footer {
        height: 5vh !important;
        background-color: #0c1d15;
        color: white;
        text-align: center;
        line-height: 5vh;
      }
    }
  }
}
</style>
