import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate, Link} from "react-router-dom";
import BackButton from '../components/BackButton';
import ProfileIcon from '../components/ProfileIcon';
import AuthContext from '../context/AuthContext';



const RoomPage = () => {
    /*let noteId = match.params.id*/
    let params = useParams();
    let nav = useNavigate();
    let [rooms, setRoom] = useState(null)
    let [messages, setMessages] = useState(null)
    let [m2, setM2] = useState([])
    let {user} = useContext(AuthContext)
    let [messageList, setMessageList] = useState([])
    let [messageBox, setMessageBox] = useState("")
    let [editOn, setEditOn] = useState(false)
    let [oldMessage, setOldMessage] = useState("")
    let [participants, setParticipants] = useState(null)

    useEffect(()=>{
        getRoom()
    }, [params.id])

    let spreadMessages = (m)=>{
      if(m !== null){
        let mess = [React.createElement("p", {value: "Messages", key:"mess"}, "Messages: ")]
        for(let i = 0; i < m.length; i++){
          mess.push(React.createElement("div", {className:"messageDiv", key:i},
          <ProfileIcon user={m[i].user} />,
          React.createElement("div", {className: "messageText", value: m[i].body}, `${m[i].user} : ${m[i].body}`),
          React.createElement("button", {className: "messageDel", onClick: () => handleEdit(m[i].body) }, "edit"),
          React.createElement("button", {className: "messageDel", onClick: () => deleteMessage(m[i].body) }, "delete")
          ))  
        }
       
       let messy = React.createElement("div", {}, mess)
       setMessageList(messy)
      }
    }

    let spreadParticipants = (m) => {
      if(m !== null){
        let mess = [React.createElement("p", {value: "Participants", key:"parts"}, "Participants: ")]
        let participantMap = new Map();
        for(let i = 0; i < m.length; i++){
          if(participantMap.has(m[i].user) !== true){
            participantMap.set(m[i].user, i)  
          }
        }

        participantMap.forEach((value, key, map) => {
          mess.push(React.createElement("div", {className:"participantDiv", key:value}, 
          <ProfileIcon user={key}/>,
          React.createElement("div", {className: "participantName", value: key}, `${key}`),
          )) 
        })
       
       let messy = React.createElement("div", {}, mess)
       setParticipants(messy)
      }
    }

    let handleEdit = async (original) => {
      // We want to switch the input from the input box to edit mode so first we want to fill it with the current text,
      // then we want to allow them to edit the content.
      setEditOn(true)
      setMessageBox(original)
      setOldMessage(original)

    }

    let handleChangeBox = (e) => {
      //console.log(e)
      setMessageBox(e)
    }
    
    const handleMessage = async (e)=>{
      if (editOn === false){ 
        let message = await fetch(`/room/${params.id}/`, {
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            user: user.username,
            body: e,
          })
        })
        const j = await message.json()
      }

      else{
        let message = await fetch(`/room/${params.id}/`, {
          method:"PUT",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            user: user.username,
            original: oldMessage,
            input: e,
          })
        })
        const j = await message.json()
      }
      window.location.reload()
    
    }

    let getRoom = async ()=> {
        if(params.id === 'new') return
        let response = await fetch(`/room/${params.id}`, {method:"GET"})
        let data = await response.json()
        setMessages(data[1])
        setRoom(data[0])
        spreadMessages(data[1])
        spreadParticipants(data[1])

    }

    let editMessage = async(inp, original) => {
      let message = await fetch(`/room/${params.id}`, {
        method:"PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          user: user.username,
          input: inp,
          message: original
        })
    })
    const j = await message.json()
    window.location.reload()
    }

    let deleteMessage = async(e)=>{
      let message = await fetch(`/room/${params.id}`, {
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          user: user.username,
          message: e
        })
    })
    const j = await message.json()
    window.location.reload()
    }

    let deleteRoom = async ()=> {
      if(rooms.user !== user.username){
        nav("/denied");
        return "No,"
      } 
      
      await fetch(`/room/${params.id}/delete`, {
          method:"DELETE",
          headers:{
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            host: user.username
          })
      })
     nav('/');
    }
    
    let roomstring = `/room/${params.id}/update`
    //let roomstring = '/room/26/update'
    let deletestring = `/room/${params.id}/delete`
  return (
    <div className="room-container">
      <div className="ParticipantsScreen">
        <div className='HostBox'>
          
          <div className='HostName'>{rooms !== null ? <ProfileIcon user={rooms.user}/> : ""}Host: {rooms?.user}</div>
          {participants}  
        </div>
      </div>
    <div className="content-container">
      <div className="rooms-header">
        <h2 className="rooms-title">  
        {rooms?.name}
        </h2>
        <div className='room-description'>{rooms?.description}</div>
        <div>{messageList}</div>
        </div>

        {user.username === rooms?.user ? console.log(roomstring) : null}
        {user.username === rooms?.user ? <Link to={roomstring} className="floating-button">Update</Link> : null}
        {user.username === rooms?.user ? <button onClick={deleteRoom} className="delete-button">Delete</button> : null}
        <input type="text" placeholder='type your message here' className="message-box" onChange={(e) => handleChangeBox(e.target.value)} value={messageBox}/>
        <input onClick ={() => handleMessage(messageBox)} className="submit-button" type='submit' />
        <BackButton/>
    </div>
    </div>
  )
}

export default RoomPage