<template>
  <div>
    <TopNav name1="商品管理" :name2="$route.name" />
    <div class="body_container">
      <el-alert title="添加商品信息" type="success" :closable="false" center />
      <!-- 步骤条 -->
      <el-steps :active="active" finish-status="success" style="margin: 50px 0" space="300px" align-center>
        <el-step title="基本信息" icon="el-icon-s-order"></el-step>
        <el-step title="商品参数" icon="el-icon-s-operation"></el-step>
        <el-step title="商品属性" icon="el-icon-s-management"></el-step>
        <el-step title="商品图片" icon="el-icon-picture"></el-step>
        <el-step title="商品内容" icon="el-icon-edit"></el-step>
        <el-step title="完成" icon="el-icon-s-claim"></el-step>
      </el-steps>
      <!-- tab切换栏 -->
      <el-tabs tab-position="left" @tab-click="chose" :before-leave="checkForm">
        <el-tab-pane label="基本信息" name="0">
          <el-form ref="firstForm" label-position="top" label-width="80px" :model="baseInfo" :rules="rules">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="baseInfo.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格（￥）">
              <el-input-number
                v-model="baseInfo.goods_price"
                controls-position="right"
                style="width: 100%"
                :min="1"
                :max="999"
              />
            </el-form-item>
            <el-form-item label="商品重量（g）">
              <el-input-number
                v-model="baseInfo.goods_weight"
                controls-position="right"
                style="width: 100%"
                :min="1"
                :max="999"
              />
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input-number
                v-model="baseInfo.goods_number"
                controls-position="right"
                style="width: 100%"
                :min="1"
                :max="999"
              />
            </el-form-item>
            <el-form-item label="商品分类（只能选择3级分类）">
              <el-cascader
                v-model="baseInfo.goods_cat"
                :props="matching"
                :options="categoryList"
                @focus="getCat"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <el-alert title="默认全部勾选，一旦取消，无法撤销，谨慎选择" type="error" effect="dark" show-icon />
          <ManyPanel v-for="e in manyList" :key="e.attr_id" :manyList="e" @changeParams1="changeParams1" />
          <!-- <el-button type="info" @click="restore">重置</el-button> -->
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <OnlyPanel v-for="e in onlyList" :key="e.attr_id" :onlyList="e" @changeParams2="changeParams2" />
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload
            class="upload-demo"
            action="http://liufusong.top:8888/api/private/v1/upload"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <!-- 富文本框 -->
          <quillEditor ref="text" />
          <el-button type="primary" style="margin-top: 10px" @click="addGoods">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
      <!-- tab切换栏 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getCategories, getCategoriesParams, addGood } from '@/api/goods'
import TopNav from '@/components/TopNav'
import ManyPanel from './components/ManyPanel'
import OnlyPanel from './components/OnlyPanel'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { TopNav, ManyPanel, OnlyPanel, quillEditor },
  data() {
    return {
      active: 0,
      /* 基本信息 */
      baseInfo: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: ''
      },
      /* 表单校验 */
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 150, message: '商品名称长度为3-150个字符', trigger: 'blur' }
        ],
        cat: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'blur'
          }
        ]
      },
      categoryList: [],
      matching: {
        label: 'cat_name',
        value: 'cat_id',
        checkStrictly: true,
        expandTrigger: 'hover'
      },
      flag: true,
      manyList: [],
      onlyList: [],
      fileList: []
    }
  },
  methods: {
    /* 验证级联是否选择 */
    testCascader() {
      if (this.baseInfo.goods_cat === '') {
        if (this.flag) {
          this.$message('请选择商品分类')
          this.flag = false
          return Promise.reject()
        }
      }
    },
    /* 把一、二级别的选项禁用 */
    formatList(arr) {
      arr.forEach((e) => {
        if (e.cat_level !== 2) {
          e.disabled = true
          if (e.children) {
            this.formatList(e.children)
          }
        }
      })
    },
    /* 获得参数列表 */
    async getParams(type) {
      if (type === 'many') {
        this.manyList = await getCategoriesParams({ id: this.baseInfo.goods_cat[2], sel: type })
      } else {
        this.onlyList = await getCategoriesParams({ id: this.baseInfo.goods_cat[2], sel: type })
      }
    },
    /* 切换Tab前确认是否填写当前tab页面的表单数据 */
    async checkForm(n) {
      if (n !== '0') {
        await this.$refs.firstForm.validate()
        return this.testCascader()
      }
    },
    /* 切换页 */
    chose(e) {
      this.flag = true
      /* 获取many参数 */
      if (e.name === '1' && this.baseInfo.goods_cat !== '' && this.baseInfo.goods_name !== '') {
        this.getParams('many')
      }
      /* 获取only参数 */
      if (e.name === '2' && this.baseInfo.goods_cat !== '' && this.baseInfo.goods_name !== '') {
        this.getParams('only')
      }
      /* 只有必填表单不为空才可以跳转 */
      if (this.baseInfo.goods_cat !== '' && this.baseInfo.goods_name !== '') {
        this.active = Number(e.name)
      }
    },
    /* 把many参数和本部数据进行互通 */
    changeParams1(a, attr_id) {
      this.manyList.forEach((e) => {
        if (e.attr_id === attr_id) {
          e.attr_vals = a.join(' ')
        }
      })
    },
    /* 把only参数和本部数据进行互通 */
    changeParams2(val, attr_id) {
      this.onlyList.forEach((e) => {
        if (e.attr_id === attr_id) {
          e.attr_vals = val
        }
      })
    },
    /* 获取分类 */
    async getCat() {
      const a = await getCategories()
      this.formatList(a)
      this.categoryList = a
    },
    async addGoods() {
      // const a = this.$refs.text.getText(0)
      console.log(this.$refs.text._content)
      let data = []
      const a = this.baseInfo.goods_cat.join(',')
      data.goods_cat = a
      data = { ...this.baseInfo, ...data }
      data.goods_introduce = this.$refs.text._content
      const arrTrans = []
      this.manyList.forEach((e) => {
        arrTrans.push({ attr_id: e.attr_id, attr_value: e.attr_vals })
      })
      this.onlyList.forEach((e) => {
        arrTrans.push({ attr_id: e.attr_id, attr_value: e.attr_vals })
      })
      data.attrs = arrTrans
      data.pics = []
      data.goods_number = String(data.goods_number)
      data.goods_price = String(data.goods_price)
      data.goods_weight = String(data.goods_weight)
      await addGood(data)
      this.$router.push({ path: '/ProductList' })
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.el-input-number .el-input__inner) {
  text-align: left;
}
:deep(.ql-editor) {
  height: 300px;
}
:deep(.el-tabs__item) {
  font-size: 20px !important;
  font-family: '楷体';
  color: #065011;
  font-weight: bold;
}
:deep(.el-tabs__item:hover) {
  color: #a4dfad;
}
:deep(.is-active) {
  color: #a4dfad !important;
}
</style>
