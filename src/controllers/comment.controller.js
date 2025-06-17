const { User, Comment } = require("../db/models");

const getComments = async (req, res) => {
  res.status(200).json(
    await Comment.find({})
  );
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findOne({id: id});

  await comment.destroy();
  res.status(200).json(comment);
};

const updateCommentById = async (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;
  const comment = await Comment.findOne({id: id});
  await comment.update({ comentario });
  res.status(200).json(comment);
};

module.exports = {
  getComments,
  deleteCommentById,
  updateCommentById,
};
