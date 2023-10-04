require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')

const configureDB = require('./config/db')
const routes = require('./config/routes')
const usersCtrl = require('./app/controllers/users-controller')
const notesCtrl = require('./app/controllers/notes-controller')
const { userRegistrationSchema, userLoginSchema } = require('./app/helpers/userValidationSchema')
const noteValidationSchema = require('./app/helpers/noteValidationSchema')
const authenticateUser = require('./app/middlewares/authenticateUser')
const app = express() 
const port = process.env.PORT || 3030

configureDB()
app.use(express.json())
app.use(cors()) 

app.post('/api/users/register', checkSchema(userRegistrationSchema), usersCtrl.register)
app.post('/api/users/login', checkSchema(userLoginSchema), usersCtrl.login)
app.get('/api/users/account', authenticateUser, usersCtrl.account)

app.get('/api/notes', authenticateUser, notesCtrl.list)
app.post('/api/notes', authenticateUser, checkSchema(noteValidationSchema), notesCtrl.create)
app.get('/api/notes/:id', authenticateUser, notesCtrl.show )
app.put('/api/notes/:id', authenticateUser, checkSchema(noteValidationSchema), notesCtrl.update)
app.delete('/api/notes/:id', authenticateUser, notesCtrl.destroy )

app.use('/',routes)

app.listen(port, () => {
    console.log('server running on port', port)
})
