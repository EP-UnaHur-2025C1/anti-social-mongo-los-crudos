const { mongoose }  = require('../mongoDB')
const { Schema } = mongoose


const tagSchema = new mongoose.Schema({
  nombreEtiqueta: {
    type: Schema.Types.String,
    required: true,
    maxlength: 20,
  },

})
const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
