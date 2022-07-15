<template>
  <div>
    <TopNav name1="权限管理" :name2="$route.name" />
    <div class="body_container">
      <el-button type="primary" @click="addEdit">添加角色</el-button>
      <el-table :data="roleList" border style="width: 100%; margin-top: 15px">
        <el-table-column type="expand" label="更多" width="80">
          <template slot-scope="props">
            <!-- 下拉面板组件 -->
            <DropDownPanel :PermissionList="props.row" @updatePermission="updateOne" />
            <!-- 下拉面板组件 -->
          </template>
        </el-table-column>
        <el-table-column label="ID" width="100" type="index" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center" />
        <el-table-column label="角色描述" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.roleDesc !== null && scope.row.roleDesc !== ''">{{ scope.row.roleDesc }}</i>
            <el-alert v-else title="暂无描述" center :closable="false" type="warning" show-icon></el-alert>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="props">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="editRole(props.row.id)">编辑</el-button>
            <el-button size="small" type="warning" icon="el-icon-delete" @click="delRole(props.row)">删除</el-button>
            <el-button size="small" type="danger" icon="el-icon-s-tools" @click="changePermisson(props.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 【新增】【编辑】弹出层 -->
    <EditLayer ref="EditLayer" :showEditLayer.sync="showEditLayer" :titleName="titleName" :editId.sync="editId" />
    <!-- 【新增】【编辑】弹出层 -->
    <!-- 设置【权限】 -->
    <AssignPermissions
      ref="assignPermissions"
      :showTree.sync="showTree"
      :permissionList="permissionList"
      :rolePermission="rolePermission"
      @updateTwo="updateTwo"
      :editId="editId"
    />
    <!-- 设置【权限】 -->
  </div>
</template>

<script>
/* eslint-disable */
/* 组件 */
import TopNav from '@/components/TopNav'
import DropDownPanel from './components/DropDownPanel'
import EditLayer from './components/EditLayer'
import AssignPermissions from './components/AssignPermissions'
import { getRoleList, delRole, getAllPermission } from '@/api/roles'
/* 无法选中文本 */
document.body.onselectstart = function () {
  return false
}
export default {
  name: 'RoleList',
  components: { TopNav, DropDownPanel, EditLayer, AssignPermissions },
  data() {
    return {
      roleList: [],
      showEditLayer: false,
      titleName: '',
      editId: null,
      permissionList: [],
      showTree: false,
      rolePermission: [],
      trans: [],
      transId: null
    }
  },
  methods: {
    /* 获取角色列表 */
    async getRoleList() {
      this.roleList = await getRoleList()
    },

    /* 获取所有权限 */
    async getAllPermission() {
      this.permissionList = await getAllPermission('tree')
    },

    /* 删除角色 */
    async delRole(info) {
      this.$confirm('是否删除角色？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delRole(info.id)
          this.getRoleList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    /* 编辑角色 */
    editRole(id) {
      this.editId = id
      this.showEditLayer = true
      this.titleName = '编辑角色'
      this.$refs.EditLayer.getRole(id)
    },

    /* 添加角色 */
    addEdit() {
      this.showEditLayer = true
      this.titleName = '添加角色'
    },
    /* 修改权限 */
    updateOne(list, id) {
      this.trans = list
      this.roleList.forEach((e) => {
        if (e.id === id) {
          e.children = list
        }
      })
      this.transId = id
    },
    updateTwo() {
      this.permissionList = []
      this.rolePermission = []
      this.trans = []
      this.transId = null
    },
    /* 点击分配权限 */
    changePermisson(list) {
      //获取所有权限
      this.getAllPermission()
      this.editId = list.id
      if (list.id === this.transId) {
        this.rolePermission = this.trans
      } else {
        this.rolePermission = list.children
      }
      this.showTree = true
    }
  },
  created() {
    this.getRoleList()
  }
}
</script>

<style lang="less" scoped>
:deep(.body_container) {
  /* 修改extend箭头样式 */
  .el-table__expand-icon > .el-icon {
    transform: rotate(0deg) !important;
  }
  .el-table__expand-icon--expanded {
    transform: rotate(0deg) !important;
  }
  .el-icon-arrow-right:before {
    content: '';
    font-size: 15px;
    color: #054605;
  }
  .el-table__expand-icon--expanded .el-icon-arrow-right:before {
    content: '';
    color: #33ee33;
  }
  /* 修改extend箭头样式 */
  /* 下拉面板样式 */
  .el-table__expanded-cell {
    padding: 20px 40px;
    .el-row {
      border-bottom: 1px solid #dfdfdf;
      border-top: 1px solid #dfdfdf;
      .el-tag {
        margin-left: 8px;
        margin-top: 8px;
        margin-bottom: 10px;
      }
    }
    .second {
      border: 0px solid #000;
    }
    .second:not(:last-child) {
      border-bottom: 1px solid #dfdfdf;
    }
  }
  /* 下拉面板样式 */
}
</style>
