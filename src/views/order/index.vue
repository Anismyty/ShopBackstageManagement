<template>
  <div>
    <TopNav name1="订单管理" :name2="$route.name" />
    <div class="body_container">
      <span class="topBtn">
        <el-button @click="chose">按条件筛选</el-button>
        <el-button @click="clearChose" type="warning" :disabled="disabled">清除筛选条件</el-button>
      </span>
      <el-table :data="tableData" border style="width: 100%; margin: 20px 0">
        <el-table-column label="ID" type="index" align="center" />
        <el-table-column prop="order_number" label="订单编号" width="300"> </el-table-column>
        <el-table-column prop="order_price" label="订单价格(￥)" width="150" align="center"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.pay_status === '0' ? 'danger' : 'success'" effect="dark" disable-transitions>
              {{ scope.row.pay_status === '0' ? '未支付' : '已支付' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" align="center"> </el-table-column>
        <el-table-column label="下单时间" width="120">
          <template slot-scope="scope">
            {{ (scope.row.create_time * 1000) | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <el-button type="primary" icon="el-icon-edit" circle @click="editBtn"></el-button>
        </el-table-column>
      </el-table>

      <!-- 底部分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="pagenum"
      />
      <!-- 底部分页 -->
      <EditPannel :dialogVisible.sync="dialogVisible" @changePage="changePage" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TopNav from '@/components/TopNav'
import EditPannel from './components/editPannel'
import { getOrderList } from '@/api/order'
export default {
  components: { TopNav, EditPannel },
  data() {
    return {
      tableData: [],
      total: 0,
      pagenum: 1,
      pagesize: 10,
      dialogVisible: false,
      targetAll: {},
      disabled: true
    }
  },
  methods: {
    async getOrderInfo(other) {
      const data = {
        query: '',
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        user_id: '',
        pay_status: '',
        is_send: '',
        order_fapiao_title: '',
        order_fapiao_company: '',
        order_fapiao_content: '',
        consignee_addr: ''
      }
      const res = await getOrderList({ ...data, ...other })
      this.tableData = res.goods
      this.total = res.total
    },
    /* 修改每页展示个数 */
    handleSizeChange(val) {
      this.pagesize = val
      this.getOrderInfo(this.targetAll)
    },
    /* 切换页数 */
    handleCurrentChange(val) {
      this.pagenum = val
      this.getOrderInfo(this.targetAll)
    },
    /* 点击选择按钮 */
    chose() {
      this.dialogVisible = true
    },
    /* 确定选择的条件 */
    changePage(target) {
      this.targetAll = target
      this.pagenum = 1
      this.pagesize = 10
      this.getOrderInfo(target)
      this.disabled = false
    },
    /* 清除条件 */
    clearChose() {
      this.targetAll = {}
      this.pagenum = 1
      this.pagesize = 10
      this.getOrderInfo(this.targetAll)
      this.disabled = true
    },
    /* 编辑按钮 */
    editBtn() {
      this.$message('暂时没功能呢')
    }
  },
  created() {
    this.getOrderInfo()
  }
}
</script>

<style lang="less" scoped>
.topBtn {
  .el-button:nth-child(1) {
    background-color: #056f1c;
    color: white;
    font-size: 20px;
    letter-spacing: 5px;
  }
  .el-button:nth-child(1):hover {
    background-color: #a3f0b4;
    color: #056f1c;
  }
}
</style>
