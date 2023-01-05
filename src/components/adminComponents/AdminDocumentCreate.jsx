import React from 'react'
import { useParams } from 'react-router-dom'

import UserDocumentCreate from './userDocuments/UserDocumentCreacte'
import FoodSectionDocumentCreate from './foodSectionDocuments/FoodSectionDocumentCreate'
import FoodItemDocumentCreate from './foodItemDocuments/FoodItemDocumentCreate'

const AdminDocumentCreate = () => {
    const {model} = useParams()
  return (
    <>
      { model === 'User' && 
          <UserDocumentCreate model={model} />}
    
      { model === 'FoodSection' && 
          <FoodSectionDocumentCreate model={model} />}

      { model === 'FoodItem' && 
          <FoodItemDocumentCreate model={model} />}
    </>
  )
}

export default AdminDocumentCreate