import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';

import FoodItemService from '../../../services/FoodItemService'
import FoodSectionService from '../../../services/FoodSectionService';

const FoodItemDocumentList = ({model}) => {
  
  const modelKey = ['Id', 'Name', 'Food section', 'Order priority', 'Price', 'isAvailable']
  const [documentList, setDocumentList] = useState([])
  const [foodSectionList, setFoodSectionList] = useState([])


    const getFoodSectionList = useCallback( async () => {
      try {
        const response = await FoodSectionService.getAll()
        setFoodSectionList(response.data.docList)
      } catch (err) {
        console.log(err);
      }
    }, [])

    const getDocumentList = useCallback( async () => {
        try {
            const response = await FoodItemService.getAll()
            setDocumentList(response.data.docList)
        } catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
      getDocumentList()
      getFoodSectionList()
  }, [getDocumentList, getFoodSectionList])
 
  return (
    <>
    <TableContainer component={Paper} >
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          
          {modelKey.map((item, index) => 
            <TableCell align="center" key={index}> {item} </TableCell>
          )}
          <TableCell align="center" sx={{width: '20px'}}>  </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {documentList.map((item) => ( 
          <TableRow
            key={item._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
            
            <TableCell align="center"> {item._id} </TableCell>
            <TableCell align="center"> {item.name} </TableCell>
            {foodSectionList.map( (option) => option._id === item.food_section && (
              <TableCell align="center" key={option._id}> {option.name} </TableCell>
            ))}
            <TableCell align="center"> {item.ordering_priority} </TableCell>
            <TableCell align="center"> {item.price.$numberDecimal} </TableCell>
            
            {item.is_available === true ?
             <TableCell align="center"> <CheckBoxIcon sx={{color: 'teal'}} /> </TableCell> :
             <TableCell align="center"> <CheckBoxOutlineBlankIcon sx={{color: 'teal'}} /> </TableCell>} 

             <TableCell align="center" sx={{color: 'red'}}>
              <Link to={`/admin/${model}/${item._id}`} key={item._id} style={{textDecoration: 'none', marginTop: '30px', color: 'red'}}>
                Edit  
              </Link> 
            </TableCell>
          
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  <Box sx={{display: 'flex', justifyContent: 'end'}}>
    <Link to={`/admin/${model}/create`} style={{textDecoration: 'none', color: 'white'}}>
   
      <Button color='neutral' variant="contained" endIcon={<NoteAddIcon />} sx={{marginTop: '20px'}} >
        Add food item
      </Button>
    </Link>
  </Box>
  
  </>
  )
}

export default FoodItemDocumentList