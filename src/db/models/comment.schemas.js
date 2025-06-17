const { mongoose }  = require('../mongoDB')
const { Schema } = mongoose

const commentSchema = new mongoose.Schema({
  comentario: {
    type: Schema.Types.String,
    required: true,
    minlength: 3,
    maxlength: 500, 
  },
  fecha: {
    type: Schema.Types.Date,
    required: true,
  },
  postIdComment: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userIdComment: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const updateCommentSchema = new mongoose.Schema({
  comentario: {
    type: Schema.Types.String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { commentSchema, updateCommentSchema, Comment };
