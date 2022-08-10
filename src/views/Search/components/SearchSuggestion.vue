<template>
  <div>
  <van-cell
  v-for="(item, index) in highlightSuggetionslist"
  :key="index"
    icon="search" 
    @click="changekeyword(index)"
    >
    <template #title>
        <span v-html="item"></span>
    </template>
    </van-cell>
  </div>
</template>

<script>
import {getSearchSuggetionsApi} from '@/Api'
import {debounce} from 'lodash'
// 1.动态正则
// 2.字面量//
export default {
    data() {
        return {
            Suggetionslist:[]
        }
    },
    computed:{
        highlightSuggetionslist(){
            //map:映射 返回一个新数组，新数组的长度和原数组一样
            const reg = new RegExp(this.keywords,'ig')
            //'ig'忽略大小写，并且全局匹配
            return this.Suggetionslist.map((item)=>
                item.replace(reg,(math)=>`<span style="color:red">${math}</span>`)
            )
        }
    },
    props:{
        keywords:{
            type: String,    
            required: true,
        }
    },
    methods: {
        //获取搜索建议
        //防抖
        //延迟执行
        //干掉上一次的定时器
        // clearTimeout(this.id)
         getSearchSuggetionslist:debounce(async function(){
             try{
           const {data}= await getSearchSuggetionsApi(this.keywords);
                // this.Suggetionslist = data.data.options.filter((str)=>{
                //     if(str===null){
                //         return false;
                //     }
                //     return true;
                // })
                //简写
                // this.Suggetionslist = data.data.options.filter((str)=> str !== null)
                //再简写
                // this.Suggetionslist = data.data.options.filter((str)=>Boolean(str))
                //极简
                this.Suggetionslist = data.data.options.filter(Boolean)
                console.log(this.Suggetionslist);

            } catch(e){
                this.$toast.fail('搜索建议失败')
            }
         },1000),
       
        changekeyword(index){  
        const items = this.Suggetionslist[index]
        this.$parent.keywords = items
        this.$parent.SearchResult = true;
        },

    },
    watch:{ 
         keywords:{
            immediate: true,//当 keywords发生变化，立马可以监听到
            handler(){
             this.getSearchSuggetionslist()
         }
    }
}
}
</script>

<style>

</style>