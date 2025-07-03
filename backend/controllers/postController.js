const Post = require('../models/Post')

exports.createPost = async (req, res) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    const { title, description } = req.body
    const userId = req.user.id

    if (!title || !description || !req.file) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

    const post = await Post.create({
      title,
      description,
      image: imagePath,
      user: userId
    })

    res.status(201).json({ message: 'Post created', post })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}



exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('user', 'name email')
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name email')
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
