<template>
  <div>
    <!-- 头部区域e -->
    <header>
      <div class="login" v-if="islogin">登录后的盒子</div>
      <div class="loginout" v-else>未登录的盒子</div>

    </header>

   <!-- 中间 -->
    <main>收藏、历史</main>
    <!-- 底部 -->
    <footer v-if="islogin" @click="outFn">退出</footer>
  </div>
</template>

<script>
export default {

  computed:{
    islogin(){
      return !!this.$store.state.tokenobj.token;
    }
  },
  methods:{
    outFn(){
      this.$store.commit('SET_TOKEN', {});
    }
  }
}

</script>

<style></style>
