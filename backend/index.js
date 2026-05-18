const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { dbConnection } = require('./api/dbConfig')


const app = express()
dbConnection();

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true, // Permite enviar cookies y encabezados de autenticación
    }
))
app.use(express.static('public'))

// READING AND PARSING OF BODY REQUEST
app.use(express.json({ limit: '50mb' }))

// ROUTES
app.use('/api/auth', require('./routes/routes.auth'))
app.use('/api/videos', require('./routes/routes.videos'))
app.use('/api/favourites', require('./routes/routes.favourites'))


// REQUESTS LISTENING
app.listen(process.env.PORT, () => {
    console.log(`SERVER LISTENING OKAY ON PORT ${process.env.PORT}`)
})