/**
 * 列表找房（第二个标签页）
 */
import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'

export default class HouseList extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter />
        {/* 筛选结果列表 */}
        <ul className={styles.test}>
          <li>筛选结果列表</li>
          <li id="testid">2</li>
        </ul>
      </div>
    )
  }
}
