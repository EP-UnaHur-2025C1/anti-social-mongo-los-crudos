const { tagSchema } = require("../db/models")

const getTag = async (req, res) => {
  res.status(200).json(await Tag.find({}))
}

const createTag = async (req, res) => {
  try {
    const newTag = await tagSchema.create(req.body)
    res.status(201).json(newTag)
  } catch (e) {
    res.status(400).json({ error: e })
  }
}

const deleteTagById = async (req, res) => {
  const { id } = req.params
  const tag = await tagSchema.findOne({_id: id})
  await tagSchema.deleteOne({_id: id})
  res.status(200).send({message: "Tag eliminado correctamente", tag})
}

module.exports = {
  getTag,
  createTag,
  deleteTagById,
}
