<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <Articlelist :id="item.id"></Articlelist>
      </van-tab>

      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPopup
        :myChannels="myChannels"
        @close="show = false"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></ChannelPopup>
    </van-popup>
  </div>
</template>

<script>
//$event只存在模板中
// 原生事件：事件对象
//自定义事件当中：子组件传递过来的第一个参数
import {
  GetMyChannel as GetMyChannelApi,
  delChannels,
  addChannel,
  setMyChannelsToLocal,
  getMyChannelsByLocal
} from '@/Api'
import Articlelist from './components/Articlelist.vue'
import ChannelPopup from '@/components/ChannelPopup'
export default {
  name: 'HomeS',
  components: {
    Articlelist,
    ChannelPopup
  },
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },

  computed: {
    isLogin() {
      return !!this.$store.state.tokenobj.token
    }
  },
  created() {
    this.initMyChannels()
  },
  mounted() {
    this.GetMyChannel()
  },
  methods: {
    //初始化mychannels数据
    initMyChannels() {
      if (this.isLogin) {
        //登录了
        //发送请求获取myChannels数据
        this.GetMyChannel()
      } else {
        //未登录
        const myChannels = getMyChannelsByLocal()
        //本地存储有myChannels数据，从本地拿
        if (myChannels) {
          this.myChannels = myChannels
        } else {
          //本地存储没有myChannels数据，获取默认的myChannels
          this.GetMyChannel()
        }
      }
    },
    async GetMyChannel() {
      try {
        const { data } = await GetMyChannelApi()
        this.myChannels = data.data.channels
        console.log(this.myChannels)
      } catch (e) {
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true //在删除时页面禁止点击
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          //删除服务器上得数据
          await delChannels(id)
        } else {
          //删除页面上的数据
          setMyChannelsToLocal(newChannels)
        }
        this.myChannels = newChannels
        this.$toast.success('删除频道成功~')
      } catch (e) {
        this.$toast.fail('删除频道失败')
      }
    },
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true //在删除时页面禁止点击
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannels.length)
        } else {
          setMyChannelsToLocal([...this.myChannels, channel])
        }
        this.myChannels.push(channel)
        this.$toast.success('添加频道成功~')
      } catch (e) {
        this.$toast.fail('添加频道失败')
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
