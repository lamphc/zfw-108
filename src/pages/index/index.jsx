/**
 * 默认首页（第一个标签页页面）
 */
import React, { Component } from 'react'
import { Carousel, Flex, Grid, WingBlank, SearchBar } from 'antd-mobile'
import { getSwiper, getGroup, getNews } from '../../api/home'
import './index.scss'
import navs from '../../utils/navConf'
import { BASE_URL } from '../../utils/request'
import { getCurCity } from '../../utils'

// const data1 = Array.from(new Array(4)).map(() => ({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
// }))
// console.log(data1)

class Index extends Component {
  state = {
    // 轮播图数据
    swiper: [],
    // 租房小组
    group: [],
    // 新闻资讯
    news: [],
    // 搜索的关键词
    keyword: '',
    // 是否自动播放
    isPlay: false,
    imgHeight: 176,
    // 定位城市
    cityInfo: {
      label: '--',
      value: '',
    },
  }
  componentDidMount() {
    // this.getSwiper()
    // this.getGroup()
    // this.getNews()
    this.getAllData()
    this.getCurCity()
  }

  // 定位城市
  async getCurCity() {
    const cityInfo = await getCurCity()
    this.setState({ cityInfo })
  }

  // 获取首页所有接口的数据
  async getAllData() {
    try {
      const [swiper, group, news] = await Promise.all([
        getSwiper(),
        getGroup(),
        getNews(),
      ])
      // console.log(swiper, group, news)
      this.setState(
        { swiper: swiper.data, group: group.data, news: news.data },
        () => {
          // 组件渲染完
          this.setState({ isPlay: true })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.news.map((item) => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`${BASE_URL}${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  // 渲染顶部导航
  renderTopNav = () => {
    const { push } = this.props.history
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={() => push('/cityList')}>
            {this.state.cityInfo.label}
            <i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            // 受控组件=》双向绑定
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={() => push('/map')}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
  }

  render() {
    return (
      <div>
        {/* 顶部的搜索导航 */}
        {this.renderTopNav()}
        {/* 轮播图 */}
        <Carousel autoplay={this.state.isPlay} infinite>
          {this.state.swiper.map((item) => (
            <a
              key={item.id}
              href="http://www.itheima.com"
              style={{
                display: 'inline-block',
                width: '100%',
                background: '#eee',
                // 默认占位高度
                height: this.state.imgHeight,
              }}>
              <img
                src={`http://api-haoke-dev.itheima.net${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  // 做图片自适应
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
        {/* 栏目导航 */}
        {/* <img alt="" src={nav1} />
        <img alt="" src={require('../../assets/images/nav-2.png')} /> */}
        <Flex direction="row" className="nav">
          {navs.map((nav) => (
            <Flex.Item
              onClick={() => {
                this.props.history.push(nav.path)
              }}
              key={nav.id}>
              <img alt="" src={nav.img} />
              <p>{nav.title}</p>
            </Flex.Item>
          ))}
        </Flex>
        {/* 租房小组 */}
        <div className="group">
          {/* title */}
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 宫格 */}
          <Grid
            data={this.state.group}
            hasLine={false}
            square={false}
            columnNum={2}
            renderItem={(item) => {
              return (
                // item结构
                <Flex className="grid-item" justify="between">
                  <div className="desc">
                    <h3>{item.title || '--'}</h3>
                    <p>{item.desc || '--'}</p>
                  </div>
                  <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
                </Flex>
              )
            }}
          />
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
}

export default Index
