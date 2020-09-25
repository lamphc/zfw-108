/**
 * 默认首页（第一个标签页页面）
 */
import React, { Component } from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile'
import { getSwiper, getGroup } from '../../api/home'
import './index.scss'
import navs from '../../utils/navConf'
import { BASE_URL } from '../../utils/request'

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
    // 是否自动播放
    isPlay: false,
    imgHeight: 176,
  }
  componentDidMount() {
    this.getSwiper()
    this.getGroup()
  }

  // 获取轮播图数据
  async getSwiper() {
    const { status, data } = await getSwiper()
    if (status === 200) {
      this.setState(
        {
          swiper: data,
        },
        () => {
          // 设置自动播放 =》$nextTick()
          this.setState({
            isPlay: true,
          })
        }
      )
      console.log(this.state.swiper)
    }
  }

  // 获取租房小组数据
  async getGroup() {
    const { status, data } = await getGroup()
    if (status === 200) {
      // console.log(data)
      this.setState({ group: data })
    }
  }

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default Index
