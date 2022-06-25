import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as BackArrow } from '../assets/back-arrow.svg'

const ParticipantButton = (visible, setvis) => {
  let nav = useNavigate();

  return (
    <button onClick={()=>setvis} className="participant-button">
        <BackArrow/>
    </button>
  )
}

export default ParticipantButton