<template>
  <div>
    <!-- 头部区域e -->
    <header>
      <div class="login" v-if="islogin">
          <div class="login-box">
            <div class="user-info" >
              <div class="userinfo-box">
              <div class="user-left" >
                <img :src="UserList.photo">
              </div>
                <p>{{UserList.name}}</p>
              </div>
            
              <van-button @click="$router.push('/user')">编辑资料</van-button>
            </div>
          <div class="user-data">
          <div>头条{{UserList.art_count}}</div>
          <div>粉丝{{UserList.fans_count}}</div>
          <div>关注{{UserList.follow_count}}</div>
          <div >获赞{{UserList.like_count}}</div>
          </div>
          </div>
      </div>
      <div class="loginout" v-else>
        <div class="no-login">
          <div class="nologin-img">
            <img src="@/assets/images/mobile.png">
          </div>
          <div class="log" @click="$router.push('/login')">
            <span>登录/注册</span>
          </div>
        </div>
      </div>

    </header>

   <!-- 中间 -->
    <div class="logincenter">
      <div class="center-box">
        <van-grid>
        <van-grid-item icon="star-o" text="收藏" />
        </van-grid>
      </div>
      <div class="center-box">
        <van-grid>
        <van-grid-item icon="clock-o" text="历史" />
        </van-grid>
      </div>
    </div>
   <van-cell title="消息通知" is-link />
   <van-cell title="小智同学" is-link />
    <!-- 底部 -->
    
    <van-button v-if="islogin" block @click="outFn">退出</van-button>
  </div>
</template>

<script>
import {getUserMessage} from "@/Api"
export default {
  data(){
    return {
      UserList:{}
    }
  },
  computed:{
    islogin(){
      return !!this.$store.state.tokenobj.token;
    }
  
  },
  created(){
      this.getUserList()
  },
  methods:{
  outFn(){
  this.$dialog.confirm({
  title: '黑马头条',
  message: '是否确认退出该账号？',
})
  .then(() => {
    this.$store.commit('SET_TOKEN', {});

  })
  .catch(() => {
    
  });
    },
    async getUserList(){
      try{
        const {data} = await getUserMessage();
        console.log(data);
        this.UserList = data.data
        console.log(this.UserList);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

</script>

<style lang="less" scoped>
body{
  background-color: #ccc;
}
.login-box{
  position: fixed;
top: 0;
  width: 10rem;
    height: 5.34667rem;
    background-image: url(@/assets/images/banner.png);
    background-size: 100% 100%;
    .user-info{
    width: 100%;
    height: 1.76rem;
    margin-top: 1.54667rem;
    padding: 0 .42667rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    .userinfo-box{
      width: 5rem;
      height: 1.76rem;
      display: flex;
      align-items: center;
      text-align: center;

      p{
        padding-left: 20px;
      font-size: 35px;
      color: #fff;
      width: 3rem;
      height: .6rem;
      margin: unset;
      }
    .user-left{
    width: 1.76rem;
    height: 1.76rem;
    border-radius: 50%;
    overflow: hidden;
    border: .01333rem solid #fff; 
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
    }
    }
    .van-button{
    width: 1.53333rem;
    height: .42667rem;
    background: #fff;
    border-radius: .21333rem;
    font-size: .26667rem;
    color: #666;
    padding: 0;
    font-size:14px;

    }
    .user-data{
    width: 100%;
    height: 2.08rem;
    display: flex;
    justify-content:space-around;
    align-items: center;
    font-size:14px;
    color:#fff;
    }
}
.loginout{
  position: fixed;
    top: 0;
  width: 10rem;
    height: 5.34667rem;
    background-image: url(@/assets/images/banner.png);
    background-size: 100% 100%;
}
.no-login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .nologin-img{
      margin-top:1.3rem;;
    width: 1.76rem;
    height: 1.76rem;
    border-radius: 50%;
    background-color: #fff;
    img{
      display: block;
      width: 100%;
    }
    }
    .log span{
   font-size: .37333rem;
    color: #fff;
    margin-top: .13333rem;
    }

}
:deep(.logincenter){
  display: flex;
  width: 100%;
  height: 2.08rem;
  margin-top: 5.34667rem;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .center-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width:50%;
    height: 2.08rem;
    vertical-align:bottom
  }
}
/deep/.van-grid-item__content {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding: unset;
.van-grid-item__icon {
    font-size: 0.74667rem;
    color: red;
}
}
/deep/.van-button--default{
  margin-top: 20px;
  color: red;
}
</style>
