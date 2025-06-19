const Joi = require("joi");

const commentSchema = Joi.object({
  comentario: Joi.string().min(3).max(500).required().messages({
    "string.empty": "El comentario no puede estar vacío",
    "string.min": "El comentario debe tener al menos 3 caracteres",
    "string.max": "El comentario no puede tener más de 500 caracteres",
    "any.required": "El comentario es obligatorio",
  }),
  userIdComment: Joi.string().hex().length(24).required().messages({
    "string.hex": "El userIdComment debe ser un ObjectId válido",
    "string.length": "El userIdComment debe tener 24 caracteres",
    "any.required": "El userIdComment es obligatorio",
  }),
});

const updateCommentSchema = Joi.object({
  comentario: Joi.string().min(3).max(500).required().messages({
    "string.empty": "El comentario no puede estar vacío",
    "string.min": "El comentario debe tener al menos 3 caracteres",
    "string.max": "El comentario no puede tener más de 500 caracteres",
    "any.required": "El comentario es obligatorio",
  }),
});

module.exports = { commentSchema, updateCommentSchema };
