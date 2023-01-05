import '../index.css'
import React from 'react'
import { Outlet } from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import Container from '@mui/material/Container'

import Header from './Header'
import { Toolbar } from '@mui/material'

const Layout = () => {
  return (
    <>
      <Header />
      <Toolbar />
      <Container sx={{paddingTop: 5, display: 'grid', alignItems: 'center'}}>
          <Outlet />
      </Container>
    </>
  )
}

export default observer(Layout)