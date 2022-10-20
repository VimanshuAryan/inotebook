import React,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const initialNotes = [
        {
            "_id": "6346bc47acfb3b9de4524f2c",
            "user": "63441381b03e3f716353fcb1",
            "title": "Get Fit",
            "description": "Workout everyday",
            "tag": "public",
            "date": "2022-10-12T13:08:23.026Z",
            "__v": 0
        },
        {
            "_id": "6346bce10ce19119dab8a6b8",
            "user": "63441381b03e3f716353fcb1",
            "title": "Get Fit",
            "description": "Workout everyday",
            "tag": "public",
            "date": "2022-10-12T13:10:57.537Z",
            "__v": 0
        },
        {
            "_id": "6346bce10ce19119dab8a6bc8",
            "user": "63441381b03e3f716353fcb1",
            "title": "Get Fit",
            "description": "Workout everyday",
            "tag": "public",
            "date": "2022-10-12T13:10:57.537Z",
            "__v": 0
        },
        {
            "_id": "6346bce10ce19119dab8a6bs8",
            "user": "63441381b03e3f716353fcb1",
            "title": "Get Fit",
            "description": "Workout everyday",
            "tag": "public",
            "date": "2022-10-12T13:10:57.537Z",
            "__v": 0
        },
        {
            "_id": "6346bce10ce19119dawb8a6b8",
            "user": "63441381b03e3f716353fcb1",
            "title": "Get Fit",
            "description": "Workout everyday",
            "tag": "public",
            "date": "2022-10-12T13:10:57.537Z",
            "__v": 0
        },
        {
            "_id": "6346bce10ce19119dajb8a6b8",
            "user": "63441381b03e3f716353fcb1",
            "title": "Get Fit",
            "description": "Workout everyday",
            "tag": "public",
            "date": "2022-10-12T13:10:57.537Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(initialNotes);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;