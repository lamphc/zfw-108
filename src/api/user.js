import { getToken } from '../utils'
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
  return request.get('/user', {
    headers: {
      authorization: getToken()
    }
  })
}

/**
 * 根据token退出登录
 */
export function logout () {
  return request.post('/user/logout', null, {
    headers: {
      authorization: getToken()
    }
  })
}



