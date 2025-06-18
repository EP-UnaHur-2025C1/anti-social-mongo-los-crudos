const { Router } = require("express")
const { postController } = require("../controllers")
//const { genericMiddleware } = require("../middlewares")
//const { commentSchema, postImagesSchema, postSchema } = require("../schemas")
const route = Router()

route.get("/", postController.getPost)

route.post(
  "/",
  postController.createPost
)

route.post(
  "/:id/images",
  /*genericMiddleware.schemaValidator(postImagesSchema),*/
  /*genericMiddleware.validatePost,*/
  /*genericMiddleware.validateUser("userId"),*/
  postController.createImageByPost
)

route.post(
  "/:id/comment",
  /*genericMiddleware.schemaValidator(commentSchema),*/
  /*genericMiddleware.validatePost,*/
  /*genericMiddleware.validateUser("userIdComment"),*/
  postController.createCommentByPost
)

route.post(
  "/:id/addImage",
  /*genericMiddleware.schemaValidator(postImagesSchema),*/
  /*genericMiddleware.validatePost,*/
  /*genericMiddleware.validateUser("userId"),*/
  postController.addImage
)

route.delete(
  "/:id/deleteImage/:imageId",
  /*genericMiddleware.schemaValidator(postImagesSchema),*/
  /*genericMiddleware.validatePost,*/
  /*genericMiddleware.validateImageId,*/
  postController.deleteImage
)

route.get("/:id", postController.getPostById)

route.put("/:id", /*genericMiddleware.validatePost */ postController.updatePost)

route.delete("/:id", /*genericMiddleware.validatePost */ postController.deletePost)

module.exports = route
