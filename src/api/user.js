
/**
 * 用户后台接口
 */

import request from '../utils/request'

/**
 * 
 * @param {*} data 对象：用户名和密码
 */
export function login (data) {
  return request.post('/user/login', data)
}

/**
 * 根据token获取当前登录人信息
 */
export function getUserInfo () {
  return request.get('/user')
}

/**
 * 根据token退出登录
 */
export function logout () {
  return request.post('/user/logout')
}

/**
 * 检查房源是否收藏过
 * @param {*} id 房源ID
 */
export function isFav (id) {
  return request.get(`/user/favorites/${id}`)
}

/**
 * 添加收藏
 * @param {*} id 
 */
export function addFav (id) {
  return request.post(`/user/favorites/${id}`)
}

/**
 * 删除收藏
 * @param {*} id 
 */
export function delFav (id) {
  return request.delete(`/user/favorites/${id}`)
}



