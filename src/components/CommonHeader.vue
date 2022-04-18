<template>
  <header class="header-container">
    <!-- <button @click="isCurrentMenu">teeetetet</button> -->
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :ref="item.name" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img :src="userImg" class="user"><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" @click.native="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </header>
</template>

<script>
// import bus from "@/eventBus.js"
import { mapState } from 'vuex'
export default {
  name: 'CommonHeader',
  data() {
    return {
      userImg: require('../assets/images/ldh.png'),
      isCollapse: false
    }
  },
  methods: {
    // sendIsCollapse() {
    //   console.log(!this.isCollapse);
    //   this.isCollapse = !this.isCollapse
    //   bus.$emit('state', this.isCollapse)
    // }
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    // isCurrentMenu() {
    //   const state = this.$store.state.tab.currentMenu;
    //   const current = state.name
    //   this.$refs.current
      
    // }
    logOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList,
    }),

  }
}
</script>

<style lang="less" scoped>
  .header-container {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-content: center;
    h3 {
      display: inline-block;
      margin-left: 12px
    }
  }
  .l-content {
    height: 100%;
    display: flex;
    align-items: center;
    button {
      padding: 9px 15px;
      vertical-align: middle;
    }
  }
  .r-content {
    display: flex;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 15px;
    }
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  // 面包屑
  .el-breadcrumb {
    display: inline-block;
    margin-left: 10px;
  }
  /deep/ .el-breadcrumb__inner {
    color: #606266;
  }
  /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #fff;
  }
</style>