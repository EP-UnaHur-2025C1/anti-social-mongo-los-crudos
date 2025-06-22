const { Router } = require("express");
const { postController } = require("../controllers");
const { genericMiddleware } = require("../middlewares");
const { Post } = require("../db/models");
const { commentSchema, postSchema, postImagesSchema } = require("../schemas");

const route = Router();

route.get("/", postController.getPost);

route.post(
  "/",
  genericMiddleware.schemaValidator(postSchema),
  genericMiddleware.validateUser("userId"),
  postController.createPost
);

route.post(
  "/:id/images",
  genericMiddleware.validateId,
  genericMiddleware.schemaValidator(postImagesSchema),
  genericMiddleware.validatePost,
  genericMiddleware.validateUser("userId"),
  postController.createImageByPost
);

route.post(
  "/:id/comment",
  genericMiddleware.validateId,
  genericMiddleware.schemaValidator(commentSchema),
  genericMiddleware.validatePost,
  genericMiddleware.validateUser("userIdComment"),
  postController.createCommentByPost
);

route.post(
  "/:id/addImage",
  genericMiddleware.validateId,
  genericMiddleware.schemaValidator(postImagesSchema),
  genericMiddleware.validatePost,
  genericMiddleware.validateUser("userId"),
  postController.addImage
);

route.delete(
  "/:id/deleteImage/:imageId",
  genericMiddleware.validateId,
  genericMiddleware.validatePost,
  genericMiddleware.validateImageId,
  postController.deleteImage
);

route.get(
  "/:id",
  genericMiddleware.validateId,
  genericMiddleware.existsModelById(Post),
  postController.getPostById
);

route.put(
  "/:id",
  genericMiddleware.validateId,
  genericMiddleware.validatePost,
  genericMiddleware.schemaValidator(postSchema),
  postController.updatePost
);

route.delete(
  "/:id",
  genericMiddleware.validateId,
  genericMiddleware.validatePost,
  postController.deletePost
);

route.post(
  "/:id/addTag",
  genericMiddleware.validateId,
  genericMiddleware.validatePost,
  postController.addTagToPost
);

module.exports = route;
