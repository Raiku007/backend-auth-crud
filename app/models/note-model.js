const mongoose = require('mongoose')
const { Schema, model } = mongoose  

const noteSchema = new Schema({
    title: String, 
    body: String, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Note = model('Note', noteSchema) 
module.exports = Note 
