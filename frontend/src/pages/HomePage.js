import React, { useContext, useState, useEffect } from 'react'
import { useSearchParams , useNavigate, Link} from "react-router-dom";
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import CustomSearchBar from '../components/SearchBar'
import Logout from '../components/Logout'
import AuthContext from '../context/AuthContext';
import ProfileIcon from '../components/ProfileIcon';

const HomePage = () => {

    let [rooms, setRooms] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();
    let [search, setSearch] = useState("");
    let {user} = useContext(AuthContext) 

    let q = searchParams.get('q')
    if (q === null) q = ""
    
    let [topics, setTopics] = useState([])
    
    let profile_data = null
    let [pfp, setPFP] = useState(null)
    


    useEffect(()=> {
      getRooms()
      getTopics()
      checkAuth()
    }, [])

    let getTopics = async ()=>{
      let response = await fetch(`/topics`, {method:'GET',  headers:{'Content-Type': 'application/json'}})
      let data = await response.json()
      setTopics(data)
      
    }
    
    let userSearch = async (event) =>{
      if(q === null){
        q = ""
      } 
      setSearchParams({q: event})
      q = event
      getRooms()
    }

    let getRooms = async () => {
      if (searchParams.get('q') === null) setSearchParams({q: ""})
      if(q === null){
        q = ""
      }
      
      let response = await fetch(`/room/?q=${q}`, {method:'GET',  headers:{'Content-Type': 'application/json'}})
      let data = await response.json()
      setRooms(data)
    }

    let render_images = async () => {
      let response = await fetch(`/user/${user.username}`)
      let data = await response.json()
      profile_data = data[2]
      if (profile_data.pfp !== null){
        setPFP(React.createElement("img", {src: `${profile_data.pfp}`, className: "user-pfp-homepage", key:"pfp"}))
        console.log('rendered')
      } 
      
    }

    let checkAuth = async () => {
      let response = await fetch(`/check-log`, {method:'GET',  headers:{'Content-Type': 'application/json'}})
      let data = await response.json()
      render_images()

    }

    let makeSideBar = (topics) =>{
      if (topics !== null){
        topics.map((topic) => <option key={topic?.value} value={topic?.value}>{topic?.label}</option>)
        
        let tops = [React.createElement("button", {value: "all", key: "all", className:"topic-button", onClick: () => {userSearch("")}}, "All Topics")]
        for (const [key, value] of Object.entries(topics)) {
          let val = value.id;
          let inner = value.name;
          tops.push(React.createElement("button", {value: inner, key: key, className:"topic-button", onClick: () => {userSearch(inner)}}, inner))
        }
        let bar = React.createElement("div", {className:"bar"}, tops)
        return bar
      }
      return ""
    }

    const makeHeader = () => {
      //let userBox = React.createElement("div", {className: "userBox"}, "no user")
      let bar = null;
      let userBox = null;
      let userLink = `/user/${user.username}`
      if (user !== null){
        
        let userBox = React.createElement("div", {className: "userBox"}, user.username)
        let bar = React.createElement("div", {className: "home-header"}, userBox)
        return (<Link className="home-header" to={userLink}>{userBox}</Link>)
      }
      return ""
    }

    return (
        <div className="home-container">
        <div className='topics-container'>
        
        {makeSideBar(topics)}
        </div>
        <div className="homepage-header-container">
        <div className="header-divider">
          <CustomSearchBar value={q} onChangeValue = {(e) => {userSearch(e.target.value)}}/>
          <ProfileIcon user={user.username} />
          {makeHeader()} <Logout />
         
        </div>
        
        </div>
        <div className="roomshome">
        <div className="rooms-header">
          
          <h3 className="rooms-title">Rooms <span className="rooms-count">{rooms.length}</span> </h3>
          
          
        </div>
          <div className="rooms-list">
            </div>
                <div className="rooms-list">

                {rooms.map((room, index) => (            
                    <ListItem key={index} room={room}/> 
                )
                )}
                
            </div>
        
        </div>
        <AddButton />
        </div>
  )
}

export default HomePage

/*
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