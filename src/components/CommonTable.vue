<template>
  <div class="table-container">
    <!-- 表格属性：斑马纹 -->
    <el-table :data="tableData" max-height="578px" stripe>
      <!-- 表格栏属性：内容过长时被隐藏 -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 这是 element-ui Table组件提供的 Table-column Scoped Slot -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="configData.page"
      @current-change="changePage"
      :page-size="parseInt(20)"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  data() {
    return {
      configData: this.config
    }
  },
  methods: {
    handleEdit(row) {
      console.log("我是row",row);
      this.$emit('edit', row)
    },
    handleDelete(row) {
      this.$emit('del', row)
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="less" scoped>
.table-container {
  height: calc(100% - 62px);
  // height: 100%;
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: -28px;
    right: 0;
    padding: 0;
    width: 100%;
    background-color: #fff;
    text-align: right;
  }
}
</style>>
