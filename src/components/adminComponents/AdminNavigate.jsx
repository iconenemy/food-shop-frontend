import React, { useCallback, useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'

import { Box, Toolbar } from '@mui/material';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorageIcon from '@mui/icons-material/Storage';

import AdminService from '../../services/AdminService'

const drawerWidth = 240;

const AdminHeader = () => {
    const [modelList, setModelList] = useState([])

    const getModels = useCallback( async () => {
        try {
            const response = await AdminService.getModels()
            const list = await response.data.modelList
            setModelList(list)
        } catch (err) {
            console.log(err);
        }
    }, []) 

    useEffect( () => {
        getModels()
    }, [])


  return (
    <Drawer
        variant="permanent"
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
    >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
            <List>
                {modelList.map((item) => (
                    <ListItem key={item} disablePadding sx={{color: 'teal'}}>
                        <ListItemButton>
                            <ListItemIcon sx={{color: 'teal'}}>
                                <StorageIcon />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
  )
}

export default observer(AdminHeader)