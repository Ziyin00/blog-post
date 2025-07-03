const express = require('express')
const router = express.Router()
const { addComment, getCommentsByPost } = require('../controllers/commentController')
const { authMiddleware } = require('../middlewares/authMiddleware')

// POST /api/posts/:postId/comments
router.post('/:postId/comments', authMiddleware, addComment)

// GET /api/posts/:postId/comments
router.get('/:postId/comments', getCommentsByPost)

module.exports = router
