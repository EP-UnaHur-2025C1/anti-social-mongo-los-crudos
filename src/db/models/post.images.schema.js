
const { mongoose }  = require('../mongoDB')
const { Schema } = mongoose

const postImageSchema = new mongoose.Schema({
  url: {
    type: Schema.Types.String,
    required: true,
    minlength: 10,
    maxlength: 2048,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});
const PostImages = mongoose.model("PostImages", postImageSchema);
module.exports = PostImages;
