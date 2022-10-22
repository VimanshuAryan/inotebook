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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0NDEzODFiMDNlM2Y3MTYzNTNmY2IxIn0sImlhdCI6MTY2NTU1OTY1NX0.zlRcRfsG4GA7311mGa_iclYyMgiCtgHWFfqgvECjm3w'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0NDEzODFiMDNlM2Y3MTYzNTNmY2IxIn0sImlhdCI6MTY2NTU1OTY1NX0.zlRcRfsG4GA7311mGa_iclYyMgiCtgHWFfqgvECjm3w'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        const note = {
            "_id": "6346bce10ce19119dajb8a6b8",
            "user": "63441381b03e3f716353fcb1",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-10-12T13:10:57.537Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    };

    // Remove/delete a note
    const deleteNote = async (id) => {
        // TODO: Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0NDEzODFiMDNlM2Y3MTYzNTNmY2IxIn0sImlhdCI6MTY2NTU1OTY1NX0.zlRcRfsG4GA7311mGa_iclYyMgiCtgHWFfqgvECjm3w'
            },
        });

        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    };

    // Update/edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0NDEzODFiMDNlM2Y3MTYzNTNmY2IxIn0sImlhdCI6MTY2NTU1OTY1NX0.zlRcRfsG4GA7311mGa_iclYyMgiCtgHWFfqgvECjm3w'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        // logic for client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];

            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;