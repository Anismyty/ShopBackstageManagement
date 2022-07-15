<template>
  <el-aside style="width: unset">
    <el-button
      style="width: 100%"
      type="primary"
      :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="isCollapse = !isCollapse"
    ></el-button>
    <el-menu
      :default-active="this.$router.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :unique-opened="true"
      text-color="white"
      background-color="#4f4f4f"
      :router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item index="/userList">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item index="/RoleList">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">角色列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/PermissionList">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">权限列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="/ProductList">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">商品列表</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/ClassificationParameters">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">分类参数</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/CommodityClassification">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">商品分类</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-management"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="/Order">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单列表</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span slot="title">数据统计</span>
        </template>
        <el-menu-item index="/dataReport">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">数据报表</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 80%;
}
i {
  color: white;
}
.el-menu {
  border: none;
}
/deep/.el-icon-s-fold {
  font-size: 25px;
}
</style>
