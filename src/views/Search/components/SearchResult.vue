<template>
  <div>
    <!-- <van-pull-refresh
      v-model="isLoading"
      @refresh="onLoad"
      success-text="刷新成功"
    > -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in searchList"
          :key="item.id"
          :value="item.title"
        />
      </van-list>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import { getSearchApi } from '@/Api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchList: [],
      page: 1,
      per_page: 20,
      loading: false,
      isLoading: false,
      finished: false,
      isLoading: false
    }
  },
  created() {
    this.getSearchlist()
  },
  methods: {
    async getSearchlist() {
      try {
        const { data } = await getSearchApi({
          q: this.keywords,
          page: 1,
          per_page: this.per_page
        })
        console.log(data);
        this.searchList = data.data.results
        this.loading = false
        if(this.searchList === null) {
          this.finished = true
        }
      
      } catch (e) {
        this.$toast.fail('获取文章失败')
      }
    },
    async onLoad() {
      try {
        const { data } = await getSearchApi({
          q: this.keywords,
          page: this.page,
          per_page: this.per_page
        })
        if (data.data.results < 20) {
          this.finished = true
        }
        // if (this.Searchlist.length) {
        //   this.Searchlist.unshift(...data.data.results)
        //   this.page++
        // } 
          this.searchList.push(...data.data.results)
          this.page++
          this.loading = false
      } catch (e) {
        this.$toast.fail('获取文章失败')
      }
    }

    // 数据全部加载完成
    //   if (this.list.length >= 40) {
    //     this.finished = true;
    //   }
    // }, 1000)
  }
}
</script>

<style></style>
