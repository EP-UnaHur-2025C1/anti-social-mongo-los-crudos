const { Router } = require("express");
const { commentController } = require("../controllers");
//const { genericMiddleware } = require("../middlewares");
//const { updateCommentSchema } = require("../schemas");
const route = Router();

route.get("/", commentController.getComments);

route.put(
  "/:id",
  /*genericMiddleware.schemaValidator(updateCommentSchema),*/
  commentController.updateCommentById
);

route.delete(
  "/:id",
  /*genericMiddleware.validateComment,*/
  commentController.deleteCommentById
);

module.exports = route;
