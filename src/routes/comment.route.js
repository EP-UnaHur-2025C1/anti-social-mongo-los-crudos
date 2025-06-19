const { Router } = require("express");
const { commentController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");
const { Comment } = require("../db/models");
const { commentSchema } = require("../db/models/comment.schemas");

const route = Router();

route.get("/", commentController.getComments);

route.put(
  "/:id",
  genericMiddleware.validateId,
  genericMiddleware.existsModelById(Comment),
  genericMiddleware.schemaValidator(commentSchema),
  commentController.updateCommentById
);

route.delete(
  "/:id",
  genericMiddleware.validateId,
  genericMiddleware.validateComment,
  commentController.deleteCommentById
);

module.exports = route;
