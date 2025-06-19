const { Router } = require("express");
const { postImagesController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");
const { postImagesSchema } = require("../schemas");

const route = Router();

route.get("/", postImagesController.getImages);

route.get(
  "/:id",
  genericMiddleware.validatePost,
  postImagesController.getImagesByPost
);

//se crea en la ruta post

route.delete(
  "/:id",
  genericMiddleware.validatePost,
  postImagesController.deleteImageById
);

module.exports = route;
