const userController = require("./user.controller")
const postController = require("./post.controller")
const tagController = require("./tag.controller")
const postImagesController = require("./post.images.controller")
const commentController = require("./comment.controller")
const commentTagController = require("./commentTag.controller")
module.exports = {
  userController,
  postController,
  tagController,
  postImagesController,
  commentController,
  commentTagController,
}
