import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {observer} from 'mobx-react-lite'

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import StoreContext from '../index'
import AdminNavigate from './adminComponents/AdminNavigate';

const Header = () => {
    
    const {store} = useContext(StoreContext)
    const navigate = useNavigate()
    
    if (store.isLoading) {
        return ( <div> 
          Loading...
        </div>)
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
            store.logout()
            navigate('/')
        } catch (err) {
            console.log(err);
            navigate('/')
        }
    }

    return (    
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {store.isStaff ?
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Admin Panel
                            </Typography>
                            :
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                FoodShop
                            </Typography>
                        }
                    </IconButton>
                    {!store.isAuth ?
                        <>
                            <Link to='login' style={{textDecoration: 'none'}}>
                                <Button color="secondary" variant='outlined' sx={{marginRight: 1}}>
                                    Sign in
                                </Button>
                            </Link>
                            <Link to='register' style={{textDecoration: 'none'}}>
                                <Button color="secondary" variant='outlined' sx={{textDecorationColor: "teal"}}>
                                    Sign up
                                </Button>
                            </Link>
                        </> 
                        :
                        <Button 
                            color="secondary" 
                            variant='outlined' 
                            sx={{marginRight: 1}} 
                            onClick={handleSubmit}
                        >
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            {store.isStaff ?
                <AdminNavigate />
                :
                <>
                </>
            }
        </Box>
    )
}

export default observer(Header)