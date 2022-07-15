<template>
  <el-dialog :title="titleName" :visible="showEditLayer" width="50%" @close="btnClose">
    <el-form ref="userInfoPannel" label-position="right" label-width="80px" :model="roleInfo" :rules="editRule">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleInfo.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleInfo.roleDesc" placeholder="请输入角色描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="btnClose">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { addRole, editRole, getRoleById } from '@/api/roles'
export default {
  name: 'EditLayer',
  props: {
    showEditLayer: {
      type: Boolean,
      default: false
    },
    titleName: {
      type: String,
      required: true
    },
    editId: {
      type: [Number, String, null]
    }
  },
  data() {
    return {
      roleInfo: {
        roleName: '',
        roleDesc: ''
      },
      editRule: {
        roleName: [
          { required: true, message: '请输入角色名！', trigger: 'blur' },
          { min: 3, max: 6, message: '角色名字在3-6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 个根据id查询角色信息 */
    async getRole(id) {
      this.roleInfo = await getRoleById(id)
    },
    async btnOk() {
      try {
        await this.$refs.userInfoPannel.validate()
        if (this.editId === null) {
          await addRole(this.roleInfo)
        } else {
          await editRole({ ...this.roleInfo, id: Number(this.editId) })
        }
        this.$parent.getRoleList()
        this.$emit('update:showEditLayer', false)
        this.$refs.userInfoPannel.resetFields()
      } catch (err) {
        console.log(err)
      }
    },
    btnClose() {
      this.roleInfo = {
        roleName: '',
        roleDesc: ''
      }
      this.$emit('update:showEditLayer', false)
      this.$emit('update:editId', null)
      this.$refs.userInfoPannel.resetFields()
    }
  }
}
</script>

<style></style>
