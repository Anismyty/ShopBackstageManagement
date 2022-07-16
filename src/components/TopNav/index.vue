<template>
  <div class="top">
    <!--     <el-link icon="el-icon-s-home" :underline="false" @click="toHome">首页</el-link> -->
    <span class="goHome" @click="$router.push({ path: '/dashboardPanel' })"><i class="el-icon-s-home"></i>首页</span>
    <i class="el-icon-arrow-right" v-if="name1" />
    {{ name1 }}
    <i class="el-icon-arrow-right" v-if="name2" />
    {{ name2 }}
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'TopNav',
  props: {
    name1: {
      type: String
    },
    name2: {
      type: String
    }
  },
  methods: {
    toHome() {
      try {
        this.$router.push({ path: '/dashboardPanel' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-family: '楷体';
  background-color: #cacaca;
  border-radius: 10px;
  padding: 10px 10px;
  box-shadow: 0 0 10px 5px #e3e3e3;
  .goHome {
    cursor: pointer;
  }
  .goHome:hover {
    color: #075c14;
    font-weight: bold;
  }
  i {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
