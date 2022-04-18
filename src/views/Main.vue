<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <!-- 侧边栏组件 -->
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 头部组件 -->
        <common-header></common-header>
      </el-header>
      <!-- tag标签组件 -->
      <common-tag></common-tag>
      <el-main>
        <!-- 嵌套路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入 侧边栏 组件
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'

export default {
  components: { CommonAside, CommonHeader, CommonTag },
  name: 'myMain',
  data() {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
.el-container {
  background-color: #f0f2ff;
}
// .el-aside {
//   background-color: #D3DCE6;
//   color: #333;
//   text-align: center;
//   line-height: 200px;
// }
</style>