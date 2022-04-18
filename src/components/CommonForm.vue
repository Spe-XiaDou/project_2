<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <!-- type=input -->
      <el-input
       
       v-if="item.type === 'input'"
       :placeholder="'请输入' + item.label"
       v-model="formData[item.model]"
       ></el-input>
      <!-- type=switch开关控件 -->
      <el-switch
       
       v-if="item.type === 'switch'"
       v-model="formData[item.model]"
      ></el-switch>
      <!-- type=date日期控件 -->
      <el-date-picker
       
       v-if="item.type === 'date'"
       placeholder="选择日期"
       v-model="formData[item.model]"
       value-format="yyyy-MM-dd"
      ></el-date-picker>
      <!-- 下拉选择器 -->
      <el-select
       
       v-if="item.type === 'select'"
       placeholder="请选择"
       :value="item.value"  
       v-model="formData[item.model]"
      >
        <el-option
          v-for="subItem in item.opts"
          :key="subItem.value"
          :label="subItem.label"
          :value="subItem.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 当以上情况都不满足时，启用插槽 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CommonForm',
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean
  },
  data() {
    return {
      formData: this.form
    }
  },
  // methods: {
  //   operateFormChange() {
  //     console.log(this.$refs);
  //     this.$emit("operateFormChange", this.formData)
  //   }
  // },
  // computed: {
  //   formData() {
  //     return this.form
  //   }
  // }
}
</script>

<style lang="less" scoped>

</style>>
