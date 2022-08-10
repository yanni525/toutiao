<template>
  <div>
    <van-cell 
  title="搜索历史">
  <template #default>
    <van-icon name="delete-o" color="#969799" v-if='isShow' @click="clickFn"/>
    <div v-else>
      <span @click="HistList=[]">全部删除</span> <span @click="changeAll">完成</span>
    </div>
  </template>
</van-cell >
    <van-cell 
    v-for="(item,index) in HistList"
    :key="index"
    :title="item"
    @click="changeItem(index)">
    <template #default>
    <van-icon name="close" v-if="isdelShow"/>
  </template>
    </van-cell>

  
  </div>
</template>

<script>
export default {
  data(){
    return {
      isShow:true,
      isdelShow:false,
      HistList: this.$store.state.history
    }
  },
  methods:{
    //删除按钮
    clickFn(){
      this.isShow = false;
      this.isdelShow = true;

    } ,   
    changeAll(){
      this.isShow = true;
      this.isdelShow = false;
    },
   changeItem(index){
    //删除状态
      if (this.isdelShow){
    const int = this.HistList.splice(index, 1);
      this.$store.commit('DEL_HISTOY', int)
      }else{
        //点击渲染页面
        const items = this.HistList[index]
        this.$parent.keywords = items 

      }
    }
  }

//   methods:{

//    const index = this.HistList.indexOf(val)
//     if(index !== -1){
//   this.HistList.split(index,1)  
//   }
// }
}
</script>

<style lang="less" scoped>
// /deep/.van-cell__value{
//   span{
//     &.nth-child(1) {
//     margin-right: 10px;
//   }
//   }

// }
</style>

