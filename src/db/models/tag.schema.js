const { mongoose }  = require('../mongoDB')
const { Schema } = mongoose


const tagSchema = new mongoose.Schema({
  nombreEtiqueta: {
    type: Schema.Types.String,
    required: true,
    maxlength: 20,
  },

})

module.exports = tagSchema
