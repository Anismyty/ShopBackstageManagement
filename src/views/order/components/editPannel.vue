<template>
  <div>
    <el-dialog @close="closeBtn" title="搜索条件" :visible="dialogVisible" width="50%">
      <el-form ref="choseForm" label-position="right" label-width="80px" :model="searchInfo">
        <el-form-item label="支付状态">
          <el-radio-group v-model="searchInfo.pay_status">
            <el-radio label="支付" border></el-radio>
            <el-radio label="未支付" border></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发货状态">
          <el-radio-group v-model="searchInfo.is_send">
            <el-radio label="已发货" border></el-radio>
            <el-radio label="未发货" border></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头">
          <el-radio-group v-model="searchInfo.order_fapiao_title">
            <el-radio label="公司" border></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button type="primary" @click="searchOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'editPannel',
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      searchInfo: {
        pay_status: '',
        is_send: '',
        order_fapiao_title: ''
      }
    }
  },
  methods: {
    closeBtn() {
      this.searchInfo = {
        pay_status: '',
        is_send: '',
        order_fapiao_title: ''
      }
      this.$emit('update:dialogVisible', false)
      this.$refs.choseForm.resetFields()
    },
    searchOk() {
      let target = {
        pay_status: '',
        is_send: '',
        order_fapiao_title: []
      }
      if (this.searchInfo.pay_status === '未支付') {
        target.pay_status = 0
      } else if (this.searchInfo.pay_status === '支付') {
        target.pay_status = 1
      }
      if (this.searchInfo.is_send === '未发货') {
        target.is_send = 0
      } else if (this.searchInfo.is_send === '已发货') {
        target.is_send = 1
      }
      if (this.searchInfo.order_fapiao_title === '个人') {
        target.order_fapiao_title.push('个人')
      } else if (this.searchInfo.order_fapiao_title === '公司') {
        target.order_fapiao_title.push('公司')
      }
      this.$emit('changePage', target)
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style></style>
