/**
 * 全局的公共方法
 */
import { getCityInfo } from '../api/area'
// 定位城市方法
const CURR_CITY = 'CURR_CITY'
const getCurCity = () => {
  // 1. 第一次获取到定位城市信息后=》存储到本地
  // 2. 下一次获取的时候，先从本地读取
  const curCity = JSON.parse(getLocalData(CURR_CITY))
  if (!curCity) {
    // 本地没有定位数据
    return new Promise((resolve, reject) => {
      const { BMap } = window
      // 初始化根据上网IP定位的实例
      const myCity = new BMap.LocalCity()
      myCity.get(async (result) => {
        const cityName = result.name
        // console.log('当前定位城市:' + cityName)
        const { status, data, description } = await getCityInfo(cityName)
        if (status === 200) {
          // 本地存储一份
          setLocalData(CURR_CITY, JSON.stringify(data))
          resolve(data)
        } else {
          reject(description)
        }
      })
    })
  } else {
    return Promise.resolve(curCity)
  }
}

/**
 * 本地持久化封装
 * 1. localStorage 一直存在（除非用户手动删除）大小：5M
 * 2. sessionStorage 浏览器/标签页关闭了，数据删除 大小：5M
 * 3. cookie 设置过期时间(不安全) 大小：4KB
 * 4. indexDB 本地数据库 大小没有限制
 */
const ZFW_TOKEN = 'ZFW_TOKEN'
//  存储
export function setLocalData (key, val) {
  window.localStorage.setItem(key, val)
}
//  获取
export function getLocalData (key) {
  return window.localStorage.getItem(key)
}

// 删除
export function delLocalData (key) {
  window.localStorage.removeItem(key)
}

// 封装存储token的方法

// 存储token
export function setToken (val) {
  setLocalData(ZFW_TOKEN, val)
}
// 获取token
export function getToken () {
  return getLocalData(ZFW_TOKEN)
}

// 删除token
export function delToken () {
  delLocalData(ZFW_TOKEN)
}

// 判断是否登录
export function isAuth () {
  return !!getToken()
}






export { getCurCity, CURR_CITY, ZFW_TOKEN }