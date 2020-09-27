/**
 * 城市选择
 */
import React, { Component } from 'react'
import { getAllCity, getHotCity } from '../../api/area'
import { getCurCity, setLocalData, CURR_CITY } from '../../utils'
// 导入列表组件
import { List, AutoSizer } from 'react-virtualized'
import './index.scss'
import { NavBar, Icon, Toast } from 'antd-mobile'

// 列表假数据
// const list = Array.from(new Array(100)).map((item) => Math.random() * 100)

export default class CityList extends Component {
  state = {
    // 归类的数据
    cityList: {},
    // 类别数据
    cityIndex: [],
    // 当前滚动的索引
    activeIndex: 0,
  }
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

      this.setState({ cityList, cityIndex })

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

  // 格式化类别
  formatCate(cate, isNav) {
    switch (cate) {
      case '#':
        return isNav ? '当' : '当前城市'
      case 'hot':
        return isNav ? '热' : '热门城市'
      default:
        return cate.toUpperCase()
    }
  }

  // 切换城市
  changeCity(city) {
    // 只有热门城市有数据
    const hasData = ['北京', '上海', '广州', '深圳']
    if (hasData.includes(city.label)) {
      // 替换本地定位城市数据
      setLocalData(CURR_CITY, JSON.stringify(city))
      // 返回首页
      this.props.history.goBack()
    } else {
      Toast.info('当前城市无房源数据！', 2)
    }
  }

  // 自定义列表项模版和绑定数据
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    const { cityIndex, cityList } = this.state
    // 获取当前项的类别
    const cate = cityIndex[index]
    // 当前类别下的数据
    const cateList = cityList[cate]
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.formatCate(cate)}</div>
        {cateList.map((item) => (
          <div
            key={item.value}
            className="name"
            onClick={() => this.changeCity(item)}>
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 动态计算高度
  execHeight = ({ index }) => {
    const { cityIndex, cityList } = this.state
    // 获取当前项的类别
    const cate = cityIndex[index]
    // 当前类别下的数据
    const cateList = cityList[cate]
    return 36 + cateList.length * 50
  }

  // 渲染右侧索引
  renderCityIndex = () => {
    const { cityIndex } = this.state
    return cityIndex.map((item, index) => {
      return (
        <li
          onClick={() => {
            // console.log(this.listRef)
            this.listRef.scrollToRow(index)
            // this.setState({ activeIndex: index })
          }}
          key={item}
          className="city-index-item">
          <span
            className={this.state.activeIndex === index ? 'index-active' : ''}>
            {this.formatCate(item, true)}
          </span>
        </li>
      )
    })
  }

  // 列表每次渲染都会执行
  /**
   * overscanStartIndex, overscanStopIndex(滚动区域内渲染数据开始和结束索引)
   * startIndex, stopIndex（可见区域数据的开始和结束索引）
   * @param {*} param0
   */
  onRowsRendered = ({
    overscanStartIndex,
    overscanStopIndex,
    startIndex,
    stopIndex,
  }) => {
    if (startIndex !== this.state.activeIndex) {
      console.log('滚动到那行：', startIndex)
      // 设置列表滚动位置高亮
      this.setState({ activeIndex: startIndex })
    }
  }

  render() {
    return (
      <div className="cityBox">
        {/* 导航 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={[<Icon key="1" type="ellipsis" />]}>
          城市选择
        </NavBar>
        {/* 城市列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
              ref={(list) => (this.listRef = list)}
              scrollToAlignment="start"
              // 列表宽高
              width={width}
              height={height}
              // 列表数据总数
              rowCount={this.state.cityIndex.length}
              // 列表项高度
              rowHeight={this.execHeight}
              // 列表项模版
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
            />
          )}
        </AutoSizer>
        {/* 列表的类别索引 */}
        {/* 右侧索引列表 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    )
  }
}
