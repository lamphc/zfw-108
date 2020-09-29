/**
 * 列表找房（第二个标签页）
 */
import React from 'react'

import { Flex, Toast } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
import { getListByFiltes } from '../../api/house'
import { getCurCity } from '../../utils'

import { AutoSizer, List, InfiniteLoader } from 'react-virtualized'
import HouseItem from '../../components/HouseItem'
import { BASE_URL } from '../../utils/request'
import NoHouse from '../../components/NoHouse'

export default class HouseList extends React.Component {
  state = { list: [], count: 0 }
  // 回调函数
  onFilter = (filters) => {
    console.log('接收子组件筛选器的数据：', filters)
    this.filters = filters
    // 确定的时候=》根据筛选条件获取房源列表数据
    this.getList(this.filters)
  }

  async componentDidMount() {
    const { value } = await getCurCity()
    // 存储城市ID
    this.cityId = value
    // 默认加载获取房源列表数据
    this.getList()
    // fetch
    const res = await window.fetch(
      'http://api-haoke-dev.itheima.net/home/swiper'
    )
    res.json().then((res) => console.log(res))
  }

  async getList(filters) {
    const {
      status,
      data: { list, count },
    } = await getListByFiltes(this.cityId, filters)
    if (status === 200) {
      console.log(list, count)
      if (count > 0) {
        Toast.success(`获取到${count}条房源数据！`, 2)
      }
      this.setState({ list, count })
    }
  }

  // 渲染列表项
  rowRenderer = ({ key, index, style }) => {
    const item = this.state.list[index]
    // 数据请求有延迟=>没有数据显示骨架屏
    if (!item) {
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    // 处理图片
    item.src = `${BASE_URL}${item.houseImg}`
    return (
      <HouseItem
        onClick={() =>
          this.props.history.push({
            pathname: '/detail/' + item.houseCode,
            data: { a: 1, b: [] },
            diy: 100,
          })
        }
        {...item}
        key={key}
        style={style}
      />
    )
  }

  // 上拉加载更多
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }

  // 上拉加载更多
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return getListByFiltes(
      this.cityId,
      this.filters,
      startIndex,
      stopIndex
    ).then(({ status, data: { list } }) => {
      // console.log('获取下一页数据：', startIndex, stopIndex, res)
      if (status === 200) {
        this.setState({
          list: [...this.state.list, ...list],
        })
      }
    })
  }

  // 渲染列表
  renderList() {
    const { count } = this.state
    if (count > 0) {
      return (
        <InfiniteLoader
          // 列表项是否加载完成
          isRowLoaded={this.isRowLoaded}
          // 加载更多
          loadMoreRows={this.loadMoreRows}
          // 列表数据的总条数
          rowCount={this.state.count}>
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className={styles.houseList}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                  height={height}
                  rowCount={this.state.count}
                  rowHeight={130}
                  rowRenderer={this.rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )
    }
    return <NoHouse>暂无房源数据！</NoHouse>
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
        {/* 筛选结果列表 */}
        {this.renderList()}
      </div>
    )
  }
}
