<template>
  <div>
    <el-row style="margin: 10px">
      <el-col :span="3">{{ onlyList.attr_name }}</el-col>
      <el-col :span="15" style="text-align: center">
        <el-input v-model="attrval" :placeholder="onlyList.attr_vals" @change="changeOnly"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'OnlyPanel',
  props: {
    onlyList: {
      type: [Object, Array]
    }
  },
  data() {
    return {
      attrval: ''
    }
  },
  methods: {
    changeOnly() {
      this.$emit('changeParams2', this.attrval, this.onlyList.attr_id)
    }
  }
}
</script>

<style></style>
