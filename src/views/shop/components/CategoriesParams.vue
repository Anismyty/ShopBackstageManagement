<template>
  <div>
    <el-button type="primary" @click="add" :disabled="targetId === ''" style="background-color: #03641d">{{ typeName }}</el-button>
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="hiddenPanel">
            <el-tag
              :key="tag.attr_id"
              v-for="tag in props.row.attr_vals"
              closable
              :disable-transitions="false"
              @close="handleClose(tag, props.row)"
            >
              {{ tag }}
            </el-tag>
            <WahtA @addTag="addTag" :info="props.row" />
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index" label="ID" width="300" align="center"></el-table-column>
      <el-table-column prop="attr_name" label="分类名称" width="300" align="center"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog ref="form" :title="editName || titleName" :visible="dialogVisible" width="30%" @close="close">
      <el-form label-position="right" label-width="80px" :model="editInfo" ref="form" :rules="rules">
        <el-form-item :label="titleName.substring(2, 6)" prop="attr_name">
          <el-input v-model="editInfo.attr_name" :placeholder="placeholder" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="btnOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { getCategoriesParams, delCategoriesParams, addCategoriesParams, editCategoriesParams } from '@/api/goods'
import WahtA from './WhatA'
export default {
  name: 'CategoriesParams',
  components: { WahtA },
  props: {
    typeName: {
      type: String,
      required: true
    },
    titleName: {
      type: String,
      required: true
    },
    targetId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      editInfo: {
        attr_name: ''
      },
      rules: {
        attr_name: [{ required: true, message: '请输入分类名称！', trigger: 'blur' }]
      },
      editName: null,
      placeholder: '',
      editID: null,
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      smallTag: ''
    }
  },
  computed: {
    sel() {
      return this.typeName === '添加参数' ? 'many' : 'only'
    }
  },
  methods: {
    /* 处理数组的attr_vals */
    formatList(arr) {
      arr.forEach((e) => {
        if (e.attr_vals) {
          e.attr_vals = e.attr_vals.split(' ')
        }
      })
    },
    /* 获取全部数据 */
    async getListInfo(id, sel) {
      this.tableData = await getCategoriesParams({ id, sel })
      this.formatList(this.tableData)
    },
    /* 添加参数 */
    add() {
      this.dialogVisible = true
    },
    /* 确定按钮 */
    async btnOk() {
      await this.$refs.form.validate()
      if (this.editID === null) {
        /* 新增 */
        await addCategoriesParams({ id: this.targetId, ...this.editInfo, attr_sel: this.sel })
      } else {
        /* 编辑【要把标签转换】 */
        await editCategoriesParams({
          cat_id: this.targetId,
          attr_id: this.editID,
          ...this.editInfo,
          attr_sel: this.sel,
          attr_vals: this.smallTag
        })
      }
      this.getListInfo(this.targetId, this.sel)
      this.dialogVisible = false
    },
    /* 编辑 */
    edit(info) {
      if (this.sel === 'many') {
        this.editName = '修改动态参数'
      } else {
        this.editName = '修改静态参数'
      }
      this.placeholder = info.attr_name
      this.editID = info.attr_id
      if (info.attr_vals !== '') {
        this.smallTag = info.attr_vals.join(' ')
      }
      this.dialogVisible = true
    },
    /* 删除 */
    async del(info) {
      await delCategoriesParams({ attrid: info.attr_id, id: this.targetId })
      this.getListInfo(this.targetId, this.sel)
    },
    /* 关闭按钮 */
    close() {
      this.dialogVisible = false
      this.editName = null
      this.editID = null
      this.placeholder = ''
      this.smallTag = ''
      this.$refs.form.resetFields()
    },
    /* 动态标签【删除】 */
    async handleClose(tag, info) {
      /* 叉掉哪个，把哪个从数组里去掉 */
      let a
      this.tableData.forEach((e) => {
        if (e.attr_id === info.attr_id) {
          e.attr_vals.splice(e.attr_vals.indexOf(tag), 1)
          a = e.attr_vals.join(' ')
        }
      })
      await editCategoriesParams({ ...info, attr_vals: a })
    },
    async addTag(val, info) {
      if (val !== '') {
        /* 处理数据 */
        let trans = info.attr_vals
        if (typeof trans === 'string') {
          trans += val
          trans = trans.split(' ')
          info.attr_vals = trans
        } else {
          trans.push(val)
        }
        const str = info.attr_vals.join(' ')
        await editCategoriesParams({
          ...info,
          attr_vals: str
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.hiddenPanel {
  margin-left: 50px;
}

</style>
