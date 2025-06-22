const { mongoose } = require("../mongoDB");
const { Schema } = mongoose;

const schemaPost = new mongoose.Schema({
  contenido: {
    type: Schema.Types.String,
    required: true,
    maxlength: 2000,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});
const Post = mongoose.model("Post", schemaPost);
module.exports = Post;
