<template>
  <!-- 弹出层 -->
  <el-dialog :title="titleNmae" :visible="dialogVisible" width="30%" @close="handleClose">
    <el-form label-position="right" label-width="1rem" :model="editInfo" ref="form" :rules="rules">
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="editInfo.cat_name" :placeholder="defaultContent"></el-input>
      </el-form-item>
      <el-form-item label="父级分类" v-if="dataList !== undefined">
        <el-cascader :options="dataList" :props="props" @change="choseCat" ref="cascader"></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { editCategories } from '@/api/goods'
export default {
  name: 'PropLayer',
  props: {
    titleNmae: {
      type: String,
      required: true
    },
    dataList: {
      type: Array
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    editId: {
      type: [String, Number]
    },
    defaultContent: {
      type: String
    }
  },
  data() {
    return {
      editInfo: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      props: { expandTrigger: 'hover', label: 'cat_name', checkStrictly: true, value: 'cat_id', emitPath: false },
      rules: {
        cat_name: [{ required: true, message: '请输入分类名称！', trigger: 'blur' }]
      }
    }
  },
  inject: {
    getList: 'getList'
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.form.resetFields()
    },
    /* 确定按钮【确定修改】 */
    async btnOk() {
      await this.$refs.form.validate().catch((err) => err)
      await editCategories({ id: this.editId, cat_name: this.editInfo.cat_name })
      this.$emit('update:dialogVisible', false)
      this.getList()
    },
    choseCat() {
      console.log(1)
    }
  }
}
</script>

<style></style>
