const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')

// load env vars as early as possible
dotenv.config()
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
]
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
// parse JSON bodies for POST/PUT requests
app.use(express.json())

const db = require('./config/db')
db()

const ApiRoutes = require('./routes/ApiRoutes')

app.use('/api', ApiRoutes)

app.listen(3000)