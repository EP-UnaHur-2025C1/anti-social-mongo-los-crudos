const { mongoose } = require("../mongoDB");
const { Schema } = mongoose;
require('dotenv').config()
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


commentSchema.virtual("active").get(function () {
  const ahora = new Date();
  const tiempoTranscurrido = ahora - this.fecha;
  const mesesTranscurridos = tiempoTranscurrido / (1000 * 60 * 60 * 24 * 30.44); // 
  return mesesTranscurridos < process.env.TIEMPO_COMENTARIO_VISIBLE; 
});


commentSchema.set("toJSON", { virtuals: true });
commentSchema.set("toObject", { virtuals: true });

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
