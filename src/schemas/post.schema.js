const Joi = require("joi");

const postSchema = Joi.object({
  contenido: Joi.string().required().max(2000).messages({
    "any.required": "El contenido es obligatorio",
    "string.empty": "El contenido no puede estar vacío",
    "string.max": "El contenido debe tener como máximo {#limit} caracteres",
  }),
  userId: Joi.string().hex().length(24).required().messages({
    "string.hex": "El userId debe ser un ObjectId válido",
    "string.length": "El userId debe tener 24 caracteres",
    "any.required": "El userId es obligatorio",
  }),
});

module.exports = postSchema;
