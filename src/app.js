const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
import config from './config'

import contactsRoutes from './routes/contacts.routes'
import authRoutes from './routes/auth.routes'

const app = express()

// Settings
app.set('port', config.port)

// Middlewares
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(morgan('dev'))

app.use(contactsRoutes)
app.use('/auth',authRoutes)

// STATIC FILES
app.use(express.static(path.join(__dirname,'../public')))

app.use((req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

export default app