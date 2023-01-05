import React, {useState, useCallback, useEffect} from 'react'
import { Link } from 'react-router-dom';

import { Button, Grid, Typography } from '@mui/material';

import FoodService from '../../services/FoodService';

const  MenuButtons = () => {

  const [sections, setSections] = useState([])

  const getSectionList = useCallback( async () => {
    try {
      const response = await FoodService.getAllFoodSection()
      response.data.list.forEach(async (item) => {
        const foodItemList = await FoodService.getAllFoodItemByFoodSectionId(item._id)
        if(foodItemList.data.list.length > 0) setSections((oldArray) => [...oldArray, item] )
      })
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    getSectionList()
  }, [getSectionList])

  return (
        <Grid container spacing={1} sx={{justifyContent: 'center', marginBottom: 3}}>
          {sections.map(item => (
            <Grid item key={item._id} md={2} xs={4} sx={{ textAlign: 'center'}}>
              <Link to={`/${item.name}`} key={item._id} state={{ data: item }} style={{textDecoration: 'none', marginTop: '30px', color: 'red'}}>
                  <Button variant="contained" fullWidth>
                    <Typography variant='h6' color=''>
                      {item.name}
                    </Typography>
                  </Button>
              </Link>
            </Grid>
          ))}
        </Grid>
  )
}


export default MenuButtons