<template>
  <div class="login-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login"
    >
      <h3 class="login-title">系统登录</h3>
      <!-- 用户名 -->
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item
        label="密码"
        label-width="80px"
        prop="password"
        class="password"
      >
        <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <div class="center">
        <el-button type="primary" @click="login" class="login-submit">登录</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import { getMenu } from '../../api/data.js'
export default {
  name: 'myLogin',
  data () {
    return {
      form: {

      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "用户名长度不能小于3位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    login() {
      getMenu(this.form).then(({data: res}) => {
        console.log(res);
        if (res.code === 20000) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name:'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
      // 使用 mock 生成一个随机数，模拟token
      // const token = Mock.Random.guid()
      // this.$store.commit('setToken', token)
      // this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    border-top: 0.1px solid rgba(0,0,0,0);
  }
  .login {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    // 标题
    .login-title {
      margin: 0 auto 40px auto;
      text-align: center;
      color: #505458;
    }
  }
  .login-submit {
    margin: 10px auto 0px auto;
  }
  .center {
    text-align: center;
  }
</style>