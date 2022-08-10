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
//获取用户个人信息

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })

}
// 编辑用户照片资料（头像、身份证照片）
//如果传的是对象,axios默认会将对象转成JSON并且加上Content-Type=application/json
//如果传的是fromData表单，那么axios会将表单提交给后端，并且默认的加上Content-Type=multipart/form-data
//如果后端要的是from表单
//const fm = new FormData() 使用FormData，new出来一个实例
//fm.append('表单的name'，表单项)

export const uploadAvator = (file) => {
  const fm =new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method:'PATCH',
    data: fm
  })
 }

export const getUserMessage = () => {
  return request({
    url: '/v1_0/user',

  })
 }

export const getUserinfoData = (data) => { 
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })

}
