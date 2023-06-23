const express = require("express");
const ordersController = require("../controllers/ordersController");
const ordersRouter = express.Router();
const auth = require("./../middleware/auth");

ordersRouter
  .route("/")
  .get(auth, ordersController.getOrders)
  .post(auth, ordersController.createOrders);

ordersRouter
  .route("/:id")
  .patch(auth, ordersController.editOrder)
  .delete(auth, ordersController.deleteOrder)
  .get(auth, ordersController.getOrderById);

module.exports = ordersRouter;
