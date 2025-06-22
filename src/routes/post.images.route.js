const { Router } = require("express");
const { postImagesController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");

const route = Router();

route.get("/", postImagesController.getImages);

route.get(
  "/:id",
  genericMiddleware.validatePost,
  postImagesController.getImagesByPost
);

//se crea en la ruta post

//se elimina en la ruta post

module.exports = route;
