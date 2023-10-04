const Note = require('../models/note-model');
const { validationResult } = require('express-validator');
const _ = require('lodash'); 

const notesCtrl = {};

notesCtrl.list = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

notesCtrl.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const body = _.pick(req.body, ['title', 'body']);

        const note = new Note({ ...body, userId: req.userId });
        await note.save();
        res.status(201).json({ message: 'Note created successfully', note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

notesCtrl.show = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await Note.findOne({ _id: id, userId: req.userId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

notesCtrl.update = async (req, res) => {
    const id = req.params.id;
    const { title, body } = req.body;
    try {
        const note = await Note.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { title, body },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ message: 'Note updated successfully', note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

notesCtrl.destroy = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await Note.findOneAndDelete({ _id: id, userId: req.userId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = notesCtrl;
