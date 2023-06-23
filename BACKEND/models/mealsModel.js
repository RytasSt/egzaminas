const mongoose = require("mongoose");

const mealsSchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  menu: {
    type: String
  },
  // picture: {
  //   type: String
  // },
  id: {
    type: Number
  }
});

const Meals = mongoose.model("Meals", mealsSchema);

module.exports = Meals;