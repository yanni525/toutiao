<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    //   increement(){
    //     //不推荐
    //     // this.$store.state.num +=1
    //     this.$store.commit('SET_NUM',10)
    //   }
    // }
  }
}
</script>

<style scoped lang="less"></style>
