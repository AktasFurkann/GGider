import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from '../components/Menu'

function dashBoardLayout() {
  return (
    <div>
      <Menu></Menu>
      <hr></hr>

      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default dashBoardLayout
