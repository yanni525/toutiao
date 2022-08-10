<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
    <Article></Article>
  </div>
</template>

<script>

import Article from "@/components/Article.vue"
export default {
    name:"DetalistS",
    components:{Article},
   
}
</script>

<style lang="less" scoped>
/deep/.navbar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
</style>