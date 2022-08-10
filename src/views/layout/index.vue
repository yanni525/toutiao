<template>
  <div>
    <router-view></router-view>

    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in tabbarData" :key="index" :icon="item.icon" icon-prefix="toutiao" :to="item.path"
        >{{item.text}}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: 0,
      tabbarData: [
        {
          path: '/ ',
          text: '首页',
          icon: 'shouye1'
        },
          {
          path: '/video',
          text: '视频',
          icon: 'shipin'
        },
                  {
          path: '/qa',
          text: '问答',
          icon: 'wenda'
        },
          {
          path: '/my',
          text: this.$store.state.tokenobj ? '我的':'未登录',
          icon: 'wode'
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-tabbar-item {
  font-size: 24px;
}
/deep/.toutiao {
  font-size: 35px;
}
</style>
