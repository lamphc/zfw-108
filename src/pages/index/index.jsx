/**
 * 默认首页（第一个标签页页面）
 */
import React, { Component } from 'react'
import { Carousel } from 'antd-mobile'
import { getSwiper } from '../../api/home'

class Index extends Component {
  state = {
    // 轮播图数据
    swiper: [],
    // 是否自动播放
    isPlay: false,
    imgHeight: 176,
  }
  componentDidMount() {
    this.getSwiper()
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

  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default Index
