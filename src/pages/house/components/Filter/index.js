/**
 * 筛选器的根组件
 */
import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'


import styles from './index.module.css'
import { getFilters } from '../../../../api/house'
import { getCurCity } from '../../../../utils'


// 筛选器title选中状态
const tilteSelStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}

export default class Filter extends Component {

  // 定义响应数据
  state = {
    // 筛选器title选中状态
    tilteSelStatus: { ...tilteSelStatus },
    // 当前选中的筛选器
    openType: ''
  }

  componentDidMount () {
    this.getFilters()
    // 初始化：筛选器选中的条件数据
    this.filterSeled = {}
  }


  // 处理筛选器选择条件后的高亮
  handlerSelStatus () {
    const newStatus = {}
    // 遍历对象=》for in / Object.keys
    Object.keys(this.filterSeled).forEach((key) => {
      // 选中条件和未选中的区别？
      const val = this.filterSeled[key]
      if (key && val) {
        // 区域筛选器
        if (key === 'area' && (val[1] !== 'null' || val[0] === 'subway')) {
          newStatus[key] = true
        } else if (key === 'mode' && val[0] !== 'null') {
          newStatus[key] = true
        } else if (key === 'price' && val[0] !== 'null') {
          newStatus[key] = true
        } else {
          newStatus[key] = false
        }
      }
    })
    return newStatus
  }


  // 获取筛选条件数据
  async getFilters () {
    // 获取定位城市的ID
    const { value } = await getCurCity()
    const { status, data } = await getFilters(value)
    if (status === 200) {
      console.log(data)
      // 筛选条件数据存储到组件this上
      this.filterDatas = data
    }
  }


  // 修改筛选器选中的高亮状态
  onTitleClick = (type) => {
    // 修改谁？根据type
    this.setState({
      tilteSelStatus: { ...tilteSelStatus, [type]: true },
      openType: type
    })
  }

  // 是否显示前三个筛选器的内容
  isShowPicker () {
    const { openType } = this.state
    return openType === 'area' || openType === 'mode' || openType === 'price'
  }

  // 示前三个筛选器的内容
  showPicker () {
    if (this.isShowPicker()) {
      // 根据当前点击的type值，决定传递什么数据
      const { openType } = this.state
      const { area, subway, rentType, price } = this.filterDatas
      let data, cols = 1
      switch (openType) {
        // 第一个筛选器数据
        case 'area':
          cols = 3
          data = [area, subway]
          break
        case 'mode':
          data = rentType
          break
        default:
          data = price

      }
      return <FilterPicker key={openType} data={data} value={this.filterSeled[openType]} cols={cols} onOk={this.onOk} onClose={this.onClose} />
    }
  }

  // 筛选器=》确定选中条件
  onOk = (sel) => {
    const { openType } = this.state
    console.log('当前选中的条件：', openType, sel)
    // 存储当前筛选器的选中条件=》回现
    this.filterSeled[openType] = sel
    this.setState({ openType: '', tilteSelStatus: this.handlerSelStatus() })
  }

  // 关闭筛选器
  onClose = () => {
    this.setState({ openType: '', tilteSelStatus: this.handlerSelStatus() })
  }

  render () {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.isShowPicker() ? <div onClick={this.onClose} className={styles.mask} /> : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle tilteSelStatus={this.state.tilteSelStatus} onTitleClick={this.onTitleClick} />

          {/* 前三个菜单对应的内容： */}
          {this.showPicker()}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
