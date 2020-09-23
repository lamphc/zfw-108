/**
 * 404页面
 */
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <center>
      <h2>迷路了吗？</h2>
      <Link to="/home">带你回家～</Link>
    </center>
  )
}
