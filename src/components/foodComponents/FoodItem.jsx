import React, {useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid  from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';

import MenuButtons from './MenuButtons';
import FoodService from '../../services/FoodService'

const FoodItem = ( ) => {
  
  const location = useLocation()
  const { _id } = location.state.data
  
  const [foodItemList, setFoodItemList] = useState([])

  const getFoodItemListById = useCallback( async () => {
    try{
      const response = await FoodService.getAllFoodItemByFoodSectionId(_id)
      setFoodItemList(response.data.list)
    } catch (err) {
      console.log(err);
    }
  }, [_id])

  useEffect(() => {
    getFoodItemListById(_id)
    console.log();
  }, [getFoodItemListById, _id])


  return (
    <>
    <MenuButtons />
    <Grid container  rowSpacing={1} sx={{justifyContent: 'center', marginTop: 1}}>
      {foodItemList.map((item) => (
        <Grid item key={item._id} md={4} xs={12} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', marginBottom: 2}}>
          <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              // image={first}
              src={item.image}
              alt="red card"
              />
            <CardContent>
              <Typography gutterBottom variant='h6' component="h1" style={{color: '#ad160c', textTransform: 'uppercase'}}>
                {item.name} 
                
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions sx={{justifyContent: 'center'}}>
              <Button variant="contained" size="medium">{item.price.$numberDecimal} ₴</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  )
}

export default FoodItem