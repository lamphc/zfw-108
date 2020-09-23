/**
 * 首页后台接口
 */

import request from '../utils/request'

//  获取轮播图数据
export function getSwiper () {
  return request.get('/home/swiper')
}