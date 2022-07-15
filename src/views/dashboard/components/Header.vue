<template>
  <div class="headerPanel">
    <div class="left"><img :src="imgUrl" alt="" /> <span>奇妙鱼后台管理系统</span></div>
    <div><el-button type="danger" plain @click="logOut">退出</el-button></div>
  </div>
</template>

<script>
/* eslint-disable */
import { removeToken } from '@/utils/auth'
import logo from '@/assets/logo2.png'
export default {
  name: 'Header',
  data() {
    return {
      imgUrl: logo
    }
  },
  methods: {
    logOut() {
      this.$confirm('是否退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('setUserInfo', {})
          removeToken()
          this.$router.push({ path: '/login' })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 80px;
  height: 60px;
}
span {
  font-weight: bold;
  margin-left: 20px;
  letter-spacing: 10px;
  font-size: 30px;
}
.headerPanel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
  }
}
</style>
