import '../index.css'
import React from 'react'
import { Outlet } from 'react-router-dom'
import {observer} from 'mobx-react-lite'

import Header from './Header'


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default observer(Layout)