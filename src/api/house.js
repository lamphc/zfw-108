/**
 * 房源后台接口
 */

import request from '../utils/request'

/**
 * 获取列表找房筛选条件数据
 * @param {*} id 当前定位城市的ID 
 */
export function getFilters (id) {
  return request.get('/houses/condition', {
    params: { id }
  })
}

/**
 * 根据筛选条件获取房源列表数据
 * @param {*} cityId 城市ID
 * @param {*} filters 过滤条件
 * @param {*} start 数据开始
 * @param {*} end 数据结束
 */
export function getListByFiltes (cityId, filters, start = 1, end = 20) {
  return request.get('/houses', {
    params: {
      cityId,
      ...filters,
      start, end
    }
  })
}