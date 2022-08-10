<template>
  <div>
<van-picker
  title="更新性别"
  show-toolbar
  :columns="columns"
  @confirm="onConfirm"
  @cancel="$parent.$parent.isShowGender=false"
/>
  </div>
</template>

<script>

export default {
    data(){
        return {
            columns: ['男','女'],
        }
    },
    methods:{
    onConfirm(value, index) {
    this.$toast(`当前值：${value}, 当前索引：${index}`);
    this.$emit('update-genter',index)
    this.$parent.$parent.isShowGender=false
    }
}
}
</script>

<style  scoped lang="less">
/deep/.van-picker__confirm{
    color: #1989fa;
}
 /deep/.van-picker__cancel{
    color: #1989fa;

 }

</style>