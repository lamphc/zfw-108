import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {

  state = {
    // 选中的条件数据
    seled: this.props.value || []
  }

  // 处理条件选择
  handlerSel (sel) {
    /**
     * 1. 获取之前选中的条件
     * 2. 判断当前选择的条件=》是否之前选过
     *    选过=》删除
     *    没选过=》添加  
     */
    const { seled } = this.state
    const index = seled.indexOf(sel.value)
    if (index > -1) {
      // 删除
      seled.splice(index, 1)
    } else {
      // 没有
      seled.push(sel.value)
    }
    this.setState({ seled })

  }

  // 渲染标签
  renderFilters (data) {
    // 高亮类名： styles.tagActive
    return data.map((item) =>
      <span onClick={() => this.handlerSel(item)} key={item.value} className={[styles.tag, this.state.seled.includes(item.value) ? styles.tagActive : ''].join(' ')}>{item.label}</span>)
  }

  render () {
    const { onOk, onClose, data: { roomType, oriented, floor, characteristic } } = this.props
    // console.log(data)
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div onClick={onClose} className={styles.mask} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter onOk={() => onOk(this.state.seled)} onClose={onClose} className={styles.footer} />
      </div>
    )
  }
}
