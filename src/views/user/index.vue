<template>
  <div>
    <TopNav name1="用户管理" :name2="$route.name" />
    <div class="body_container">
      <!-- 搜索、添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="search" class="input-with-select" clearable @clear="clearList">
            <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 搜索、添加 -->
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%; margin-top: 15px">
        <el-table-column type="index" label="ID" width="50" align="center"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="200" align="center"> </el-table-column>
        <el-table-column label="电话" width="200" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.mobile !== null && scope.row.mobile !== ''">{{ scope.row.mobile }}</i>
            <el-alert v-else title="暂无手机号" center :closable="false" type="warning" show-icon></el-alert>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="角色" align="center"> </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button>
            <el-button size="small" type="warning" icon="el-icon-setting" @click="setting(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格 -->
      <!-- 底部分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
      <!-- 底部分页 -->
      <!-- 弹出层组件【新增】【编辑】 -->
      <EditPopup
        :showDialog.sync="showDialog"
        @updateInfo="updateInfo"
        :id="userId"
        @clearId="userId = null"
        :showTitle="target"
        ref="editChild"
      />
      <!-- 弹出层组件【新增】【编辑】 -->
      <!-- 【设置】弹出层 -->
      <el-dialog title="分配角色" :visible="settingDialog" width="30%" center @close="settingClose">
        <el-row>
          <el-col :span="24">当前用户：{{ settingInfo.username }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="24">当前的角色：{{ settingInfo.role_name }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            分配新角色：
            <el-select v-model="settingValue" placeholder="请选择">
              <el-option v-for="item in settingOptions" :key="item.id" :label="item.roleName" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="settingClose">取 消</el-button>
          <el-button type="primary" @click="settingOk(settingInfo.id)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 【设置】弹出层 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TopNav from '@/components/TopNav'
import EditPopup from './components/EditPopup.vue'
import { getUserInfo, delUser, changeState, updateUserRole } from '@/api/user'
import { getRoleList } from '@/api/roles'
export default {
  name: 'User',
  components: { TopNav, EditPopup },
  data() {
    return {
      tableData: [],
      search: '',
      pagenum: 1,
      pagesize: 5,
      total: 0,
      showDialog: false,
      userId: null,
      target: '',
      settingDialog: false,
      settingInfo: {},
      settingValue: '',
      settingOptions: []
    }
  },
  methods: {
    /* 获取用户信息 */
    async getUserInfo(params) {
      try {
        const res = await getUserInfo(params)
        this.tableData = res.users
        this.total = res.total
      } catch (err) {
        this.$message(err)
      }
    },
    /* 修改每页展示个数 */
    handleSizeChange(val) {
      this.pagesize = val
      this.getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
    },
    /* 切换页数 */
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
    },
    /* 删除 */
    async delUser(id) {
      try {
        await this.$confirm('确认删除？')
        await delUser(id)
        /* 【优化】如果是最后一页只有一行数据 */
        if (this.tableData.length === 1) {
          this.pagenum = this.pagenum - 1
        }
        this.getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
      } catch (err) {
        this.$message(err)
      }
    },
    /* 状态切换 */
    async changeState(val) {
      await changeState({ uId: val.id, type: val.mg_state })
      this.getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
    },
    /* 组件添加信息后更新 */
    updateInfo() {
      this.getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
    },
    /* 编辑 */
    edit(id) {
      this.userId = id
      this.showDialog = true
      this.target = '编辑用户'
      // console.log(this.$children[4])
      /* 父级调用子级的方法 */
      // this.$children[4].getUserInfoById(id)
      this.$refs.editChild.getUserInfoById(id)
    },
    /* 新增用户 */
    addUser() {
      this.showDialog = true
      this.target = '新增用户'
    },
    /* 设置按钮 */
    async setting(info) {
      this.settingOptions = await getRoleList()
      this.settingDialog = true
      this.settingInfo = info
    },
    /* 【修改角色有问题】 */
    async settingOk(id) {
      const data = {
        id,
        rid: this.settingValue
      }
      try {
        await updateUserRole(data)
      } catch (err) {
        console.log(err)
      }
    },
    /* 设置弹框关闭按钮 */
    settingClose() {
      this.settingValue = ''
      this.settingDialog = false
    },
    /* 搜索用户 */
    searchUser() {
      this.pagenum = 1
      this.pagesize = 5
      this.getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize, query: this.search })
    },
    clearList() {
      this.pagenum = 1
      this.pagesize = 5
      this.getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
    }
  },
  created() {
    this.getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
  }
}
</script>

<style lang="less" scoped></style>
