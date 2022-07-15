<template>
  <div>
    <!-- 传入需要进行table的数据 -->
    <el-table
      :data="targetList"
      :show-header="ifShowHeader"
      :border="ifShowHeader"
      style="width: 100%; margin: 0; padding: 0"
      ref="targetTable"
    >
      <!-- 第一行ID —— 空 -->
      <el-table-column width="100" label="ID" align="center" :type="ifShowHeader ? 'index' : ''"></el-table-column>
      <!-- 第二行按钮 -->
      <el-table-column width="180" label="分类名称">
        <template slot-scope="scope">
          <span
            v-if="scope.row.children"
            style="display: flex; align-items: center"
            :class="{ text_indent: ifTextIndent }"
          >
            <i :class="ifShowHeader ? 'el-icon-s-operation one' : 'el-icon-s-order two'" style="font-size: 20px"></i>
            <el-button type="text" @click="toogleExpand(scope.row)">
              {{ scope.row.cat_name }}
            </el-button>
          </span>
          <span v-else :class="{ text_indent: ifTextIndent, text_indent2: scope.row.cat_level === 2 }">{{
            scope.row.cat_name
          }}</span>
        </template>
      </el-table-column>
      <!-- 第三行下拉框【隐藏】 -->
      <el-table-column type="expand" width="1">
        <template slot-scope="props">
          <!-- 内层的table -->
          <TableList v-if="props.row.children" :targetList="props.row.children" :ifTextIndent="true" />
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="是否有效">
        <i class="el-icon-success" style="color: green"></i>
      </el-table-column>
      <el-table-column prop="cat_level" label="排序" align="center">
        <template slot-scope="props">
          <el-tag type="danger" v-if="props.row.cat_level === 0" effect="dark">一级</el-tag>
          <el-tag effect="dark" :type="props.row.cat_level === 1 ? 'success' : 'warning'" v-else>
            {{ props.row.cat_level === 1 ? '二级' : '三级' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="props">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editCat(props.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delBtn(props.row.cat_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <PropLayer :defaultContent='defaultContent' :dialogVisible.sync="dialogVisible" titleNmae="编辑分类名称" :editId="editId" />
  </div>
</template>

<script>
/* eslint-disable */
import TableList from './tableList'
import { delCategories } from '@/api/goods'
import PropLayer from './PropLayer'
export default {
  name: 'TableList',
  props: {
    /* 传入数据 */
    targetList: {
      type: Array
    },
    /* 是否显示表头 */
    ifShowHeader: {
      type: Boolean,
      default: false
    },
    /* 本文缩进距离 */
    ifTextIndent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      size: '30px',
      dialogVisible: false,
      editId: null,
      defaultContent:'',
    }
  },
  inject: {
    getList: 'getList'
  },
  components: { TableList, PropLayer },
  methods: {
    /* 切换点击的事件 */
    toogleExpand(row) {
      let table = this.$refs.targetTable
      this.targetList.map((item) => {
        if (row.id != item.id) {
          table.toggleRowExpansion(item, false)
        }
      })
      table.toggleRowExpansion(row)
    },
    /* 删除 */
    delBtn(id) {
      this.$confirm('确认是否删除？')
        .then(async () => {
          await delCategories(id)
          this.getList()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /* 编辑 */
    editCat(data) {
      this.editId = data.cat_id
      this.defaultContent = data.cat_name
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.text_indent {
  margin-left: 30px;
}
.text_indent2 {
  margin-left: 60px;
  color: #f60000;
  font-weight: bold;
}
.one {
  color: #099005;
}
.two {
  color: #943003;
}
</style>
