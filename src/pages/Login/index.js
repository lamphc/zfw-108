import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'
import { login } from '../../api/user'
import { setLocalData, ZFW_TOKEN } from '../../utils'
import { withFormik } from 'formik'
import * as yup from 'yup'


// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {

  // 表单处理：受控组件（双向绑定）
  // 步骤：1. 表单元素value值绑定状态数据 2. 添加onChange事件处理响应式

  // state = {
  //   // 用户名
  //   username: '',
  //   // 密码
  //   password: ''
  // }

  // handlerInput = (e) => {
  //   // console.log(e.target)
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // handlerLogin = async (e) => {
  //   e.preventDefault()
  //   /**
  //    * 登录
  //    * 1. 获取用户名和密码
  //    * 2. 调用接口验证用户名=》正确=》本地存储token
  //    */
  //   const { username, password } = this.state
  //   if (!username || !password) return Toast.fail('用户名或密码不能为空！', 2)
  //   const { status, data, description } = await login({ username, password })
  //   if (status === 200) {
  //     setLocalData(ZFW_TOKEN, data.token)
  //     Toast.success('登录成功', 1, () => {
  //       this.props.history.replace('/home/profile')
  //     })

  //   } else {
  //     Toast.fail(description, 2)
  //   }
  // }


  render () {
    const {
      values,
      errors,
      handleChange,
      handleSubmit,
    } = this.props
    // console.log(errors)
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                name="username"
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            <div className={styles.error}>{errors.username}</div>
            <div className={styles.formItem}>
              <input
                name="password"
                value={values.password}
                onChange={handleChange}
                className={styles.input}
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            <div className={styles.error}>{errors.password}</div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

const NewLogin = withFormik({
  // 定义state响应数据的=>表单元素的name属性和这里的定义要一致
  mapPropsToValues: () => ({ username: '', password: '' }),

  // Custom sync validation
  // validate: values => {
  //   const errors = {}

  //   if (!values.username || !values.password) {
  //     errors.username = 'Required'
  //     errors.password = 'Required'
  //   }

  //   return errors
  // },
  validationSchema: yup.object().shape({
    username: yup.string().required('用户名必填！').matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线 '),
    password: yup.string().required('密码必填！').matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线'),
  }),
  // 表单提交
  handleSubmit: async (values, { props, resetForm, setValues }) => {
    // console.log(values)
    /**
   * 登录
   * 1. 获取用户名和密码
   * 2. 调用接口验证用户名=》正确=》本地存储token
   */
    const { username, password } = values
    const { status, data, description } = await login({ username, password })
    if (status === 200) {
      setLocalData(ZFW_TOKEN, data.token)
      Toast.success('登录成功', 1, () => {
        props.history.replace('/home/profile')
      })
    } else {
      resetForm()
      // 如果输入错误=》填写一个正确的用户名和密码
      setValues({ username: "test2", password: 'test2' })
      Toast.fail(description, 2)
    }
  },

  displayName: 'BasicForm',
})(Login)

export default NewLogin
