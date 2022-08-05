<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="from">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="mobile"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        type="code"
        name="验证码"
        placeholder="请输入验证码"
        v-model="code"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="send-btn"
            round
            size="mini"
            type="default"
            v-if="isShow"
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            @finish="isShow = true"
            v-else
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button class="login-btn" block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 为什么点击发送验证码，触发了submit事件
// from表单当中，如果任意的buttom,都会触发，可以通过修改native-type="button"的值为buttom,而不是sumbit来控制
import { mobileRules, codeRules } from './rules'
import { createUserApi, getCodeApi } from '@/Api'
export default {
  name: 'LoginPage',
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShow: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidCiick: true
      })
    },
    async onSubmit() {
      // 如果表单校验不通过, 这个方法不会触发

      // q1: res是什么?
      //  - axios封装的对象, 她把服务端返回的数据放在res.data里

      // q2: res是什么?
      //  - Promise的resolve的值

      // q3: error是什么?
      //  - Promise reject的结果
      //  - axios封装的error
      //  - error.response.data是服务端返回的数据
      //  - error.response.status 是服务端返回的状态码
      // 结构赋值
      //  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
      //  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
      //  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
      //  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}
      this.loading()
      try {
        const {
          data: { data: token }
        } = await createUserApi(this.mobile, this.code)
        this.$store.commit('SET_TOKEN', token)
        // 跳转到profile
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        const status = error.response.status
        let message = '请重新登陆'

        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.from.validate('mobile').then(async () => {
        this.loading()
        try {
          // 发送请求
          await getCodeApi(this.mobile)
          this.isShow = false
        } catch (error) {
          console.log(error)
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
// 穿透样式

// :deep(穿透的类名)

.van-nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.form) {
  .van-cell__title {
    flex: 1;
  }

  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }

  //&代表父亲的类名
  :deep(.send-btn) {
    &.van-button--mini {
      padding: 0.2rem;
    }
    &.van-button--default {
      background-color: #eeee;
      font-size: 22px;
      color: red;
    }
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
