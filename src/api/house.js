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