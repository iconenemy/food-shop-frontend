import React, { useContext } from 'react'
import { observer} from 'mobx-react-lite';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import StoreContext from '../index'
import { AdminMain } from './adminComponents/AdminMain';


const  Main = () => {
  const {store} = useContext(StoreContext)

  return (
  <>
    {store.isStaff & store.isAuth ? 
      <AdminMain />
     : 
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis comm
        </Typography>
      </Box>
    }
    </>    
  )
}


export default observer(Main)