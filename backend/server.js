const path = require('path')
const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5001

connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
 }))

// === Body parsers ===
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// === ROUTES ===
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

/*
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get(/./, (req, res) =>
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
)
} else {
  app.get('/', (req, res) => res.send('API running...'))
}*/

// === Error handler ===
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
