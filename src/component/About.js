import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const About = (props) => {
    let a =useContext(noteContext)

  return (
    <>
     <p>{props.mode}</p>

    </>
    )
}

export default About
