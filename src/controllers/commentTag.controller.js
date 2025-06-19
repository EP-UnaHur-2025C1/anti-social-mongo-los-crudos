const Post = require("../db/models/post.schema")
const Tag = require("../db/models/tag.schema")

const createCommentTag = async (req, res) => {
  const { postId, tagId } = req.body
  try {
    const post = await Post.findById(postId)
    const tag = await Tag.findById(tagId)

    if (!post || !tag) {
      return res.status(404).json({ message: "Post o Tag no encontrado" })
    }

    if (!post.tags.includes(tagId)) {
      post.tags.push(tagId)
      await post.save()
      res.status(200).json({ message: "Tag asociado con éxito" })
    } else {
      res.status(400).json({ message: "El tag ya está asociado a este post" })
    }
  } catch (error) {
    console.error("Error al asociar el tag:", error)
    res.status(500).json({ message: error.message })
  }
}

const deleteCommentTag = async (req, res) => {
  const { postId, tagId } = req.body
  try {
    const post = await Post.findById(postId)
    
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" })
    }

    post.tags = post.tags.filter(tag => tag.toString() !== tagId)
    await post.save()
    res.status(200).json({ message: "Tag eliminado con éxito" })
  } catch (error) {
    console.error("Error al eliminar el tag:", error)
    res.status(500).json({ message: error.message })
  }
}

const getCommentTags = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id).populate('tags', 'nombreEtiqueta -_id')
    
    if (!post) {
      return res.status(404).json({ message: "Post no encontrado" })
    }

    res.status(200).json(post.tags)
  } catch (error) {
    console.log("Error al obtener los tags:", error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createCommentTag,
  deleteCommentTag,
  getCommentTags,
}
