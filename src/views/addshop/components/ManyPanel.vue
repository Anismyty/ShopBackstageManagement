<template>
  <div>
    <el-row type="flex" align="middle" style="margin: 10px 0">
      <el-col :span="3" style="text-align: center">{{ manyList.attr_name }}</el-col>
      <el-col :span="18">
        <el-checkbox-group v-model="formatArray" v-if="formatArray.length > 0">
          <el-checkbox v-for="(e, i) in formatArray" :key="i" :label="e" border @change="change"></el-checkbox>
        </el-checkbox-group>
        <el-alert :closable="false" v-else title="暂无参数" type="warning" style="width: 80%"></el-alert>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ManyPanel',
  props: {
    manyList: {
      type: [Object, Array]
    }
  },
  data() {
    return {
      manyParams: true,
      formatArray: [],
    }
  },
  methods: {
    formatList(str) {
      if (str !== '') {
        this.formatArray = str.split(' ')
      } else {
        this.formatArray = []
      }
    },
    change() {
      this.$emit('changeParams1', this.formatArray, this.manyList.attr_id)
    }
  },
  created() {
    this.formatList(this.manyList.attr_vals)
  }
}
</script>

<style lang="less" scoped>
.a {
  text-align: left;
}
</style>
