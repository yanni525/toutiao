// 封装本地存储
// 用class类 特性：封装 继承 多态
class Storage {
  get(key) {
    // getitem(key:string):string
    // JSON.parse() 只能转化JSON格式字符串
    const value = localStorage.getItem(key)
    // 如果是JSON格式的，parse一下
    // 不是JSON，直接返回
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
