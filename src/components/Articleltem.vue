<template>
  <!-- 每一篇文章 -->
  <!-- 没有图片 -->
  <van-cell
    v-if="articinfo.cover.type === 0"
    :title="articinfo.title"
    :label="label"
   @click="detalisFn(articinfo)"
  >

  </van-cell>
  <!-- 一张图片 -->
  <van-cell
    v-else-if="articinfo.cover.type === 1"
    :title="articinfo.title"
    :label="label"
   @click="detalisFn(articinfo)"

  >
    <div class="right-img">
      <van-image :src="articinfo.cover.images[0]" />
    </div>
  </van-cell>
  <!-- 3张图片 -->
  <van-cell class="threepag" v-else :title="articinfo.title" :label="label">
    <div class="imgbox">
      <van-image
        v-for="(item, index) in articinfo.cover.images"
        :key="index"
        :src="item"
      @click="detalisFn(articinfo)"

      />
    </div>
  </van-cell>
</template>

<script>
import { timeAgo } from '@/Api'
export default {
  name: 'Articleltem',
  props: {
    articinfo: {
      type: Object,
      default: () => ({}) //对象和数组的默认值，比如用函数返回
    }
  },
  computed: {
    label() {
      const atr = this.articinfo
      return `${atr.aut_name} ${atr.comm_count}评论 ${timeAgo(atr.pubdate)}`
    }
  },
  methods: {
     detalisFn(val){
      console.log(val);
        this.$router.push('/detalis')
        this.$store.commit('SET_DETAILS',val)
    },

    }
  
}
</script>

<style lang="less" scoped>
.van-cell {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
}
.van-cell__value {
  position: relative;
  overflow: hidden;
  color: #969799;
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word;
}
.van-cell__value .right-img {
  margin-left: 500px;
  width: 300px;
  height: 150px;
}
.van-cell__label {
  margin-top: 20px;
  font-size: 18px;
  display: flex;
}
.threepag {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.424rem;
  background-color: #fff;
}
.threepag .imgbox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 130px;
}
.threepag .imgbox .van-image {
  display: inline-block;
  width: 300px;
  height: 180px;
}
.threepag .imgbox :nth-child(2) {
  margin: 0 50px;
}
// .van-cell__label{
//      margin-top: .10667rem;
//     color: #969799;
//     font-size: .32rem;
//     line-height: .48rem;
// }

//   .van-cell__title{
//         -webkit-box-flex: 1;
//         flex: 1;
//   }
//   .van-cell__title .van-cell__label{
//   margin-top: .10667rem;
//   color: #969799;
//   font-size: .32rem;
//   line-height: .48rem;
//   }
// .van-cell__label .image-box {
//   display: flex;
//   justify-content: space-between;

// }
// // .van-cell__label .image-box .van-image{
// //       width: 100px;
// //     height: 100px;
// // }
// }
</style>
