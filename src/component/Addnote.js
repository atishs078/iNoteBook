import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import colorContext from '../context/color/colorContext';

const Addnote = (props) => {

    const context = useContext(noteContext);
    const color=useContext(colorContext);
    const {toggelMode, mode, modeText, textColor,buttonColor} = color;
    const { notes, addnote,set } = context;
    const [note, setnotes] = useState({ title: "", description: "" });
    const [newTextcolor, setnewTextColor] = useState(textColor);
    
        // if(newTextcolor==='white'){
        //     setnewTextColor('black')
        // }else{
        //     setnewTextColor('white')
        // }
    
    const handelClick = (e1) => {
        
        e1.preventDefault();
        if(note.title.length<=3){
            alert("Title Should be more than 3 characters")
            return;
        }
        else if(note.description.length<=5){
            alert("Description Should be more than 5 character");
            return;
        }
        else{
        const isNoteAdded=addnote(note.title,note.description,note.tag)
        if(isNoteAdded){
            alert("Note added Succesfully");
            setnotes({
                title:"",
                description:"",
                tag:""
            })      
           
            return;
        }else{
            alert("Something went wrong");
        }
        }  
        

    }



    const handelOnchange = (e) => {

        setnotes({
            ...note,[e.target.name]:e.target.value
        })
    }
   
   

    return (
        <>
            <div className={`container my-3 text-${textColor} `}>
                <h1 >Add Note </h1>
                <div className="container my-5">
                    <form>
                        <div className="mb-3 ">
                            <label htmlFor="Title" className="form-label">Title</label>
                            <input type="text" className="form-control" name="title" id="title" value={ note.title }aria-describedby="title" onChange={handelOnchange} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="Description" className="form-label" >Description</label>
                            <input type="text" className="form-control" name="description" id="Description" value={note.description} onChange={handelOnchange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Tag" className="form-label" >Tag</label>
                            <input type="text" className="form-control" name="tag" id="tag" onChange={handelOnchange} />
                        </div>
                        {/* <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
                        <button type="submit" onClick={handelClick} className={`btn btn-outline-${buttonColor}`}>Add Note</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addnote
