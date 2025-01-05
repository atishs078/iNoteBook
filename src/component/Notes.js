import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import e from 'cors';
import ColorState2 from '../context/color/ColorState2';
import colorContext from '../context/color/colorContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const host = "http://192.168.101.61:5000";
    const context = useContext(noteContext);
    const colorcontext = useContext(colorContext);
    const {textColor}=colorcontext;
    const { notes, showAlert, getnotes, editnote } = context;
    let navigate=useNavigate();
    const [note, setnotes] = useState({ id: "", etitle: "", edescription: "", etag: "", time: "" });
    useEffect(() => {
        if(localStorage.getItem('token')){
        getnotes()}
        else{
            navigate("/login")
        }
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = async (currentNote) => {
        ref.current.click();
        setnotes({
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
            id: currentNote._id,
            time: currentNote.timeStamp

        });
    }
    const handelOnchange = async (e) => {

        setnotes({
            ...note, [e.target.name]: e.target.value
        })
    }
    const onClickHandler = async (e) => {
        console.log("Updating the note...", note);
        if (note.etitle.length <= 3) {
            alert("Title Should be more than 3 characters")
            return;
        }
        else if (note.edescription.length <= 5) {
            alert("Description Should be more than 5 character");
            return;
        }
        else {
            try {
                const isEdit = await editnote(note.id, note.etitle, note.edescription, note.etag);
                if (!isEdit) {
                    alert("Note updated successfully.");


                } else {
                    alert("Failed to update the note.");
                }
            } catch (error) {
                console.error("An error occurred while updating the note:", error);
            }
            refClose.current.click();
        }
    };



    return (
        <>

            <Addnote />


            <button ref={ref} className="btn btn-primary" data-bs-toggle="modal" hidden={true} data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog -dark">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 ">
                                    <label htmlFor="Title" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle} aria-describedby="title" onChange={handelOnchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label" >Description</label>
                                    <input type="text" className="form-control" name="edescription" value={note.edescription} id="eDescription" onChange={handelOnchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Tag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={handelOnchange} />
                                </div>
                            </form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={onClickHandler}>Update Note </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className={`container text-${textColor}`}>
                    <h1>Your Notes</h1>
                </div>

                {

                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} notee={note} />
                    })
                }
            </div>

        </>
    )
}

export default Notes
