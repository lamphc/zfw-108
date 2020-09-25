/**
 * 首页后台接口
 */

import request from '../utils/request'

//  获取轮播图数据
export function getSwiper () {
  return request.get('/home/swiper')
}

//  获取租房小组
export function getGroup (area = 'AREA|88cff55c-aaa4-e2e0') {
  return request.get('/home/groups', {
    params: { area }
  })
}

