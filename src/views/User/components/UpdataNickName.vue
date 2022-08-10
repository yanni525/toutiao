<template>
  <div>
    <van-nav-bar title="更改昵称">
    <template #left>
        <span @click="$parent.$parent.isShowNickName=false">取消</span>
    </template>
    <template #right>
        <span @click="changeName">确定</span>
    </template>
    </van-nav-bar>
    <van-field
  v-model="message"
  rows="2"
  autosize
  type="textarea"
  maxlength="11"
  show-word-limit
/>
  </div>
</template>

<script>
export default {
    data(){
        return {
            message: this.name
        }
    },
    props:{
        name:{
            type:String,
            required: true
        }
    },
    methods:{
     changeName(){
        this.$emit('updata-name',this.message)
      this.$parent.$parent.isShowNickName = false
     }    
     }

}
</script>

<style  scoped lang="less">
/deep/.van-nav-bar__right{
    color: #1989fa;
}
 /deep/.van-nav-bar__left{
    color: #1989fa;

 }

</style>