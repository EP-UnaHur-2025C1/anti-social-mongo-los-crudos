const { Post, Tag } = require("../db/models")

const createCommentTag = async (req, res) => {
  const { postId, tagId } = req.body
  try {
    const post = await Post.findOne({id: postId})
    const tag = await Tag.findOne({id: tagId})

    await post.addTag(tag)
    res.status(200).json({ message: "Tag creado con exito" })
  } catch (error) {
    console.error("Error al crear el tag:", error)
    res.status(500).json({ message: error.message })
  }
}
const deleteCommentTag = async (req, res) => {
  const { postId, tagId } = req.body
  try {
    const post = await Post.findOne({id: postId})
    const tag = await Tag.findOne({id: tagId})
    await post.removeTag(tag)
    res.status(200).json({ message: "Tag eliminado con exito" })
  } catch (error) {
    console.error("Error al eliminar el tag:", error)
    res.status(500).json({ message: error.message })
  }
}

const getCommentTags = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findOne({id: id }) //agregar documento embebido

    res.status(200).json(post)
  } catch (error) {
    console.error("Error al obtener los tags:", error)
    res.status(500).json({ message: error.message })
  }
}
module.exports = {
  createCommentTag,
  deleteCommentTag,
  getCommentTags,
}
