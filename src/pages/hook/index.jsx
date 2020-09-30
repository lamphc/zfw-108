import React, { useState, useEffect, useContext, useRef } from 'react'

const MyContext = React.createContext()

const Fn2 = () => {
  const shareCount = useContext(MyContext)
  return (
    <div>
      <h1>Fn2</h1>
      <p>通过hook函数获取共享数据2：{shareCount}</p>
      <MyContext.Consumer>{(data) => <h2>{data}</h2>}</MyContext.Consumer>
    </div>
  )
}

const Fn1 = () => {
  const shareCount = useContext(MyContext)
  return (
    <div>
      <h1>Fn1</h1>
      <p>通过hook函数获取共享数据1：{shareCount}</p>
      <Fn2 />
      <MyContext.Consumer>{(data) => <h2>{data}</h2>}</MyContext.Consumer>
    </div>
  )
}

// 自定义hook=>复用状态数据和逻辑
const useCounter = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let id = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return [count, setCount]
}

// 父组件
function Hook(props) {
  // 定义响应数据
  // useState(初始值)=》state数据和修改state数据的方法
  const [count, setCount] = useState(0)

  const [obj, setObj] = useState({ a: 1, b: 2 })
  // console.log(count, setCount)

  const [list, setList] = useState([
    { id: 0, color: 'red' },
    { id: 1, color: 'blue' },
  ])

  const pref = useRef()

  // 调用自定义hook
  const [countDiy] = useCounter()

  // 生命周期：componentDidMount
  useEffect(() => {
    console.log('组件加载了！')

    // componentWillUnmount
    return () => {
      console.log('组件销毁了！')
    }
  }, [])

  useEffect(() => {
    console.log(111)
  }, [obj])

  const add = () => {
    // setCount(count + 1)
    console.log(pref)
    setCount((count) => {
      console.log(count)
      return count + 1
    })
  }

  const changeObj = () => {
    // setObj({ a: 10, b: obj.b })
    setObj((obj) => {
      let newObj = { ...obj }
      newObj.a = 100
      return newObj
    })
  }

  const changeList = () => {
    setList((list) => {
      // list.push({ id: 2, color: 'orange' })
      // console.log(list)
      let newList = [...list, { id: 2, color: 'orange' }]
      return newList
    })
  }

  return (
    <MyContext.Provider value={count}>
      <h1>react hook用法</h1>
      <h2 style={{ color: 'red' }}>{countDiy}</h2>
      <p ref={pref}>{count}</p>
      <p>
        {obj.a},{obj.b}
      </p>
      <button onClick={add}>add</button>
      <button onClick={changeObj}>changeObj</button>
      <hr />
      <ul>
        {list.map((item, index) => (
          <li style={{ background: item.color }} key={index}>
            {item.color}
          </li>
        ))}
      </ul>
      <button onClick={changeList}>changeList</button>
      <hr />
      <Fn1 />
    </MyContext.Provider>
  )
}

export default Hook
