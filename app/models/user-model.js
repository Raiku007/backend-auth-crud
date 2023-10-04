const mongoose = require('mongoose')
const { Schema, model } = mongoose
// userSchema = username, email, password

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User

// 3 types of validation
// client side, express validation, mongoose validation
// Databases: strictly type, JavaScript: Loosely type


// mongoose validation 
// When we have multiple property definition for a field

// username: {
//     type: String
//     required: true
// },
// email: {
//     type: String
//     required: true
// },
// password: {
//     type: String,
//     required: true,
//     minlength: 8
// }