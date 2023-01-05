import React from 'react'
import { useParams } from 'react-router-dom'

import UserDocumentList from './userDocuments/UserDocumentList'
import FoodSectionDocumentList from './foodSectionDocuments/FoodSectionDocumentList'
import FoodItemDocumentList from './foodItemDocuments/FoodItemDocumentList'

const AdminDocumentList = () => {
    const { model } = useParams()

  return (
    <>
        { model === 'User' &&
          <UserDocumentList model={model} /> }
        
        { model === 'FoodSection' && 
          <FoodSectionDocumentList model={model} />}
        
        { model === 'FoodItem' && 
          <FoodItemDocumentList model={model} />}
    </>
  )
}

export default AdminDocumentList