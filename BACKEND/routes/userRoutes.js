const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
const auth = require("./../middleware/auth");

userRouter
  .route("/")
  .get(userController.getUsers)
  .post(auth, userController.createUser);

userRouter
  .route("/:id")
  .patch(auth, userController.editUser)
  .delete(auth, userController.deleteUser);

userRouter
.route("/signup")
.post(userController.signup);

userRouter
.route("/login")
.post(userController.login);

userRouter
  .route("/logout")
  .get(auth, userController.logout);

userRouter
.route("/loggedIn")
.get(userController.loggedIn);

userRouter
.route("/getName")
.get(userController.getName);

module.exports = userRouter;
