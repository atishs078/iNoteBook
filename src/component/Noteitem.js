import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const Noteitem = (props) => {
  const { notee,updateNote } = props;
  const context = useContext(noteContext);
  const { deletenote,editnote } = context;
  
  let formateddate=new Date(notee.timeStamp);
    
  
  return (
    <>
   
      <div className="col-md-3">
        <div className="card my-3 bg-info mb-3">
          <div className="card-body " >
            <h5 className="card-title bg-warning  p-3"  ><b>Title: <u>{notee.title}</u>  </b></h5>
            <p className="card-text bg-info mb-3"><b>Description: </b>{notee.description}</p>
            <p className="card-text"><b>Tag: </b>{notee.tag}</p>
            <p className='card-text'><b>Date: </b>{formateddate.getDate()}/{formateddate.getMonth()}/{formateddate.getFullYear()}</p>
            <p className='card_text'><b>Time: </b>{formateddate.getHours() }:{formateddate.getMinutes()}:{formateddate.getSeconds()}</p>
            <i className="fa-solid fa-trash" onClick={() => { deletenote(notee._id) }}></i>
            <i className="fa-solid fa-pen-to-square mx-3 " onClick={() => {
              updateNote(notee)
            } }></i>

          </div>
        </div>
      </div>
    </>
  )
}

export default Noteitem
