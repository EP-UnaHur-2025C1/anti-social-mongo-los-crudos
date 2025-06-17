const { Tag } = require("../db/models")

const getTag = async (req, res) => {
  res.status(200).json(await Tag.find({}))
}

const createTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(201).json(newTag)
  } catch (e) {
    res.status(400).json({ error: e })
  }
}

const deleteTagById = async (req, res) => {
  const { id } = req.params
  const tag = await Tag.findOne({id: id})
  await tag.destroy()
  res.status(204).send()
}

module.exports = {
  getTag,
  createTag,
  deleteTagById,
}
