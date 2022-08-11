<template>
  <div>
    <van-card
      v-for="(item, index) in list"
      :key="item.com_id"
      :desc="item.content"
      :thumb="item.aut_photo"
    >
      <template #title>
        <div class="title-warp">{{ item.aut_name }}</div>

        <div class="icon-right">
          <van-icon
            :name="item.is_liking ? 'good-job' : 'good-job-o'"
            :class="{
              link: item.is_liking
            }"
            @click="AttitudeFn(item.is_liking, index )"
          /><span>{{ item.like_count === 0 ?'赞':item.like_count }}</span>
        </div>
      </template>

      <template #tags>
        <van-tag>{{ Time(item.pubdate) }}</van-tag>
        <van-tag @click="OnReply(item)">回复{{ item.reply_count }}</van-tag>
      </template>
    </van-card>
    <!-- 回复评论 -->
    <van-popup
      v-model="replyshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 头部导航 -->
      <van-nav-bar
        :title="replys.reply_count ? replys.reply_count + '条回复' : '暂无回复'"
        left-arrow
        @click-left="replyshow = false"
      />
      <!-- 回复详情 -->
      <van-card :desc="replys.content" :thumb="replys.aut_photo">
        <template #title>
          <div class="title-warp">{{ replys.aut_name }}</div>
          <div class="icon-right">
            <van-icon
              :name="replys.is_liking ? 'good-job' : 'good-job-o'"
              :class="{
                link: replys.is_liking
              }"
              @click="AttitudeFn1(replys.is_liking)"
            /><span>{{ replys.like_count ===0 ?'赞' :replys.like_count}}</span>
          </div>
        </template>
        <template #tags>
          <van-tag>{{ Time(replys.pubdate) }}</van-tag>
          <van-tag>回复{{ replys.reply_count }}</van-tag>
        </template>
      </van-card>
       <!-- class="replysp" -->
      <van-divider>全部回复</van-divider>
      <van-list
        offset="0"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad1"
      >
        <ArtComList :list="commentsd"></ArtComList>
      </van-list>
      <div class="replyfooter">
        <van-button text="写评论" @click="show = true" />
        <van-overlay :show="show">
          <div class="wrapper">
            <van-field
              v-model="message"
              rows="2"
              focus
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入留言"
              show-word-limit
            >
            </van-field>
            <div class="right-btn" @click="show = false">
              <button @click="SendComment1(replys.com_id)">发送</button>
            </div>
          </div>
        </van-overlay>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  getCommentLick,
  getCommentOnLink,
  getComment,
  getSendComment
} from '@/Api'
import { timeAgo } from '@/utils/day'
import { mapState } from 'vuex'

export default {
  name: 'ArtComList',
  data() {
    return {
      show: false,
      message: '',
      replys: {},
      replyshow: false,
      commentsd: [],
      loading: false,
      finished: false,
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    async onLoad1() {
      try {
        const { data } = await getComment({
          type: 'c',
          source: this.replys.com_id
        })
        console.log(data)
        this.commentsd = data.data.results
        if (this.commentsd) {
          this.finished = true
        }
      } catch (e) {
        console.log(e)
      }
    },
    async AttitudeFn(like, index) {
      try {
        if (like) {
          await getCommentOnLink(this.list[index].com_id)
         this.list[index].like_count --
        } else {
          await getCommentLick(this.list[index].com_id)
          this.list[index].like_count++
        }
        this.list[index].is_liking = !this.list[index].is_liking
        this.$toast.success(
          this.list[index].is_liking ? '点赞成功' : '取消点赞'
        )
      } catch (e) {
        this.$toast.fail('请刷新重试')
      }
    },
    async AttitudeFn1(like) {
      try {
        if (like) {
          await getCommentOnLink(this.replys.com_id)
          this.replys.like_count--
        } else {
          await getCommentLick(this.replys.com_id)
          tthis.replys.like_count++
        }
        this.replys.is_liking = !this.replys.is_liking
        this.$toast.success(
          this.replys.is_liking ? '点赞成功' : '取消点赞'
        )
      } catch (e) {
        this.$toast.fail('请刷新重试')
      }
    },
    Time(val) {
      return timeAgo(val)
    },
    OnReply(item) {
      console.log(item)
      this.replys = item
      this.replyshow = true
    },
    async SendComment1(val) {
      try {
        const { data } = await getSendComment({
          target: val,
          content: this.message,
          art_id: this.details.art_id
        })
        this.commentsd.unshift(data.data.new_obj)
        this.$toast.success('发布评论成功')
        this.replys.reply_count++
      } catch (e) {
        this.$toast.fail('请刷新重试')
      }
      this.message=''
    }
  },
  computed: {
    ...mapState(['details'])
  }
}
</script>

<style lang="less" scoped>
/deep/.van-card {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
  .van-card__header {
    width: 100%;
  }
  .van-card__thumb {
    width: 0.96rem;
    height: 0.96rem;
    margin-right: 0.33333rem;
    overflow: hidden;
    border-radius: 50%;
  }
  .title-warp {
    color: rgb(38, 102, 222);
    font-size: 30px;
  }
}
/deep/.icon-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
}
/deep/.van-card__desc {
  margin-top: 0.3rem;
  font-size: 35px;
}
/deep/.van-tag {
  background-color: unset;
  color: #323233;
  margin-top: 0.3rem;
  font-size: 26px;
  margin-right: 0.5rem;
  padding: 0;
}
/deep/.link {
  color: #ffff00;
}
/deep/.replysp {
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
}
.replyfooter {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  margin-top: 300px;
  /deep/.van-button--default {
    width: 100%;

    color: #323233;
    background-color: #fff;
    border: 0.02667rem solid #ebedf0;
  }
  .wrapper {
    height: 100%;
  }
  /deep/.van-field {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 80%;
    z-index: 99;
    border: unset;
  }
  /deep/.right-btn {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 2rem;
    padding: 0;
    background-color: #fff;
    height: 176px;

    button {
      border: unset;
      color: #6ba3d8;
      cursor: not-allowed;
      opacity: 0.5;
      font-size: 35px;
      margin-top: 60px;
      margin-left: 30px;
    }
  }
}
</style>
