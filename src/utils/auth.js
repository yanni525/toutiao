// 封装Token
import Storage from './storage'
// key的名字进行简写
const TOKEN = "'HEIMA_TOUTIAO_TOKEN'"

export const setToken = (value) => Storage.set(TOKEN, value)

export const getToken = () => Storage.get(TOKEN)

export const removeToken = () => Storage.remove(TOKEN)

//搜索结果

const HISTORY = "HISTORY"

export const getHistory = () => Storage.get(HISTORY)

export const setHistory = (value) => Storage.set(HISTORY, value)

export const removeHistory = () => Storage.remove(HISTORY)

//评论某个对象

// const REPLYS = "REPLYS"
// export const getReplies = () => Storage.get(REPLYS);

// export const setReplies = (value) => Storage.set(REPLYS, value);

// export const removeReplies = () => Storage.remove(REPLYS);
