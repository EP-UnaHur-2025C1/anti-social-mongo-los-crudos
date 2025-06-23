const { mongoose }  = require('../mongoDB')
const { Schema } = mongoose

const schemaUser = new mongoose.Schema({
  nickName: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 16,
  },
  nombre: {
    type: Schema.Types.String,
    required: true,
    minlength: 4,
    maxlength: 30,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    minlength: 4,
    maxlength: 30,
  },
  fechaNacimiento: {
    type: Schema.Types.Date,
    required: true,
  }
}, { collection: 'user' });

const User = mongoose.model("User", schemaUser);
module.exports = User;
