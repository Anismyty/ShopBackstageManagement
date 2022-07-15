<template>
  <div>
    <TopNav name1="商品管理" :name2="$route.name" />
    <div class="body_container">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        :closable="false"
        type="info"
        show-icon
        effect="dark"
        style="background-color: #03641d"
      />
      <div class="chose10086">
        <span>选择商品分类：</span>
        <el-cascader
          ref="cascader"
          v-model="value"
          :options="options"
          @change="handleChange"
          :props="props"
          popper-class="popper-custom"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" :before-leave="beforeLeave" @tab-click="leaveTab">
        <el-tab-pane name="添加参数">
          <span slot="label" style="font-size: 20px"><i class="el-icon-s-promotion"></i> 添加参数</span>
          <CategoriesParams :typeName="activeName" :targetId="value" ref="paramsTable" titleName="添加动态属性" />
        </el-tab-pane>
        <el-tab-pane name="添加属性">
          <span slot="label" style="font-size: 20px"><i class="el-icon-document-copy"></i> 静态属性</span>
          <CategoriesParams :typeName="activeName" :targetId="value" ref="paramsTable2" titleName="添加静态参数" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TopNav from '@/components/TopNav'
import CategoriesParams from './components/CategoriesParams'
import { getCategories } from '@/api/goods'
/* 无法选中文本 */
document.body.onselectstart = function () {
  return false
}
export default {
  components: { TopNav, CategoriesParams },
  data() {
    return {
      props: { checkStrictly: true, expandTrigger: 'hover', label: 'cat_name', value: 'cat_id', emitPath: false },
      activeName: '添加参数',
      options: [],
      value: ''
    }
  },
  methods: {
    /* 递归寻找id对应的level */
    searchLevel(arr, id) {
      let target = []
      arr.forEach((e) => {
        if (e.cat_id === id) {
          target.push(e.cat_level)
        } else if (e.children) {
          target.push(...this.searchLevel(e.children, id))
        }
      })
      return target
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
    /* 获取列表 */
    async getCatList() {
      // this.options = await getCategories()
      const a = await getCategories()
      this.formatList(a)
      this.options = a
    },
    /* 级联选择的时候获取数据 */
    handleChange(value) {
      const a = this.activeName === '添加参数' ? 'many' : 'only'
      this.$refs.paramsTable.getListInfo(value, a)
      this.$refs.cascader.dropDownVisible = false
    },
    /* 选项卡的响应基于选择了三级目录 */
    beforeLeave() {
      if (this.value === '') {
        this.$message({
          type: 'error',
          message: '请选择三级类目'
        })
        return false
      }
    },
    leaveTab() {
      if (this.value !== '') {
        const a = this.activeName === '添加参数' ? 'many' : 'only'
        if (a === 'many') {
          this.$refs.paramsTable.getListInfo(this.value, a)
        } else {
          this.$refs.paramsTable2.getListInfo(this.value, a)
        }
      }
    }
  },
  created() {
    this.getCatList()
  }
}
</script>
<style lang="less">
.chose10086 {
  margin: 20px 0;
}
.popper-custom {
  .el-radio {
    width: 80% !important;
    position: absolute !important;
    opacity: 0 !important;
  }
  .is-disabled {
    .el-cascader-node__label {
      color: #e3e3e3 !important;
    }
  }
}
.wa {
  color: #019d25;
}
</style>
