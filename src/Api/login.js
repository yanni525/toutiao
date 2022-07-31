import request from '@/utils/request'
// axios做了封装, post请求 自动加Content-Type application/json

// params 查询参数传参: 'baseUrl+/v1_0/authorizations?name=张三'

// data请求体传参: 请求体当中携带

export const createUserApi = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
// 发送验证码，携带参数的传参方法
export const getCodeApi = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
