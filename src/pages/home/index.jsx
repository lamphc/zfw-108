/**
 * 首页骨架
 */
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import House from '../house'
import Index from '../index'
import Profile from '../Profile'

import { TabBar } from 'antd-mobile'

import './index.css'
import TabBarList from '../../utils/barConf'

export default class Home extends Component {
  state = {
    // 标签栏选中状态=>动态获取
    selectedTab: this.props.location.pathname,
  }

  // 渲染标签栏
  renderTabBar() {
    return (
      <TabBar
        // 未选中字体颜色
        unselectedTintColor="#949494"
        // 选中的颜色
        tintColor="#33A3F4"
        // tabBar的背景色
        barTintColor="white">
        {TabBarList.map((item) => (
          <TabBar.Item
            title={item.title}
            key={item.icon}
            icon={<i className={`iconfont ${item.icon}`} />}
            selectedIcon={<i className={`iconfont ${item.icon}`} />}
            selected={this.state.selectedTab === item.path}
            onPress={() => {
              this.props.history.push(item.path)
              this.setState({
                selectedTab: item.path,
              })
            }}
          />
        ))}
      </TabBar>
    )
  }

  render() {
    // console.log(this.props)
    return (
      <div className="home">
        {/* 配置二级路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        {/* NavBar */}
        <div className="tabBar">{this.renderTabBar()}</div>
      </div>
    )
  }
}
