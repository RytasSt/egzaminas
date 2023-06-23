const express = require("express");
const mealsController = require("../controllers/mealsController");
const mealsRouter = express.Router();
const auth = require("../middleware/auth");

mealsRouter
  .route("/")
  .get(auth, mealsController.getMeals)
  .post(auth, mealsController.createMeals);

mealsRouter
  .route("/:id")
  .patch(auth, mealsController.editMeals)
  .delete(auth, mealsController.deleteMeals)
  .get(auth, mealsController.getMealsById);

module.exports = mealsRouter;
