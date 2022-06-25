import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton';

const UserPage = () => {
    let params = useParams();
    let room_data = null
    let message_data = null
    let profile_data = null
    let [pfp, setPFP] = useState(null)
    let [banner, setBanner] = useState(null)
    let [activity, setActivity] = useState(null)
    let [header, setHeader] = useState(null)
    let messy = null
    let messy2 = null

    let getUserData = async () => {
        let response = await fetch(`/user/${params.username}`)
        let data = await response.json()
        console.log("get data")
        message_data = data[0]
        room_data = data[1]
        profile_data = data[2]
        console.log(pfp)
        
        spreadActivity()
        render_images()
    }

    let render_images = async () => {
      if (profile_data.pfp !== null){
        setPFP(React.createElement("img", {src: `${profile_data.pfp}`, className: "user-pfp", key:"pfp"}))
        setBanner(React.createElement("img", {src: `${profile_data.banner}`, className:"user-banner", key:"banner"}))
        console.log('rendered')
      } 
      
    }

    let spreadActivity = async () =>{
        if(room_data !== null){
            let mess = [React.createElement("p", {value: "rooms", key:"room"}, "My Rooms: ")]
            for(let i = 0; i < room_data.length; i++){
              mess.push(React.createElement("div", {className:"room-activity", key:i}, 
              React.createElement("div", {className: "room-text", value: room_data[i].name}, `${room_data[i].name}`),
              React.createElement("div", {className: "room-desc", value: room_data[i].name}, `${room_data[i].description}`)))  
            }
           messy = React.createElement("div", {}, mess)
        }

        if(message_data !== null){
            let mess2 = [React.createElement("p", {value: "messages", key:"mess"}, "Recent Messages: ")]
            for(let i = 0; i < message_data.length; i++){
              mess2.push(React.createElement("div", {className:"message-activity", key:i}, 
              React.createElement("div", {className: "message-text", value: message_data[i].body}, `${message_data[i].body}`),
              React.createElement("div", {className: "message-room", value: message_data[i].body}, `${message_data[i].room}`)))  
            }   
           messy2 = React.createElement("div", {}, mess2)
        }
        let all_data = React.createElement("div", {className:"activityDiv", key:"activity"}, messy, messy2)
        setActivity(all_data)
        //{React.createElement("img", {src: require('./media/default_banner.png')})}
    }

    useEffect(()=>{
        getUserData()
    }, [params.username])
    //<img src="/media/default_banner.png" />
    

    return (
    <div className="profile-page">
      <div className='header-container'>
      <div className='profile-header'>
        {banner}
        {pfp}
        </div>
      </div>
    <div className="profile-content">
    <div className="profile-username">{params.username}</div>
      <div>{activity}</div>
      </div>
      <BackButton/>
    </div>
  )
}

export default UserPage