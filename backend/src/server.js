const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')

// load env vars as early as possible
dotenv.config()

app.use(cors())
// parse JSON bodies for POST/PUT requests
app.use(express.json())

const db = require('./config/db')
db()

const ApiRoutes = require('./routes/ApiRoutes')

app.use('/api', ApiRoutes)

app.listen(3000)