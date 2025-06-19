const User = require("./user.schema");
const Post = require("./post.schema");
const Tag = require("./tag.schema");
const { Comment } = require("./comment.schemas");
const Post_Images = require("./post.images.schema");

module.exports = {
  User,
  Post,
  Comment,
  Tag,
  Post_Images,
};
