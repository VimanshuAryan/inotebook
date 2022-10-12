const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE 1: getting all user notes using: GET "/api/notes/getuser".Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
});

//ROUTE 2: Add a new note using: POST "/api/notes/addnote".Login required
router.get('/addnote',
    body('title', 'Enter a valid title ').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    fetchuser, async (req, res) => {

        try {
            //if there are errors, return bad request along with the errors.
            const errors = validationResult(req);
            const { title, description, tag } = req.body;
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();

            res.json(savedNote);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Some error occured" });

        }});

module.exports = router;