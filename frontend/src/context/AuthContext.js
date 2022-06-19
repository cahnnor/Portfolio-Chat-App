import {createContext, useState, useEffect} from 'react'
import jwt_decode from "jwt-decode";
//import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    //console.log(jwt_decode(localStorage.getItem('authTokens')))
    //let [authTokens, setAuthTokens] = useState(null)
    //let [user, setUser] = useState(null)
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    //let nav = useNavigate()
    
    let loginUser = async (username, password, register=false, first_name="", last_name="") =>{
        /*event.preventDefault()*/
        if(register === true){
            let response1 = await fetch(`/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'username': username, 'password': password, 'register':register, 'first_name': first_name, 'last_name':last_name})
            })
            
        }

        let response = await fetch(`/token`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username':username, 'password':password})
        })

        let data = await response.json()
            if (response.status === 200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                //nav('/')
                
            }else{
                alert('something went wrong')
            }

    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () =>{
        console.log("update called.")
        let response = await fetch(`/token/refresh`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'refresh':authTokens.refresh})
        })

        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(()=> {
        
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, 240000)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}