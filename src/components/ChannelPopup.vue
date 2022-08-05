<template>
  <div class="channel"> 
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '编辑' : '完成' }}</van-button
      >
    </van-cell>

    <van-grid gutter="0.30666rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        icon="cross"
        :class="['my-channel',{active:item.name==='推荐'}]"
        @click="changeActive(index,item)"
      >
        <template #icon> <van-icon name="cross" v-show="!isEdit && item.name !=='推荐'"  /> </template>
      </van-grid-item>
    </van-grid>
     <van-cell title="推荐频道">  </van-cell>

    <van-grid gutter="0.30666rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommon"
        @click="$emit('add-channel',item)"
      />
    </van-grid>
   
  </div>
</template>
<script>
import {getAllChannels as getAllChannelsApi} from "@/Api"
export default {
  name: '',
  data() {
    return {
      isEdit: true,
      allChannels:[],
      active:0
    }
  },
  props: {
    myChannels:{
      type: Array,
      required: true,
    }
  },

  // computed: {
  //   recommendChannels() {
  //     const newArr = this.allChannels.filter((aItem)=>{
  //       const resulte = !!this.myChannels.find((myItem)=>aItem.id ===myItem.id)
  //       if(resulte){
  //         return false
  //       }else{
  //         return true 
  //       }
  //     })
  //     return newArr
  // },
  //简写


  created() {
    this.getAllChannels ()
  },
  mounted() {},
  watch: {},
  methods: {
    async getAllChannels (){
      try{
        const {data}= await getAllChannelsApi()
        this.allChannels = data.data.channels
        // console.log(this.allChannels)
      }catch(e) {
      console.log(e);
    } 
    },
    changeActive(index,item){
      if(!this.isEdit){
        if(item.name==='推荐') return
        //删除推荐
        this.$emit('del-channel',item.id)
      }else{
        // this.$parent.$parent.show=false
        this.$emit('close')
        this.$emit('change-active',index)
      }
    }
  },
    computed:{
    recommendChannels() {
      return this.allChannels.filter(
        (aItem)=> !this.myChannels.find((myItem)=>aItem.id === myItem.id)

      )
    }
  },
}
</script>
<style scoped lang="less">
.active{
  :deep(.van-grid-item__text) {
    color: red;
  }
  
}
.channel {
 padding-top: 1.33333rem;
 .edit-btn {
  width: 104px;
  height: 48px;
  background-color: #fff;
  &.van-button--default {
  font-size: 12px;
  border-color: red;
  color: red;
  }
 }
 /deep/ .van-grid-item {
  .van-grid-item__content {
   background-color: #f4f5f6;
  }
 }
 .recommon {
 /deep/ .van-grid-item__content {
 flex-direction: row;
 .van-grid-item__icon {
 font-size: 35px;
 }
 }
 }
 /deep/.my-channel {
 .van-grid-item__icon-wrapper {
 position: unset;
 }
 .van-icon-cross {
 position: absolute;
 right: 0;
 top: 0;
 transform: translate(40%, -40%);
 font-size: 25px;
 border: 2px solid #000;
 border-radius: 50%;
 }
 }
 /deep/.van-grid-item__text {
 margin-top: unset;
 }
}
</style>
