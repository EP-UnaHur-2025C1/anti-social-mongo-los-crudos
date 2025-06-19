const { Comment } = require("../db/models");

const getComments = async (req, res) => {
  res.status(200).json(await Comment.find({}));
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findOne({ _id: id });
  console.log(comment);

  await Comment.deleteOne({ _id: id });
  res.status(200).json(comment);
};

const updateCommentById = async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;
  const comment = await Comment.findOne({ _id: id });
  await comment.updateOne({ comentario });
  res.status(200).json(comment);
};

module.exports = {
  getComments,
  deleteCommentById,
  updateCommentById,
};
