import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as BackArrow } from '../assets/back-arrow.svg'

const ParticipantButton = () => {
  let nav = useNavigate();

  return (
    <button onClick={()=> nav(-1)} className="back-button">
        <BackArrow/>
    </button>
  )
}

export default ParticipantButton