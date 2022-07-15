<template>
  <div class="login-container">
    <div class="form-box">
      <div class="avatar"><el-avatar size="large" :src="circleUrl"></el-avatar></div>

      <div class="form">
        <el-form :model="userInfo" :rules="rules" ref="formPanel">
          <el-form-item prop="username">
            <el-input type="text" v-model="userInfo.username">
              <template v-slot:prefix>
                <i class="el-icon-user-solid"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="userInfo.password">
              <template v-slot:prefix>
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="end">
              <el-col :span="10">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="primary" @click="toBlack">重置</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from '@/assets/login2.png'
import { login } from '@/api/user'
/* eslint-disable */
export default {
  data() {
    return {
      userInfo: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '用户名长度在3-8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '密码长度在3-8之间', trigger: 'blur' }
        ]
      },
      circleUrl: imgUrl
    }
  },
  methods: {
    /* 重置 */
    toBlack() {
      this.$refs.formPanel.resetFields()
    },
    /* 登录 */
    async login() {
      try {
        await this.$refs.formPanel.validate()
        const userinfo = await login(this.userInfo)
        this.$store.commit('setUserInfo', userinfo)
        this.$router.push({ path: '/dashboardPanel' })
      } catch (err) {
        this.$message('表单验证失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('~@/assets/bgi.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
  .form-box {
    position: relative;
    padding: 30px 15px;
    width: 450px;
    height: 300px;
    background-color: #727272;
    opacity: 0.9;
    border-radius: 10px;
    .avatar {
      position: absolute;
      top: -15%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 100px;
      background-color: #cecece;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 0px 16px 8px #828282;
      .el-avatar--large {
        width: 100px;
        height: 100px;
      }
    }
    .form {
      margin-top: 50px;
    }
  }
}
</style>
