import React, { useState, useEffect, useContext } from 'react'
import { useSearchParams , useNavigate, Link} from "react-router-dom";
import AuthContext from '../context/AuthContext';


const Logout = () => {
    let {logoutUser} = useContext(AuthContext)
    let nav = useNavigate()
    let handleLogout = async () =>{
        /*fetch(`/logout`, {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({})
          })*/
          logoutUser()
          nav('/login')
    }

    return (
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  )
}

export default Logout