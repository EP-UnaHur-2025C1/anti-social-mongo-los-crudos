const Joi = require("joi");
const userSchema = Joi.object({
  nickName: Joi.string().required().min(8).max(16).messages({
    "any.required": "El NickName es obligatorio",
    "string.empty": "El NickName no puede estar vacío",
    "string.min": "username debe tener como mínimo {#limit} caracteres",
    "string.max": "username debe tener como maximo {#limit} caractes",
  }),
  nombre: Joi.string().required().min(4).max(30).messages({
    "any.required": "El nombre es obligatorio",
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener como mínimo {#limit} caracteres",
    "string.max": "El nombre debe tener como máximo {#limit} caracteres",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "El email es obligatorio",
    "string.base": "El email debe ser un texto",
    "string.empty": "El email no puede estar vacío",
    "string.email": "El email debe tener un formato válido",
  }),
  fechaNacimiento: Joi.date().iso().required().messages({
    "any.required": "La fecha de nacimiento es obligatoria",
    "date.format": "La fecha debe estar en formato YYYY-MM-DD",
  }),
});

module.exports = userSchema;
