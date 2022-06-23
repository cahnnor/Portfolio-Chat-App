import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg'

const AddButton = () => {
  return (
    <Link to="create-room" className="add-page-button">
        <AddIcon />
    </Link>
  )
}

export default AddButton