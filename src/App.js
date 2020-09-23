import React from 'react'
// import { Button } from 'antd-mobile'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import CityList from './pages/cityList'
import Home from './pages/home'
import Map from './pages/map'
import NotFound from './pages/notFound'

/**
 * 配置路由：
 * 1. 安装：npm i react-router-dom
 * 2. 三个基础组件：BrowserRouter/HashRouter、Route、Link
 */

function App () {
  return (
    <Router>
      {/* 测试路由 */}
      <div className="nav">
        <Link to="/home">首页</Link>
        <Link to="/cityList">城市选择</Link>
        <Link to="/map">地图找房</Link>
      </div>
      <Switch>
        {/* 默认首页重定向 */}
        <Redirect exact from='/' to='/home' />
        {/* 配置路由=>一级路由 */}
        <Route path="/home" component={Home} />
        {/* 城市选择 */}
        <Route path="/cityList" component={CityList} />
        {/* 地图找房 */}
        <Route path="/map" component={Map} />
        {/* 404页面 */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
