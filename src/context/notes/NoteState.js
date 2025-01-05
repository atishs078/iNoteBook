import React, { useState } from "react";
import noteContext from "./noteContext";
import Alert from "../../component/Alert";

const NoteState = (props) => {
  const host = "http://192.168.141.42:5000";
  const notess = []
  const [notes, setnotes] = useState(notess);
  const [alert, setalert] = useState();
  //Add a note

  const getnotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    })
      .catch(err => {
        console.error(err);
      });
    const json = await response.json();
    setnotes(json)

  }





  const addnote = async (title, description, tag) => {
    const note = {
      "user": "df",
      "title": title,
      "description": description,
      "tag": tag,
      "_id": "66faa9b2406860eaa52d80f2",
      "timeStamp": "2024-09-23T13:25:59.706Z",
      "__v": 0
    }
    fetch(`${host}/api/notes/addnote/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    }).catch(err => {
      console.error(err);
    });
    console.log("Adding a new note")
    setnotes(notes.concat(note))

  }



  //Delete a note

  const deletenote = async (id, e) => {

    console.log("Deleting the note " + id);
    fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    }).catch(err => {
      console.error(err);
    });


    const newNote = notes.filter((note) => note._id !== id);
    setnotes(newNote)

  }


  //Edit a Note
  const editnote = async (id, title, description, tag) => {
    fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),


    }).catch(err => {
      console.error(err);
    });
    let newNote = JSON.parse(JSON.stringify(notes)); // Create a deep copy
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) { // Assuming id is used consistently
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setnotes(newNote)

  }
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }


  return (

    <>
      <noteContext.Provider value={{ notes, getnotes, deletenote, addnote, editnote, getnotes, showAlert }}>
        {props.children}
      </noteContext.Provider>
      <Alert alert={alert} />
    </>
  )
}

export default NoteState;
