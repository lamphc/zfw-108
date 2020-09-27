import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {

  state = {
    // 父组件传递的选中条件作为默认值
    value: this.props.value
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(nextProps)
  //   this.setState({ value: nextProps.value })
  // }
  // componentDidUpdate (prevProps, prevState) {
  //   console.log(prevProps, prevState)
  // }
  // shouldComponentUpdate (nextProps, nextState) {

  //   console.log(nextProps, nextState)
  //   this.setState({ value: nextProps.value })
  //   return true
  // }



  render () {
    const { onOk, onClose, data, cols } = this.props
    // console.log(this.props)
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={this.state.value} onChange={(value) => {
          // console.log(val)
          this.setState({
            value
          })
        }} cols={cols} />

        {/* 底部按钮 */}
        <FilterFooter onOk={() => onOk(this.state.value)} onClose={onClose} />
      </>
    )
  }
}
