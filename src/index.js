const express = require('express')
const cors = require('cors')
const path = require('path')
import config from './config'

import contactsRoutes from './routes/contacts.routes'

const app = express()

// Settings
app.set('port', config.port)

// Middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(contactsRoutes)

// STATIC FILES
app.use(express.static(path.join(__dirname,'../public')))

app.use((req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.listen(app.get('port'))

console.log('Server on port', app.get('port'))

