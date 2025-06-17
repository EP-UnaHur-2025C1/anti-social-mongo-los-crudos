const { Router } = require("express");
const { userController } = require("../controllers");
//const { genericMiddleware } = require("../middlewares");
//const { User } = require("../db/models");
//const { userSchema } = require("../schemas");

const route = Router();
route.get("/", userController.getUsers);

route.get(
  "/:id",
  
  userController.getUserByNickName
);

route.post(
  "/",
  
  userController.createUser
);

route.put(
  "/:id",
 
  userController.updateUser
);

route.delete(
  "/:id",

  userController.deleteUserByNickName
);

module.exports = route;
