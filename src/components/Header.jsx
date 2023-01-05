import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {observer} from 'mobx-react-lite'

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import StoreContext from '../index'

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
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Link to='/' style={{textDecoration: 'none', color: 'white'}}>

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        >
                        <FastfoodIcon />
                        <Typography variant="h6" component="div" sx={{ ml: 1, flexGrow: 1, fontStyle: 'Italic'}}>
                            ICON
                        </Typography>
                    </IconButton>
                </Link>

                    {!store.isAuth ?
                        <Box>
                            <Link to='login' style={{textDecoration: 'none'}}>
                                <Button color="secondary" variant='outlined' sx={{marginRight: 1}}>
                                    Sign in
                                </Button>
                            </Link>
                            <Link to='register' style={{textDecoration: 'none'}}>
                                <Button color="secondary" variant='outlined'>
                                    Sign up
                                </Button>
                            </Link>
                        </Box>
                        :
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            {store.isStaff && 
                            <Link to='/admin' style={{textDecoration: 'none'}}>
                                <IconButton
                                    size="small"
                                    edge="start"
                                    sx={{ mr: 2, color: 'white'}}
                                    >
                                    <AdminPanelSettingsIcon />
                                    <Typography variant="button" component="div" sx={{ ml: 1, flexGrow: 1 }}>
                                        Go to Admin
                                    </Typography>
                                </IconButton>
                            </Link>
                            }
                            <Box>
                            <Stack direction="row" spacing={2} sx={{marginRight: 2}}>
                                <Avatar
                                sx={{ bgcolor: '#ececec', color: '#ad160c', fontWeight: 'bold'}}
                                alt={store.username}
                                src="/broken-image.jpg"
                                >
                                   {store.username[0].toUpperCase()}
                                </Avatar>
                            </Stack>
                            </Box>
                        
                            <Button 
                                color="secondary" 
                                variant='outlined' 
                                sx={{marginRight: 1}} 
                                onClick={handleSubmit}
                                >
                                Logout
                            </Button>
                        </Box>
                    }
                </ Toolbar>
            </AppBar>
        </Box>
    )
}

export default observer(Header)