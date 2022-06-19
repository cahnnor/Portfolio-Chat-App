import React, { useState, useEffect, useContext } from 'react'
import CustomDropDown from '../components/CustomDropDown'
import {
  useNavigate,
  useParams
} from "react-router-dom";
import AuthContext from '../context/AuthContext';



const CreatePage = () => {  
    let {user} = useContext(AuthContext)
    let nav = useNavigate()
    let [name, setName] = useState("")
    let [topic, setTopic] = useState("")
    let [description, setDescription] = useState("")
    let [dState, setDState] = useState({activeElementType: "dropdown"})
    let [room, setRoom] = useState("")
    let [topics, setTopics] = useState([])
    let params = useParams();

    useEffect(()=>{
        getRoom()
        getTopics()
    }, [params.id])

    let handleTopic = (event) =>{
      
      setTopic(event)
      /*
        I have an array of the existing topics, I now need to make sure that the array is displayed in the dropdown
      */ 
       
      if(event === "custom"){
        setDState({activeElementType: "input"})
        setTopic("")
      }
      if (event === "dropdown"){
          setDState({activeElementType: "dropdown"})
      }
      
    }
    let handleDesc = (event) =>{
      setDescription(event)
    }
    let handleChange = (event) =>{
      setName(event) 
    }
    let getRoom = async () =>{
        let response = await fetch(`/room/${params.id}`)
        let data = await response.json()
        console.log(data.user)
        if(data.user !== user.username){
          nav("/denied")
        }
        setRoom(data)
        setDescription(data.description)
        setTopic(data.topic)
        setName(data.name)
    }
    let getTopics = async ()=>{
        let response = await fetch(`/topics`)
        let data = await response.json()
        setTopics(data)
        
    }
    
    let updateRoom = async () => {
        fetch(`/room/${params.id}/update`, {
            method:"PUT",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                host: user.username,
                name: name,
                description: description,
                topic: topic
            })
            })
            nav('/')
    }

  return (
    <div>
        
        <div className='dropdown-container'>Topic: <CustomDropDown value={topic} onChangeValue={(e) => {handleTopic(e.target.value)}}  activeElementType={dState}  topics={topics}/></div>
        Name: <input className="text-field" onChange={(e) => {handleChange(e.target.value) }} type='text' placeholder='room-name' value={name}/> <br/>
        <div className='description-container'>
          Description: <input className="description" onChange={(e) => {handleDesc(e.target.value) }} type='text' placeholder='Describe the room' value={description}/>
        </div>
        <input onClick={updateRoom} className="submit-button" type='submit' value='Submit' />
        
    </div>
  )
}

export default CreatePage