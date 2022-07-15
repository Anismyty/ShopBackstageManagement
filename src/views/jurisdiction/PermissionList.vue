<template>
  <div>
    <TopNav name1="权限管理" :name2="$route.name" />
    <div class="body_container">
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="index" label="ID" width="50" align="center"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="250" align="center"> </el-table-column>
        <el-table-column prop="path" label="路径" align="center"> </el-table-column>
        <el-table-column
          label="权限等级"
          align="center"
          prop="level"
          :filters="[
            { text: '等级一', value: '0' },
            { text: '等级二', value: '1' },
            { text: '等级三', value: '2' }
          ]"
          :filter-method="filterTag"
        >
          <template slot-scope="props">
            <el-tag type="danger" v-if="props.row.level === '0'">{{ props.row.level | formatPermission }}</el-tag>
            <el-tag :type="props.row.level === '1' ? 'success' : 'warning'" v-else>
              {{ props.row.level | formatPermission }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TopNav from '@/components/TopNav'
import { getAllPermission } from '@/api/roles'
/* 引入枚举 */
import permisssion from '@/api/constant/permission.js'
export default {
  name: 'RoleList',
  components: { TopNav },
  data() {
    return {
      list: []
    }
  },
  methods: {
    async getList() {
      this.list = await getAllPermission('list')
    },
    filterTag(value, row) {
      return row.level === value
    }
  },
  created() {
    this.getList()
  },
  filters: {
    /* 权限格式化 */
    formatPermission(v) {
      const obj = permisssion.permissonType.find((e) => e.level === v)
      return obj ? obj.name : '未知'
    }
  }
}
</script>

<style></style>
