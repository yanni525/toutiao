<template>
  <div>
    <van-card
    v-for="(item, index) in list"  
    :key="item.com_id"
  :desc="item.content"
  :thumb="item.aut_photo"
>

    <template #title >
      <div class="title-warp">{{item.aut_name}}</div>
   
   <div class="icon-right" >
    <van-icon 
    :name="item.is_liking ?'good-job':'good-job-o'"
    :class="{
      link:item.is_liking 
      }"  
      @click="AttitudeFn(item.is_liking, index)"
    /><span>{{item.like_count}}</span>
    </div>
</template>
 
  <template #tags>
    <van-tag >{{Time(item.pubdate)}}</van-tag>
    <van-tag @click="OnReply(item)">回复{{item.reply_count}}</van-tag>
  </template>

</van-card>
  </div>
</template>

<script>
import {getCommentLick, getCommentOnLink} from '@/Api'
import { timeAgo } from "@/utils/day"
export default {
    props:{
      list:{
        type:Array,
        required:true,
      },

    },
    methods:{
    async AttitudeFn(like, index){
      try{
        if(like){
          await getCommentOnLink(this.list[index].com_id)
        }else{
          await getCommentLick(this.list[index].com_id)
        }
        this.list[index].is_liking = !this.list[index].is_liking
        this.$toast.success(this.list[index].is_liking ? '点赞成功':'取消点赞')
      } catch(e){
        this.$toast.fail('请刷新重试')
      }
    },
    Time(val){
     return timeAgo(val)
    },
    OnReply(item){
      this.$store.state.replys('SET_REPLY',item)
    }

}
}
</script>

<style lang="less" scoped>
/deep/.van-card{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: .26667rem .42667rem;
    overflow: hidden;
    color: #323233;
    font-size: .37333rem;
    line-height: .64rem;
    background-color: #fff;
    .van-card__header{
        width: 100%;
    }
    .van-card__thumb{
    width: .96rem;
    height: .96rem;
    margin-right: .33333rem;
    overflow: hidden;
    border-radius: 50%;
   
    }
    .title-warp{
      color: rgb(38, 102, 222);
      font-size: 30px;
    }
}
 /deep/.icon-right{
   position: absolute;
   top: 0;
   right: 0;
   width: 1rem;
   height: 1rem;
 }
/deep/.van-card__desc{
 margin-top: .3rem;
 font-size: 35px;
}
/deep/.van-tag{
  background-color:unset;
  color: #323233;
  margin-top: .3rem;
  font-size: 26px;
  margin-right: .5rem;
  padding: 0;
}
/deep/.link{
  color:#ffff00;
  
}
</style>