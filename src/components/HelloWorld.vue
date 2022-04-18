<template>
  <div class="hello">
    <router-link to="/home">
      <el-button @click="visible = true" type="success">主页</el-button>
    </router-link>
    <router-link to="/user">
      <el-button @click="visible = true" type="primary">用户</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
