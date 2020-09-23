/**
 * 首页骨架
 */
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import House from '../house'
import Index from '../index'
import Profile from '../profile'

import './index.css'

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* 配置二级路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        {/* NavBar */}
        <div className="bar">
          <Link to="/home">首页</Link>
          <Link to="/home/house">列表找房</Link>
          <Link to="/home/profile">我的</Link>
        </div>
      </div>
    )
  }
}
