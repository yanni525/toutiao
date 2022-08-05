<template>
  <div>
    <!-- 搜索框 -->
    <!--from的作用：在iOS系统下可以显示搜索按钮  -->
<form action="/">
<van-search
  v-model.trim="keywords"
  show-action
  class="search"
  background="#3296fa"
  placeholder="请输入搜索关键词"
  @search="onSearch"
  @focus="onSearchSearch"
/>
</form>
    <!-- 搜索建议 -->
    <!-- <SearchResult/>
    <SearchSuggestion/>
    <SearchHistory/> -->

    <!-- 只显示/搜索结果/历史/建议 -->
    <!-- is指定动态组件的名字，在component标签上定义的属性，他的联动里都可以用 :keywords-->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion'
import SearchHistory from './components/SearchHistory'
export default {
    name:"Search",
    components:{SearchResult,SearchSuggestion,SearchHistory },
    data(){
        return{
            keywords:'',
            SearchResult:false,
        }
    },
    methods:{
        onSearchSearch(){
            //如果keywords为'',显示搜索历史
            //如果keywords有值，显示搜索建议
            this.SearchResult=false
        },
        onSearch(){
            console.log('正在搜索');
            //用户搜索了显示搜索结果
            this.SearchResult = true;
        },
        // keywords(value){
        //     this.keywords = value;
        // }
    },
    computed:{
        componentName(){
            //如果输入的是空字符串那么渲染搜索历史
            if (this.keywords ===''){
                return 'SearchHistory';
            }

             if (this.SearchResult){
                //渲染搜索结果
                return 'SearchResult';
            }
                //既不显示搜索历史，也不显示搜索结果
                return 'SearchSuggestion';
            }
        }
    }

</script>

<style lang="less" scoped>
//搜索框样式
//属性选择器
.search{
    [role='button']{
    color: #fff;

    }
    
}
</style>