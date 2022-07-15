<template>
  <el-dialog :title="showTitle" :visible="showDialog" width="50%" @close="btnCancel">
    <el-form :label-position="labelPosition" label-width="80px" :model="createInfo" :rules="rules" ref="userInfoPannel">
      <el-form-item label="用户名" prop="username" v-if="id === null">
        <el-input v-model="createInfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" v-else>
        <el-input v-model="createInfo.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="id === null">
        <el-input type="password" v-model="createInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="createInfo.email" placeholder="请输入邮箱"> </el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="createInfo.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { addUser, getUserInfoById, editUser } from '@/api/user'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: null
    },
    showTitle: {
      type: String,
      required: true
    }
  },
  data() {
    /* 手机校验规则 */
    let validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号不能为空'))
      }
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机格式'))
      }
      callback()
    }
    return {
      dialogVisible: true,
      labelPosition: 'right',
      /* 表单关联数据 */
      createInfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      /* 表单校验规则 */
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 确认按钮 */
    async btnOk() {
      try {
        if (this.id === null) {
          /* 新建提交 */
          await this.$refs.userInfoPannel.validate()
          await addUser(this.createInfo)
        } else {
          /* 编辑提交 */
          await this.$refs.userInfoPannel.validate()
          await editUser(this.createInfo)
        }
        this.$emit('updateInfo')
        this.$emit('update:showDialog', false)
      } catch (err) {
        console.log(err)
      }
    },
    /* 取消按钮 */
    btnCancel() {
      this.createInfo = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$emit('update:showDialog', false)
      if (this.id === null) {
        this.$refs.userInfoPannel.resetFields()
      } else {
        setTimeout(() => {
          this.$emit('clearId')
        }, 0)
      }
    },
    /* 根据传递过来的ID执行程序 */
    async getUserInfoById(id) {
      const res = await getUserInfoById(id)
      this.createInfo = res
    }
  },
  created() {
    // this.getUserInfoById(this.id)
  }
}
</script>

<style></style>
