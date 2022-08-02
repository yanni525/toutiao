 <template>
  <div>
    <van-pull-refresh 
    v-model="refreshLoading"
     @refresh="loadNextPageArticle"
     success-text="刷新文章成功">
    <van-list 
     offset="0" 
     :immediate-check="false"
     v-model="loading"
     :finished="isFinished" 
     finished-text="没有更多文章了~"
    @load="loadNextPageArticle"

     >
    <Articleltem 
    v-for="item in articles" 
    :key="item.art_id"
    :articinfo="item">
    </Articleltem>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlrApi } from '@/Api'
import Articleltem from "@/components/Articleltem.vue"
export default {
  name: 'ArticlelistS',
  components:{Articleltem},
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data (){
    return {
       articles:[],
       pre_timestamp:'',
       loading:false,
      isFinished:false,
      e:false,
      refreshLoading:false
    }
  },
  created() { 
    this.getArticlrApiList()
  },
  methods: {
    async getArticlrApiList (){
      try {
        const {data} = await getArticlrApi(this.id, +new Date());
        this.pre_timestamp = data.data.pre_timestamp
        this.articles =data.data.results
        console.log(this.articles);
      } catch (error) { 
        this.$toast.fail('请刷新重新获取文章.')
      }
    },
   async loadNextPageArticle(){
       //加载下一个页面
       try{
    //发请求
    const {data} = await getArticlrApi(this.id, this.pre_timestamp);
    //加载完场后
    const timestamp =data.data.pre_timestamp
    //判断是否加载完成
    if(timestamp === null){
      this.isFinished = true;
    }

   //存数据
   if (this.refreshLoading){
     this.articles.unshift(...data.data.results);

   } else{
     this.articles.push(...data.data.results);
   }
     //更新时间
     this.pre_timestamp = timestamp
     
     this.loading = false;
     console.log(data);
    } catch(e) {
      this.e = true 
    } finally{
      this.loading = false;
      this.refreshLoading = false
    }

  } 
    }

}
</script>

<style></style>
