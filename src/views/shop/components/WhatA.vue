<template>
  <div class="tag">
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button type="primary" icon="el-icon-edit" v-else class="button-new-tag" size="small" @click="showInput">
      添加新标签
    </el-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      this.$emit('addTag', this.inputValue, this.info)
      this.inputValue = ''
      this.inputVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  display: inline-block;
  margin-left: 10px;
}
</style>
