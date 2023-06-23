const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  title: {
    type: String
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;