const express = require("express");
const menuController = require("../controllers/menuController");
const menuRouter = express.Router();
const auth = require("./../middleware/auth");

menuRouter
  .route("/")
  .get(auth, menuController.getMenu)
  .post(auth, menuController.createMenu);

menuRouter
  .route("/:id")
  .patch(auth, menuController.editMenu)
  .delete(auth, menuController.deleteMenu)
  .get(auth, menuController.getMenuById);

module.exports = menuRouter;
