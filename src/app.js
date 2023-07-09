const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
import cookieParser from 'cookie-parser'
import config from './config'

import contactsRoutes from './routes/contacts.routes'
import authRoutes from './routes/auth.routes'

const app = express()

// Settings
app.set('port', config.port)

// Asignar el motor de plantillas 
app.set('view engine', 'pug')

// Asignar la carpeta de vistas
app.set('views', path.join(__dirname, '/views'))

// Middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/home', contactsRoutes)
// app.use('/auth',authRoutes)
app.use(authRoutes)


// STATIC FILES
app.use(express.static(path.join(__dirname,'../public')))


// app.use((req, res) => {
//     //res.sendFile(path.join(__dirname,'../public/index.html'))
//     // res.render('index')

//     res.sendFile(path.join(__dirname,'public'))
// })

export default app