<template>
  <el-dialog :visible="showTree" title="分配权限" @close="btnClose">
    <el-tree ref="wawa" :data="permissionList" show-checkbox node-key="id" :props="defaultProps"> </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="btnClose">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { giveRolePermission } from '@/api/roles'
export default {
  name: 'AssignPermissions',
  props: {
    /* 控制树显现 */
    showTree: {
      type: Boolean,
      default: false
    },
    /* 全部权限列表 */
    permissionList: {
      type: [Object, Array]
    },
    /* 当前点击角色的权限信息 */
    rolePermission: {
      type: [Object, Array],
      default: []
    },
    editId: {
      type: [Number, String]
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    /* 递归函数-提取ID值 */
    getInfo(arr) {
      let a = []
      arr.forEach((e) => {
        if (!e.children) {
          a.push(e.id)
        } else {
          a.push(...this.getInfo(e.children))
        }
      })
      return a
    },
    /* 渲染树的选中 */
    setCheckedNodes(arr) {
      setTimeout(() => {
        this.$refs.wawa.setCheckedKeys(arr)
      }, 0)
    },
    /* 确定按钮 */
    async btnOk() {
      const a = this.$refs.wawa.getCheckedNodes(false, true)
      const b = a.map((e) => e.id).join(',')
      await giveRolePermission({ roleId: this.editId, rids: b })
      this.$parent.getRoleList()
      this.$emit('update:showTree', false)
      this.$emit('updateTwo')
    },
    /* 关闭按钮 */
    btnClose() {
      this.$emit('update:showTree', false)
      this.$emit('updateTwo')
    }
  },
  watch: {
    rolePermission: {
      handler(n) {
        this.setCheckedNodes(this.getInfo(n))
      }
    }
  }
}
</script>

<style></style>
