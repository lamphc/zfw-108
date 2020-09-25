/**
 * 城市区域后台接口
 */

import request from '../utils/request'

/**
 * 根据城市名称获取当前城市的详细数据
 * @param {*} name 
 */
export function getCityInfo (name) {
  return request.get('/area/info', {
    params: { name }
  })
}

/**
 * 
 * @param {*} level 获取哪一级的城市，1 表示获取所有城市数据 2 表示城市下区的数据
 */
export function getAllCity (level = 1) {
  return request.get('/area/city', {
    params: { level }
  })
}

/**
 * 获取热门城市
 */
export function getHotCity () {
  return request.get('/area/hot')
}