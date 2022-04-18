<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    // 1：进行路由跳转。2：修改侧边栏active状态
    ...mapMutations({
      close: 'closeTag'
    }),
    changeMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('tagToActive', item)
    },
    handleClose(tag, index) {
      const length = this.tags.length -1
      // 调用 closeTag 删除标签
      this.close(tag)
      // 如果删除的不是当前“聚焦”的tag，则返回。
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name
        })
      } else {
        this.$router.push({
          name: this.tags[index].name
        })
      }

    }
  }
}
</script>

<style lang="less" scoped>
  .tabs {
    padding: 20px;
    .el-tag {
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>