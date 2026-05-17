const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { searchVideos } = require('./controllers/videosController')


const app = express()


app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true, // Permite enviar cookies y encabezados de autenticación
    }
))
app.use(express.static('public'))

// READING AND PARSING OF BODY REQUEST
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))


// app.get('/api/buscar', async (req, res) => {
//   try {
//     const query = req.query.q || 'Queens of the stone age';
//     const videos = await searchVideos(query);
//     res.json(videos);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener datos de YouTube' });
//   }
// });

// ROUTES
app.use('/api/auth', require('./routes/routes.auth'))
app.use('/api/videos', require('./routes/routes.videos'))
// app.use('/api/banners', require('./routes/banners'))
// app.use('/api/sales', require('./routes/sales'))
// app.use('/api/payments', require('./routes/payments'))
// app.use('/api/categories', require('./routes/categories'))
// app.use('/api/uploads', require('./routes/uploads'))



// REQUESTS LISTENING
app.listen(process.env.PORT, () => {
    console.log(`SERVER LISTENING OKAY ON PORT ${process.env.PORT}`)
})