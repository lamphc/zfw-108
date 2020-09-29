import React from 'react'
// import { Button } from 'antd-mobile'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import HouseDetail from './components/HouseDetail'
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
      <Switch>
        {/* 默认首页重定向 */}
        <Redirect exact from='/' to='/home' />
        {/* 配置路由=>一级路由 */}
        <Route path="/home" component={Home} />
        {/* 城市选择 */}
        <Route path="/cityList" component={CityList} />
        {/* 地图找房 */}
        <Route path="/map" component={Map} />
        {/* 房源详情 */}
        <Route path="/detail/:id" component={HouseDetail} />
        {/* 404页面 */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
