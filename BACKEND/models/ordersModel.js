const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  cartItems: {
    type: Object
  },
  status: {
    type: String
  },
  registrationDate: {
    type: String
  },
  name: {
    type: String
  },
  // userID: String

});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;