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

// 筛选器默认选中的条件
const defSel = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
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
    this.filterSeled = { ...defSel }
  }


  // 处理筛选条件数据=》后续调用房源列表接口使用
  handlerFilterDatas () {
    const filters = {}
    const { area, mode, price, more } = this.filterSeled

    if (Object.keys(this.filterSeled).length) {
      // 区域
      let key = area[0], val
      if (area.length === 2) {
        val = area[1]
      } else {
        if (area[2] !== 'null') {
          val = area[2]
        } else {
          val = area[1]
        }
      }
      filters[key] = val
    }
    // 出租方式
    filters.rentType = mode[0]
    // 租金
    filters.price = price[0]
    // 更多
    filters.more = more.join(',')

    return filters
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
        } else if (key === 'more' && val.length > 0) {
          newStatus[key] = true
        }
        else {
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
    this.setState({ openType: '', tilteSelStatus: this.handlerSelStatus() }, () => {
      // console.log('选中的筛选器数据：', this.handlerFilterDatas())
      this.props.onFilter(this.handlerFilterDatas())
    })
  }

  // 关闭筛选器
  onClose = () => {
    this.setState({ openType: '', tilteSelStatus: this.handlerSelStatus() })
  }

  // 渲染更多筛选器
  renderMoreFilter () {
    const { openType } = this.state
    if (openType === 'more') {
      let { roomType, oriented, floor, characteristic } = this.filterDatas
      let data = { roomType, oriented, floor, characteristic }
      return <FilterMore data={data} value={this.filterSeled[openType]} onOk={this.onOk} onClose={this.onClose} />
    }
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
          {this.renderMoreFilter()}
        </div>
      </div>
    )
  }
}
