/**
 * 地图找房
 */
import React, { Component } from 'react'

import { NavBar, Icon } from 'antd-mobile'
import './index.scss'

export default class Map extends Component {
  componentDidMount() {
    console.log(window.BMap)
    this.initMap()
  }

  /**
   * 初始化地图
   */
  initMap() {
    const { BMap } = window
    // 1. 创建地图实例
    const map = new BMap.Map('container')
    // 2. 设置地图的显示的位置=》经纬度
    const point = new BMap.Point(116.719897, 40.178067)
    // 3. 地图初始化，同时设置地图展示级别（范围3-19级）
    // 展示级别：数值越小，地图显示范围越大；相反，地图显示信息越详细
    map.centerAndZoom(point, 15)
  }

  render() {
    return (
      <div className="mapBox">
        {/* 导航 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[<Icon key="1" type="ellipsis" />]}>
          地图找房
        </NavBar>
        {/* 地图显示渲染的容器 */}
        <div id="container"></div>
      </div>
    )
  }
}
