const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3032

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/posts', commentRoutes) // nested under /posts/:postId/comments
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo Error:', err))

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
