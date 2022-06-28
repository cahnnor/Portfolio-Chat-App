import React, { useState, useEffect, useContext } from 'react'
import CustomDropDown from '../components/CustomDropDown'
import {
  useNavigate
} from "react-router-dom";
import AuthContext from '../context/AuthContext';

const Login = () => {
    let nav = useNavigate()
    let [username, setUserName] = useState("")
    let [password, setPassword] = useState("")
    let [fname, setfname] = useState("")
    let [lname, setlname] = useState("")
    let [register, setRegister] = useState(false)
    let [bday, setBday] = useState("")
    
    let {loginUser} = useContext(AuthContext)

    let handleUsername = async (event) =>{
        setUserName(event)
    }
    let handlePassword = async (event) =>{
        setPassword(event)
    }
    let handleFname = async (event) =>{
        setfname(event)
    }
    let handleLname = async (event) =>{
        setlname(event)
    }

    let handleRegister = async () =>{
        if(register === true){
            setRegister(false)}
        else{
            setRegister(true)
        }
    }
    /*
    let handleBday = async (event) =>{
        setBday(event)
    }
    */
    let handleLogin = async () =>{
          loginUser(username, password, register, fname, lname)
          nav('/')
    }
    /*This whole time I could have just used <form></form> FOR THE WHOLE GOD DAMN THING AND AVOIDED ALL OF THESE USE-STATE BS THINGS ADSFASDCWE.*/
    return (
    <div className='login-container'>
    <div>Login</div>    
    
    <input className='register' type="checkbox" value={register} onChange={handleRegister}/>
    <input className='login-username' type="text" placeholder="username" value={username} onChange={(e) => {handleUsername(e.target.value)}}/>
    <input className='login-password' type="text" placeholder="password" value={password} onChange={(e) => {handlePassword(e.target.value)}}/>

    <input className='login-first-name' type="text" placeholder="first_name" value={fname} onChange={(e) => {handleFname(e.target.value)}}/>
    <input className='login-last-name' type="text" placeholder="last_name" value={lname} onChange={(e) => {handleLname(e.target.value)}}/>
    <div className="button-zone">
    <input className='login-button'type="button" onClick={handleLogin} value="login" />
    <input className='login-button'type="button" onClick={handleLogin} value="Register" />
    </div>
    </div>
  )
}

export default Login

/*
<input type="date" value={bday} onChange={(e) => {handleBday(e.target.value)}}/>
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');
*/

        /*fetch(`/login`, {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: username,
              password: password,
              first_name: fname,
              last_name: lname,
              register: register,
              birthdate: bday
            })
          })*/