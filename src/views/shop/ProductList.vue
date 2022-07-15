<template>
  <div>
    <TopNav name1="商品管理" :name2="$route.name" />
    <div class="body_container">
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input placeholder="请输入内容" v-model="search" clearable @clear="clearList">
            <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="$router.push({ path: '/ProductList/addGoods' })"> 添加商品 </el-button>
        </el-col>
      </el-row>
      <!-- 搜索 -->

      <!-- table区域 -->
      <el-table :data="goodList" border style="width: 100%; margin: 20px 0">
        <el-table-column label="ID" width="50" type="index" align="center"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="150" align="center"> </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="150" align="center"> </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="300" align="center">
          <template slot-scope="scope">
            {{ (scope.row.add_time * 1000) | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click="delShop(scope.row.goods_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- table区域 -->

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
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TopNav from '@/components/TopNav'
import { getGoodsList, delGood } from '@/api/goods'
export default {
  components: { TopNav },
  data() {
    return {
      search: '',
      goodList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  methods: {
    /* 请求数据 */
    async getGoodList() {
      const data = await getGoodsList({ query: this.search, pagenum: this.pagenum, pagesize: this.pagesize })
      this.total = data.total
      this.goodList = data.goods
    },
    /* 修改每页展示个数 */
    handleSizeChange(val) {
      this.pagesize = val
      this.getGoodList({ pagenum: this.pagenum, pagesize: this.pagesize })
    },
    /* 切换页数 */
    handleCurrentChange(val) {
      this.pagenum = val
      this.getGoodList()
    },
    /* 搜素 */
    searchGoods() {
      this.pagenum = 1
      this.pagesize = 10
      this.getGoodList()
    },
    /* 清除搜索 */
    clearList() {
      this.pagenum = 1
      this.pagesize = 10
      this.getGoodList()
    },
    /* 删除商品 */
    async delShop(n) {
      await delGood(n)
      if (this.goodList.length === 1) {
        this.pagenum = this.pagenum - 1
      }

      this.getGoodList()
    }
  },
  created() {
    this.getGoodList()
  }
}
</script>

<style></style>
