/**
 * 城市选择
 */
import React, { Component } from 'react'
import { getAllCity, getHotCity } from '../../api/area'
import { getCurCity } from '../../utils'

export default class CityList extends Component {
  componentDidMount() {
    this.getCityList()
  }

  // 获取城市列表数据
  async getCityList() {
    const { status, data } = await getAllCity()
    if (status === 200) {
      // console.log('城市列表数据：', data)
      // 格式化列表数据
      const { cityList, cityIndex } = this.formatData(data)
      // 获取热门城市数据
      const { status, data: hot } = await getHotCity()
      if (status === 200) {
        // console.log(hot)
        cityList['hot'] = hot
        cityIndex.unshift('hot')
      }

      // 获取当前城市数据
      const curCity = await getCurCity()
      cityList['#'] = [curCity]
      cityIndex.unshift('#')

      console.log('归类数据：', cityList, cityIndex)
    }
  }

  // 归类列表数据
  formatData(data) {
    let cityList = {},
      cityIndex = []
    data.forEach((item) => {
      // 获取城市的拼音首字母
      const firstKey = item.short.slice(0, 1)
      if (!cityList[firstKey]) {
        // 不存在=》创建改首字母的类别=》加入当前城市
        cityList[firstKey] = [item]
      } else {
        // 存在
        cityList[firstKey].push(item)
      }
    })

    // 列表渲染，需要数组
    cityIndex = Object.keys(cityList).sort()

    return { cityList, cityIndex }
  }

  render() {
    return <div>CityList</div>
  }
}
