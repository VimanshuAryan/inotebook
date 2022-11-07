import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"


    const initialNotes = [
        {
            "_id": "6346bc47acfb3b9de4524f2c",
            "user": "63441381b03e3f716353fcb1",
            "title": "Get Fit",
            "description": "Workout everyday",
            "tag": "public",
            "date": "2022-10-12T13:08:23.026Z",
            "__v": 0
        }];

    const [notes, setNotes] = useState(initialNotes);

    // Get all notes
    const getNotes = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        
        setNotes(json);
    }


    // Create/add a note
    const addNote = async (title, description, tag) => {
        //TODO: API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = response.json();
        setNotes(notes.concat(note));
    };

    // Remove/delete a note
    const deleteNote = async (id) => {
        // TODO: Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };

    // Update/edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        // logic for client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag; 
              break; 
            }
          }  
          setNotes(newNotes);
        }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;