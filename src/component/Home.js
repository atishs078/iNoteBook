import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';

const Home = (props) => {

  return (

    <>

      <div className="row"> <Notes showAlert={props.showAlert}/></div>
      
       
    </>

  )
}

export default Home

