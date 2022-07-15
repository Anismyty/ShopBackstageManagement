<template>
  <div class="top">
    <el-link icon="el-icon-s-home" :underline="false" @click="$router.push({ path: '/dashboardPanel' })">首页</el-link>
    <i class="el-icon-arrow-right" v-if="name1" />
    {{ name1 }}
    <i class="el-icon-arrow-right" v-if="name2" />
    {{ name2 }}
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    name1: {
      type: String
    },
    name2: {
      type: String
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
  i {
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>
