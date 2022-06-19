import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

const ProfileIcon = (user) => {
    
    let profile_data = null
    let [pfp, setPFP] = useState(null)
    
    useEffect(()=> {
        render_images()
      }, [])
    /*
    let checkAuth = async () => {
        let response = await fetch(`/check-log`, {method:'GET',  headers:{'Content-Type': 'application/json'}})
        let data = await response.json()
        render_images()
  
      }
    */
    let render_images = async () => {
        let response = await fetch(`/user/${user.user}`)
        let data = await response.json()
        profile_data = data[2]
        if (profile_data.pfp !== null){
          setPFP(React.createElement("img", {src: `${profile_data.pfp}`, className: "user-pfp-homepage", key:"pfp"}))
        } 
        
    }
    let userPage = `/user/${user.user}`

  return (
    <Link to={userPage} className='pfp-container2'>{pfp}</Link>
  )
}

export default ProfileIcon