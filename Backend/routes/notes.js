const express = require('express');
const router = express.Router();
var fetchuser = require('../middelware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Add a notes
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valide title').isLength({ min: 3 }),
    body('description', 'Enter a valide description').isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednotes = await note.save();
        res.json(savednotes);
    }
    catch (error) {
        res.status(500).send('Some error accored');
    } // Sends the object as a JSON response
});



//get All notes 

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)

});



//Updating Notes
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) {
        newnote.title = title;
    }
    if (description) {
        newnote.description = description;
    }
    if (tag) {
        newnote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.json({ note })
});


//delete node
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Succes": "deleted Sucessfully" })
    }
    catch (error) {
        res.status(500).send('Some error accored');
    }

});







module.exports = router;
