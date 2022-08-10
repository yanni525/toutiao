<template>
  <div>
<van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
@confirm="onConfirm"
  @cancel="$parent.$parent.isShowBirthday=false"
/>
  </div>
</template>

<script>
import  dayjs from "dayjs"
export default {
    props:{
        birthday :{
            type: String,
            required: true,
        }
    },
    data(){
        return{
        minDate: new Date(1985,0,1),
        maxDate: new Date(),
        currentDate: new Date(this.birthday)
        }
    },
    methods:{
    
        onConfirm() {
            const currentDate = dayjs(this.currentDate ).format('YYYY-MM-DD')
            this.$emit('update-birthday',currentDate)
            this.$parent.$parent.isShowBirthday=false
        }
    }
}
</script>

<style>

</style>