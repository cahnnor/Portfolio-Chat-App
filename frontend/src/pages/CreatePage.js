import React, { useState, useEffect,useContext } from 'react'
import CustomDropDown from '../components/CustomDropDown'
import {
  useNavigate
} from "react-router-dom";
import AuthContext from '../context/AuthContext';


const CreatePage = () => {  
    let {user} = useContext(AuthContext)
    let nav = useNavigate()
    let [name, setName] = useState("")
    let [topic, setTopic] = useState("")
    let [description, setDescription] = useState("")
    let [dState, setDState] = useState({activeElementType: "dropdown"})
    let [topics, setTopics] = useState([])


    useEffect(()=>{
      getTopics()
    })

    let handleTopic = (event) =>{
      setTopic(event)

      if(event === "custom"){
        setDState({activeElementType: "input"})
        setTopic("")
      }
      
  }
    
    let handleDesc = (event) =>{
      setDescription(event)
      
  }
    let handleChange = (event) =>{
      setName(event)
      
  }
  let createRoom = async () => {
      fetch(`/create-room`, {
          method:"POST",
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

  let getTopics = async ()=>{
    let response = await fetch(`/topics`)
    let data = await response.json()
    setTopics(data)
    
}
  /* 
    On the submit button we need a handleSubmit function to make a POST request to the server containing name, topic, and description.
  */
  return (
    <div className="create-page-container">
        <div className='dropdown-container'>Topic: <CustomDropDown value={topic} onChangeValue={(e) => {handleTopic(e.target.value)}}  activeElementType={dState} topics={topics}/></div>
        <div className='new-room-name'>Name: <input className="text-field" onChange={(e) => {handleChange(e.target.value) }} type='text' placeholder='room-name' value={name}/></div> 
        <div className='description-container'>
        Description: <textarea className="description" onChange={(e) => {handleDesc(e.target.value) }} type='text' placeholder='Describe the room' value={description}/>
        </div>
        <input onClick={createRoom} className="submit-button" type='submit' value='Submit' />
        
    </div>
  )
}

export default CreatePage