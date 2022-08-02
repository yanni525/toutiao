<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in list" :key="item.id" :title="item.name">
        <Articlelist :id="item.id"></Articlelist>
      </van-tab>

      <span class="toutiao toutiao-gengduo1"></span>
    </van-tabs>
  </div>
</template>

<script>
import { GetMyChannel as GetMyChannelApi } from '@/Api'
import Articlelist from './components/Articlelist.vue'
export default {
  name: 'HomeS',
  components: {
    Articlelist
  },
  data() {
    return {
      active: 0,
      list: []
    }
  },
  mounted() {
    this.GetMyChannel()
  },
  methods: {
    async GetMyChannel() {
      try {
        const { data } = await GetMyChannelApi()
        this.list = data.data.channels
      } catch (e) {
        this.$toast.fail('获取频道失败，请刷新')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;
  position: sticky;
  top: 0;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  color: #fff;
  background-color: #5babfb;
  border-radius: 26.64rem;
  padding: 0 0.4rem;
  font-size: 0.37333rem;
  border: none;
}
.van-icon-search {
  color: #fff;
}
// .van-tab__pane {
//   // 符号两侧必须有空格
//   min-height: calc(100vh - 92px - 88px - 100px);
// }
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
  background-color: #fff;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 92px;
  right: 0;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 88px - 100px);
  overflow: auto;
  padding-bottom: 100px;
}
</style>
