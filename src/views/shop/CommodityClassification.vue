<template>
  <div>
    <TopNav name1="商品管理" :name2="$route.name" />
    <div class="body_container">
      <el-button type="primary" style="margin-bottom: 10px" @click="addClassification">添加分类</el-button>
      <TableList :targetList="catList" :ifShowHeader="true" />

      <!-- 弹出层【也可以用组件，但是吧，还是不那么较真了】 -->
      <el-dialog title="添加商品分类" :visible.sync="dialogVisible" width="30%" @close="handleClose">
        <el-form label-position="right" label-width="80px" :model="editInfo" ref="form" :rules="rules">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="editInfo.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader :options="optionList" :props="props" @change="choseCat" ref="cascader"></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="btnOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TopNav from '@/components/TopNav'
import { getCategories, addCategories } from '@/api/goods'
import TableList from './components/tableList.vue'
import cloneDeep from 'lodash/cloneDeep'
export default {
  components: { TopNav, TableList },
  data() {
    return {
      catList: [],
      optionList: [],
      dialogVisible: false,
      editInfo: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      rules: {
        cat_name: [{ required: true, message: '请输入分类名称！', trigger: 'blur' }]
      },
      /* 联级选择器设定 */
      props: { expandTrigger: 'hover', label: 'cat_name', checkStrictly: true, value: 'cat_id', emitPath: false }
    }
  },
  provide() {
    return { getList: this.getCatList }
  },
  methods: {
    /* 递归函数找数据 */
    searchId(arr, id) {
      let obj = {}
      arr.forEach((e) => {
        if (e.cat_id === id) {
          obj.cat_pid = e.cat_id
          obj.cat_level = e.cat_level + 1
        } else if (e.children) {
          /* 解构 */
          obj = { ...obj, ...this.searchId(e.children, id) }
        }
      })
      return obj
    },
    /* 获取列表 */
    async getCatList() {
      this.catList = await getCategories()
      /* 深拷贝，联级选择不要最后一个children */
      this.optionList = cloneDeep(this.catList)
      this.optionList.forEach((e) => {
        if (e.children) {
          e.children.forEach((item) => {
            delete item.children
          })
        }
      })
    },
    /* 添加分类 */
    addClassification() {
      this.dialogVisible = true
    },
    /* 关闭按钮 */
    handleClose() {
      this.editInfo = {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      }
      this.$refs.form.resetFields()
      this.$refs.cascader.$refs.panel.clearCheckedNodes()
      this.dialogVisible = false
    },
    /* 联级选择分类 */
    choseCat(n) {
      this.editInfo = { ...this.editInfo, ...this.searchId(this.catList, n) }
    },
    /* 确定按钮 */
    async btnOk() {
      await this.$refs.form.validate()
      await addCategories(this.editInfo)
      this.getCatList()
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  },
  created() {
    this.getCatList()
  }
}
</script>

<style lang="less" scoped>
:deep(.el-table__expand-column .cell .el-table__expand-icon) {
  display: none;
}
:deep(.el-table__expanded-cell) {
  padding: 0 !important;
  border: 0;
  .el-table {
    .el-table__row {
      background-color: #fff9f9 !important;
    }
  }
}
:deep(.el-form-item__label) {
  width: 100px !important;
}
:deep(.el-form-item__content) {
  display: flex;
}
</style>
