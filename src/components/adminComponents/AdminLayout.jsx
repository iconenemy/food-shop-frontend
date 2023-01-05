import '../../index.css'
import React, { useContext} from 'react'
import { Outlet } from 'react-router-dom'
import {observer} from 'mobx-react-lite'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import StoreContext from '../../index'
import AdminHeader from './AdminHeader'
import { Typography } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000',
      secondary: '#d21976'
    },
    secondary: {
      light: "#d21976",
      main: "#d21976",
      contrastText: "#d21976",
    },
    neutral: {
      main: '#d21976',
      contrastText: '#fff',
    }
  },
});

const AdminLayout = () => {
  const {store} = useContext(StoreContext)

  return ( 
    <>
      {store.isStaff ? 
      <ThemeProvider theme={darkTheme}> 
      <AdminHeader />
          <div className='admin-background'>
          <Toolbar />
          <Box component="main" ml={25} sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
            </Box>
            </div> 
            </ThemeProvider>
        :
          <Typography>
            This page not found 404
          </Typography>
          }
      </>    
  )
}

export default observer(AdminLayout)