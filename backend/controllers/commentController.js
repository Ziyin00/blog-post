const Comment = require('../models/Comment')

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body
    const { postId } = req.params
    const userId = req.user.id

    const comment = await Comment.create({
      text,
      post: postId,
      user: userId
    })

    res.status(201).json({ message: 'Comment added', comment })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')

    res.json(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
