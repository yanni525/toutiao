<template>
  <div>
    <!-- 头部 -->
    <h1 class="details-title">{{ detailsList.title }}</h1>
    <div class="user-info">
      <div class="avatar">
        <img :src="detailsList.aut_photo" />
      </div>
      <div class="van-cell__title">
        <p>{{ detailsList.aut_name }}</p>
        <p>{{ detailsList.pubdate }}</p>
      </div>
      <div class="user-right">
        <van-button round type="info" 
        :loading="loading"
        @click="FollowFn"
        >{{detailsList.is_followed?'已关注':'+ 关注'}} </van-button>
      </div>
    </div>
    <!-- 中间 -->

    <div
      class="markdown-body"
      v-html="detailsList.content"
      ref="Article-content"
    ></div>
    <!-- 正文结束 -->
    <van-divider dashed>正文结束</van-divider>
    <!-- 评论列表:doneComment="doneComment" -->
    <ArtComment ></ArtComment>
    <!-- 底部 -->
    <div class="footer">
      <van-tabbar>
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
              <button @click="SendComment(detailsList.art_id)">发送</button>
            </div>
          </div>
        </van-overlay>
        <van-tabbar-item :badge="detailsList.comm_count">
          <template #icon>
            <van-icon name="comment-o" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item 
        :icon="detailsList.is_collected ?'star':'star-o'" 
        :class="{
          linking:detailsList.is_collected
          }"
        :loading="loading"
        @click="onCollet"
        ></van-tabbar-item>
        <van-tabbar-item 
        :icon="detailsList.attitude ===1 ?'good-job':'good-job-o'"
        :class="{
          attitude:detailsList.attitude === 1
          }"
          @click="AttitudeFn"></van-tabbar-item>
        <van-tabbar-item icon="share"></van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- 回复评论 -->
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
              <button @click="SendComment(detailsList.art_id)">发送</button>
            </div>
          </div>
        </van-overlay>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import 'github-markdown-css/github-markdown.css'
import { mapState } from 'vuex'
import { geiDetails,getCollect ,getOffCollet ,getFollow,getOffFollow,getLink,getOnLink,getSendComment} from '@/Api'
import ArtComment from './ArtComment.vue'

export default {
  name: 'Article',
  components: { ArtComment },
  data() {
    return {
      loading: false,
      isFinished: false,
      collect: false,
      message: '',
      show: false,
      detailsList: {},
      doneComment:[]
    }
  },
  created() {
    this.getDetails()
  },
  methods: {
    async getDetails() {
      try {
        const { data } = await geiDetails(this.details.art_id)
        this.detailsList = data.data
        console.log(this.detailsList)
        //初始化图片节点
        this.PreviewImg()
      } catch (e) {
        console.log(e)
      }
    },
    PreviewImg() {
      const ArtComments = this.$refs['Article-content']
      const imgs = ArtComments.querySelectorAll('img')
      const imgList = []
      imgs.forEach((img, index) => {
        imgList.push(img.src)
        img.onclick = () => {
          ImagePreview({
            imgList ,
            startPosition: index
          })
        }
      })
    },
   async onCollet(){
      try{
        if(this.detailsList.is_collected){
          await getOffCollet(this.details.art_id)
        }else{
          await getCollect(this.details.art_id)
        }
        //更新视图
        this.detailsList.is_collected = !this.detailsList.is_collected
        this.$toast.success(this.detailsList.is_collected ?'收藏成功':'取消收藏')
      } catch (e) {
        this.$toast.fail('重新加载，请稍后')
      }
    },
    async FollowFn(){
      try{
        if(this.detailsList.is_followed===true){
          await getOffFollow(this.details.art_id)
        } else{
          await getFollow(this.details.art_id)
        }
        this.detailsList.is_followed = !this.detailsList.is_followed
        this.$toast.success(this.detailsList.is_followed ?'关注成功':'取消关注')
      }catch (e) {
        this.$toast.fail('请刷新重新操作')
      }
    },
    async AttitudeFn(){
      try{
        let state = -1
        if(this.detailsList.attitude === 1){
          await getOnLink(this.details.art_id)
        }else{
          await getLink(this.details.art_id)
          state = 1
        }
        this.detailsList.attitude = state
      } catch (e) {
        this.$toast.fail('请刷新重试')
      }
    },
    async SendComment(val){
      try{
        const {data} =await getSendComment({
          target:val,
          content:this.message,
          art_id:null
        })
        this.doneComment= data.data
        console.log(this.doneComment);
        this.$toast.success('发布评论成功')
      } catch (e) {
        this.$toast.fail('请刷新重试')
      }
    }

  },
  computed: {
    ...mapState(['details']),
    ...mapState(['replys'])
  }
}

</script>

<style lang="less" scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 0.73333rem 0.42667rem;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 0.73333rem 0.42667rem;
  }
}
/deep/.details-title {
  font-size: 0.53333rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}
.user-info {
  display: flex;
  width: 100%;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  margin-right: 0.22667rem;
  background-color: #fff;
  .avatar {
    width: 0.93333rem;
    height: 0.93333rem;
    margin-top: 0.15rem;
    margin-left: 0.72667rem;
    margin-right: 0.42667rem;
    /deep/img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .van-cell__title {
    width: 20%;
    line-height: 0.64rem;
    p {
      font-size: 0.32rem;
      color: #3a3a3a;
      padding: unset;
      margin: unset;
    }
  }
  .user-right {
    margin-top: 0.15rem;
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
    margin-right: 0.32667rem;

    .van-button {
      width: 2.26667rem;
      height: 0.77333rem;
    }
  }
}
/deep/.van-divider {
  font-size: 0.4rem;
  margin: unset;
}
.footer {
  bottom: 0;
  margin-top: 100px;
  /deep/.van-button--normal {
    padding: 0 0.4rem;
    font-size: 0.37333rem;
    width: 4rem;
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
/deep/.van-tabbar-item--active {
  color: unset;
}
/deep/.linking{
  color:#3296fa;
}
/deep/.attitude{
  color:#3296fa;
  
}
</style>
