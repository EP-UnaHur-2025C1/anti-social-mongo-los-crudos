const { Post, User, Comment, Tag, Post_Images } = require("../db/models");
const { Types } = require("mongoose");

const validateId = (req, res, next) => {
  const id = req.params.id;
  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Bad Request: El id debe ser un ObjectId válido" });
  }
  next();
};

const validateNickname = async (req, res, next) => {
  const nickname = req.params.id;
  if (!nickname || nickname.length < 8 || nickname.length > 16) {
    return res.status(400).json({
      message: "Bad Request: El nickname debe tener entre 8 y 16 caracteres",
    });
  }
  next();
};

const existsModelById = (modelo) => {
  return async (req, res, next) => {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "El id debe ser un ObjectId válido" });
    }
    const data = await modelo.findById(id);
    if (!data) {
      return res
        .status(404)
        .json({ message: `El id ${id} no se encuentra registrado` });
    }
    next();
  };
};

const schemaValidator = (schema) => {
  return (req, res, next) => {
    const { error, _ } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errores = error.details.map((e) => {
        return { atributo: e.path[0], mensaje: e.message, tipoError: e.type };
      });
      return res.status(400).json({ errores });
    }
    next();
  };
};

const validateUser = (campoIdUsuario = "userId") => {
  return async (req, res, next) => {
    const userId = req.body[campoIdUsuario];
    if (!Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "El userId debe ser un ObjectId válido" });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ message: `Usuario con id: ${userId} no encontrado` });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: `Error al validar usuario con campo ${campoIdUsuario}`,
        error,
      });
    }
  };
};

const validatePost = async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "El id debe ser un ObjectId válido" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: `Post con id: ${id} no encontrado` });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error al validar post", error });
  }
};

const validateComment = async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "El id debe ser un ObjectId válido" });
  }

  try {
    const comentario = await Comment.findById(id);
    if (!comentario) {
      return res
        .status(404)
        .json({ message: `comentario con id: ${id} no encontrado` });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al validar comentario", error });
  }
};

const validateTag = (campoIdtag = "tagId") => {
  return async (req, res, next) => {
    const tagId = req.body[campoIdtag];
    if (!Types.ObjectId.isValid(tagId)) {
      return res
        .status(400)
        .json({ message: "El tagId debe ser un ObjectId válido" });
    }

    try {
      const tag = await Tag.findById(tagId);
      if (!tag) {
        return res
          .status(404)
          .json({ message: `Tag con id: ${tagId} no encontrado` });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: `Error al validar Tag con campo ${campoIdtag}`,
        error,
      });
    }
  };
};

const validatePostById = (campoIdPost = "postId") => {
  return async (req, res, next) => {
    const postId = req.body[campoIdPost];
    if (!Types.ObjectId.isValid(postId)) {
      return res
        .status(400)
        .json({ message: "El postId debe ser un ObjectId válido" });
    }

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res
          .status(404)
          .json({ message: `post con id: ${postId} no encontrado` });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: `Error al validar post con campo ${campoIdPost}`,
        error,
      });
    }
  };
};

const validateImageId = async (req, res, next) => {
  const { imageId } = req.params;
  if (!Types.ObjectId.isValid(imageId)) {
    return res
      .status(400)
      .json({ message: "El imageId debe ser un ObjectId válido" });
  }

  try {
    const image = await Post_Images.findById(imageId);

    if (!image) {
      return res.status(404).json({
        message: "Imagen no encontrada",
      });
    }
    req.image = image;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error al validar la imagen midd", error });
  }
};

module.exports = {
  existsModelById,
  validateId,
  validateNickname,
  schemaValidator,
  validatePost,
  validateUser,
  validateComment,
  validateTag,
  validatePostById,
  validateImageId,
};
