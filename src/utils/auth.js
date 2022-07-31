// 封装Token
import Storage from './storage'
// key的名字进行简写
const TOKEN = "'HEIMA_TOUTIAO_TOKEN'"

export const setToken = (value) => Storage.set(TOKEN, value)

export const getToken = () => Storage.get(TOKEN)

export const removeToken = () => Storage.remove(TOKEN)
