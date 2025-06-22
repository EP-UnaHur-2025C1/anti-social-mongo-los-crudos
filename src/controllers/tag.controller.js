const { Tag, Post } = require("../db/models");

const getTag = async (req, res) => {
  res.status(200).json(await Tag.find({}));
};

const createTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const deleteTagById = async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findOne({ _id: id });
  await Tag.deleteOne({ _id: id });
  res.status(200).send({ message: "Tag eliminado correctamente", tag });
};

const getPostsByTag = async (req, res) => {
  const { id } = req.params;
  try {
   
    
    const posts = await Post.find({ tags: id })
      .populate('userId', 'nickName nombre')
      .populate('tags')
      .sort({ createdAt: -1 });
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getTag,
  createTag,
  deleteTagById,
  getPostsByTag,
};
