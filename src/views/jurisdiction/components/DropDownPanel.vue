<template>
  <div>
    <el-alert
      v-if="PermissionList.children.length === 0"
      title="暂无更多信息"
      center
      type="warning"
      :closable="false"
      show-icon
    >
    </el-alert>
    <el-row
      v-else
      type="flex"
      align="middle"
      justify="center"
      class="demo-table-expand"
      inline
      v-for="(e, i) in showList"
      :key="i"
    >
      <el-col :span="6">
        <el-tag type="success"> {{ e.authName }}</el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <el-col :span="18">
        <el-row v-for="(e2, i) in e.children" :key="i" type="flex" align="middle" justify="center" class="second">
          <el-col :span="6">
            <el-tag type="warning">{{ e2.authName }}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="18">
            <el-alert v-if="e2.children.length === 0" title="暂无分配的权限" type="info" :closable="false"></el-alert>
            <el-tag v-else v-for="(e3, i) in e2.children" :key="i" closable @close="close(e3.id)">
              {{ e3.authName }}
            </el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import { delRolePermission } from '@/api/roles'
export default {
  name: 'DropDownPanel',
  props: {
    PermissionList: {
      type: Object
    }
  },
  data() {
    return {
      roleList: null
    }
  },
  methods: {
    close(rightId) {
      this.$confirm('此操作将永久删除该用户的权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.roleList = await delRolePermission({ roleId: this.PermissionList.id, rightId: rightId })
          this.$emit('updatePermission', this.roleList, this.PermissionList.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  computed: {
    showList() {
      return this.roleList || this.PermissionList.children
    }
  }
}
</script>

<style></style>
