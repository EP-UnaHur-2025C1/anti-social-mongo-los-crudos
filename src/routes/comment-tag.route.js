const { Router } = require("express");
const { commentTagController } = require("../controllers");
//const genericMiddleware = require("../middlewares/generic.middleware");

const route = Router();

route.post(
  "/",
  /*genericMiddleware.validatePostById("postId"),*/
  /*genericMiddleware.validateTag("tagId"),*/
  commentTagController.createCommentTag
);
route.delete(
  "/",
  /*genericMiddleware.validatePostById("postId"),*/
  /*genericMiddleware.validateTag("tagId"),*/
  commentTagController.deleteCommentTag
);
route.get(
  "/post/:id",
  /*genericMiddleware.validatePost,*/
  commentTagController.getCommentTags
);

module.exports = route;
