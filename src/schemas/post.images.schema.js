const Joi = require("joi");
const postImageSchema = Joi.object({
  url: Joi.string().uri().min(10).max(2048).required().messages({
    "string.uri": "La URL debe ser válida",
    "any.required": "La URL es obligatoria",
  }),
  userId: Joi.string().hex().length(24).required().messages({
    "string.hex": "El userId debe ser un ObjectId válido",
    "string.length": "El userId debe tener 24 caracteres",
    "any.required": "El userId es obligatorio",
  }),
});

module.exports = postImageSchema;
