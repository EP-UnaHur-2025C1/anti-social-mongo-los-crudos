const Joi = require("joi");

const tagSchema = Joi.object({
  nombreEtiqueta: Joi.string().required().max(20).messages({
    "any.required": "El contenido es obligatorio",
    "string.empty": "El contenido no puede estar vacío",
    "string.max": "username debe tener como maximo {#limit} caractes",
  }),
});

module.exports = tagSchema;
