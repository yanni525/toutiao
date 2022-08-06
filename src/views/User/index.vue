<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 用户信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="UserInfo.photo" />
      <!--input file 文件选择框 hidden 选择框隐藏-->
      <!-- accept:显示file选择文件后缀名.例：".png,.jfif" -->
      <!-- 用户文件选择表单 -->
      <input
        type="file"
        hidden
        accept=".png,.jpg"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <van-popup
      v-model="isShowAvator"
      closeable
      :style="{ width: '100%', height: '100%' }"
    >
      <UpdateAvator 
      @update-avator="UserInfo.photo = $event" 
      :photo="photo" 
      v-if="isShowAvator">
      </UpdateAvator>
    </van-popup>
    <van-cell title="昵称" :value="UserInfo.name" is-link />
    <van-cell title="性别" :value="UserInfo.gender===1 ?'女':'男'" is-link />
    <van-cell title="生日" :value="UserInfo.birthday" is-link />
  </div>
</template>

<script>
import { getUserInfo } from '@/Api'
import UpdateAvator from '@/views/User/components/UpdateAvator.vue'
import {resolveToBase64} from "@/utils"
export default {
  name: 'User',
  components: { UpdateAvator },
  data() {
    return {
      UserInfo: {},
      isShowAvator: false,
      photo:'',
      isShow:true
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.UserInfo = data.data
        console.log(this.UserInfo)
        console.log(data)
      } catch (e) {
        console.log('请刷新')
      }
    },
    //用户选择了图片后
    async selectPhoto(e) {
      //展示弹出层
      //e.target 触发事件元素
      //file.files 伪数组 存储的用户选择所有的文件对象
      //用户如何选择图片后显示图片?
      //第一种方法
      // const file = e.target.files[0]
      //window.URL.createObjectURL(file对象)把file文件对象处理成img标签可识别的url
      // const url=  window.URL.createObjectURL(file)
      // console.dir(url);
      //传递子组件
      // this.photo = url
      //清空value 让用户可以选择同一张图片
        // e.target.value=''
      //缺点：内存泄漏 因为跟document绑定在一起，优点写法简单
        //第二种写法
      //   const fr = new FileReader()
      //   fr.readAsDataURL(file)
      //   fr.onload=(e)=>{
      //     this.photo = e.target.result
      //   e.target.value=''
      //    this.isShowAvator = true
      //   }
      //转Base64 -->FileReader(读文件对象)
      //优点：不会内存泄漏 
      // this.isShowAvator = true
      //封装后的写法
      const file = e.target.files[0]
      const url = await resolveToBase64(file)
      this.photo = url
      //清空value 让用户可以选择同一张图片
      e.target.value = ''
      //展示弹出层
      this.isShowAvator = true


    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-popup {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background-color: #000;

}
/deep/.navbar {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
