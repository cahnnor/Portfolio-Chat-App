import React from 'react'
import { useNavigate } from  'react-router-dom'
const PermissionDenied = () => {
    let nav = useNavigate()
    let goHome = async () =>{
        nav('/')
    }
  return (
    <div>
        <p>You do not have permission to access this page, if this room belongs to you make sure you sign in to update/delete this room.</p>
        <input onClick={goHome} className="submit-button" type='submit' value='Go Home' />
    </div>
  )
}

export default PermissionDenied