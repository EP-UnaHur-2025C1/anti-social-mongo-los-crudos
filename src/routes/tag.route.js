const { Router } = require("express");
const { tagController } = require("../controllers");
const { Tag } = require("../db/models");
const { tagSchema } = require("../schemas");
const { genericMiddleware } = require("../middlewares");
const route = Router();

route.get("/", tagController.getTag);

route.post(
  "/",
  genericMiddleware.schemaValidator(tagSchema),
  tagController.createTag
);

route.delete(
  "/:id",
  genericMiddleware.validateId,
  genericMiddleware.existsModelById(Tag),
  tagController.deleteTagById
);

module.exports = route;
