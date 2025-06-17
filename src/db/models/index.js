const userSchema = require("./user.schema");
const postSchema = require("./post.schema");
const tagSchema = require("./tag.schema");
const { commentSchema, updateCommentSchema, Comment } = require("./comment.schemas");

const postImagesSchema = require("./post.images.schema");

module.exports = {
  userSchema,
  postSchema,
  commentSchema,
  postImagesSchema,
  updateCommentSchema,
  tagSchema,
  Comment
};
