<template>
  <!-- 每一篇文章 -->
  <!-- 没有图片 -->
  <van-cell
    v-if="articinfo.cover.type === 0"
    :title="articinfo.title"
    :label="label"
  >
  </van-cell>
  <!-- 一张图片 -->
  <van-cell
    v-else-if="articinfo.cover.type === 1"
    :title="articinfo.title"
    :label="label"
  >
  <div class="onepag">
    <van-image width="50" height="50" :src="articinfo.cover.images[0]" />
  </div>
  </van-cell>
  <!-- 3张图片 -->
  <van-cell v-else :title="articinfo.title" :label="label">
    <div class="threepag">
    <van-image
      v-for="(item, index) in articinfo.cover.images"
      :key="index"
      width="50"
      height="50"
      :src="item"
    />
    </div>

  </van-cell>
</template>

<script>
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
      return `${atr.aut_name} ${atr.comm_count}评论 ${atr.pubdate}`
    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
:deep(.van-cell){
  position: relative;
  display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: .26667rem .42667rem;
    overflow: hidden;
    color: #323233;
    font-size: .37333rem;
    line-height: .64rem;
    background-color: #fff;

    .van-cell__value{
    position: relative;
    overflow: hidden;
    color: #969799;
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
    }
}
</style>
