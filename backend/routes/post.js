const express = require('express')
const router = express.Router()
const { createPost, getAllPosts, getPostById } = require('../controllers/postController')
const { authMiddleware } = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')

// ✅ Use upload.single('image') here
router.post('/', authMiddleware, upload.single('image'), createPost)

router.get('/', getAllPosts)
router.get('/:id', getPostById)

module.exports = router
