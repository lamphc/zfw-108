import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button, Modal, Toast } from 'antd-mobile'

import styles from './index.module.css'
import { BASE_URL } from '../../utils/request'
import { delToken, isAuth } from '../../utils'
import { getUserInfo, logout } from '../../api/user'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity',
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' },
]

// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'

export default class Profile extends Component {
  state = {
    // 是否登录
    isLogin: isAuth(),
    // 个人信息
    userInfo: {},
  }

  componentDidMount() {
    this.getUserInfo()
  }

  // 如果登录=》获取个人信息
  async getUserInfo() {
    const { isLogin } = this.state
    if (isLogin) {
      // 登录过
      const { status, data } = await getUserInfo()
      // console.log(status, data)
      if (status === 200) {
        // 处理用户头像
        data.avatar = data.avatar ? BASE_URL + data.avatar : DEFAULT_AVATAR
        this.setState({ userInfo: data })
      }
    }
  }

  // 退出登录
  logout = () => {
    /**
     * 1. 提示确认=》是否退出登录
     * 2. 确认退出=》调用接口退出（服务器退出）/ 本地退出（删除本地token）
     * 3. 登录状态改成=》未登录
     */
    Modal.alert('提示', '确定退出登录吗？', [
      { text: '取消' },
      {
        text: '确定退出',
        onPress: async () => {
          const { status, description } = await logout()
          if (status === 200) {
            Toast.success(description, 2)
            delToken()
            console.log(this)
            this.setState({ isLogin: false, userInfo: {} })
          }
        },
      },
    ])
  }

  render() {
    const { history } = this.props
    const { userInfo, isLogin } = this.state
    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img
                className={styles.avatar}
                src={userInfo.avatar || DEFAULT_AVATAR}
                alt="icon"
              />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{userInfo.nickname || '游客'}</div>
              {/* 登录后展示： */}
              {isLogin && (
                <>
                  <div className={styles.auth}>
                    <span onClick={this.logout}>退出</span>
                  </div>
                  <div
                    className={styles.edit}
                    onClick={() => history.push('/rent/add')}>
                    发布房源
                    <span className={styles.arrow}>
                      <i className="iconfont icon-arrow" />
                    </span>
                  </div>
                </>
              )}

              {/* 未登录展示： */}
              {!isLogin && (
                <div className={styles.edit}>
                  <Button
                    type="primary"
                    size="small"
                    inline
                    onClick={() => history.push('/login')}>
                    去登录
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={(item) =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_URL + '/img/profile/join.png'} alt="" />
        </div>
      </div>
    )
  }
}
