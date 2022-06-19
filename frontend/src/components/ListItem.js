import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'



let getTime = (room) => {
  return new Date(room.updated).toLocaleDateString()
}

let getName = (room) => {
    let name = room.name
    if(name.length > 45){
      return name.slice(0,45)
    }
    return name
}



const listitem = ({room}) => {
  
  return (
    <Link to={`/room/${room.id}`}>
      <div className="room-list-item">
        <div className="RoomName">{getName(room)}</div>
        <div className="DateHost"><span >{getTime(room)} - {room.host}</span></div>
        <div className="roomTopic"><span> {room.topic} </span></div>
       </div>
    </Link>
  )
}

export default listitem