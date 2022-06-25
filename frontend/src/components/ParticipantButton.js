import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as BackArrow } from '../assets/back-arrow.svg'

const ParticipantButton = () => {
  return (
    <Link to="/" className="back-button">
        <BackArrow/>
    </Link>
  )
}

export default ParticipantButton