import React, { useState, useEffect, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import EventRepeatRoundedIcon from '@mui/icons-material/EventRepeatRounded';
import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';

import AdminService from '../../../services/AdminService';

const FoodItemDocumnetUpdate = ({model, id}) => {
  const navigate = useNavigate()
  const [foodSectionList, setFoodSectionList] = useState([])
  const [foodSection, setFoodSection] = useState('')
  
  
  const [formData, setFormData] = useState(Object.freeze({
    name: '',
    ordering_priority: null,
    is_available: false,
    image: '',
    price: '',
  }))
  
  const getFoodItemById = useCallback(async (model, id) => {
    try {
      const response = await AdminService.findOne(model, id)
      delete response['_id']
      setFormData(response.data.list)
    } catch (err) {
      console.log(err);
    }
  }, [])

  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value.trim()
    })
  }
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await AdminService.updateOne(
        model,
        id, 
        {food_item: {...formData, food_section: foodSection}}
        )
        if (response.data.status === 200) navigate(`/admin/${model}`)
      } catch (err){
        console.log(err)
      }
    }

    const handleDelete = async (event) => {
      event.preventDefault();
      try {
          const response = await AdminService.delete(model, id)
          if (response.data.status === 200) navigate(`/admin/${model}`)
      } catch (err){
        console.log(err)
      }
    }

    const getFoodSectionList = useCallback ( async (model) => {
      try {
        const response = await AdminService.getAll(model)
        response.data.docList.forEach(item => setFoodSectionList((currentArray) => [...currentArray, {
          value: item._id,
          label: item.name
      }]))  
      } catch (err) {
        console.log(err);
      }
    }, [])
  
    useEffect(() => {
      getFoodItemById(model, id)
      getFoodSectionList('FoodSection')
    }, [getFoodItemById, getFoodSectionList, model, id])

    const checkboxChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.checked
      })
    }

    const changeFoodSection = (event) => {
      setFoodSection(event.target.value);
    }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: '#d21976' }}>
        <FoodBankIcon />
      </Avatar>
      <Typography component="h1" variant="h5" color={"#d21976"}>
       Update food item
      </Typography>
      <Box component="form" noValidate onSubmit={handleUpdate} autoComplete="on" sx={{ mt: 3 }}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              color='neutral'
              required
              fullWidth
              id="id"
              label="Id"
              name="id"
              value={id || ''}
              InputLabelProps={{ shrink: true}}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              color='neutral'
              required
              fullWidth
              id="name"
              label="Item Name"
              name="name"
              autoComplete="name"
              value={formData.name || ''}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              color='neutral'
              id="outlined-select-currency"
              fullWidth
              select
              label="Food Section"
              value={foodSection}
              onChange={changeFoodSection}
            >
              {foodSectionList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              color='neutral'
              required
              fullWidth
              type="number"
              id="ordering_priority"
              name="ordering_priority"
              label="Ordering Priority"
              autoComplete="family-name"
              value={formData.ordering_priority || ''}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              color='neutral'
              required
              fullWidth
              type="number"
              id="price"
              label="Price"
              name="price"
              autoComplete="price"
              value={formData.price.$numberDecimal || ''}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              color='neutral'
              required
              fullWidth
              id="image"
              name="image"
              label="Image"
              autoComplete="Image"
              value={formData.image || ''}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
          <FormControlLabel 
                control={
                <Checkbox 
                  onChange={checkboxChange} 
                  checked={formData.is_available}
                />} 
                label="isAvailable"
                name="is_available"
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              color='neutral'
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2,  }}
              onClick={handleDelete}
              endIcon={<PersonOffRoundedIcon />}
            >
              Delete
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              color='neutral'
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={handleUpdate}
              endIcon={<EventRepeatRoundedIcon />}
            >
              Update
            </Button>
          </Grid>

        </Grid>
      </Box>
    </Box>
  </Container>
  )}

export default FoodItemDocumnetUpdate