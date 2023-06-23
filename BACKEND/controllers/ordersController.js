const Orders = require("../models/ordersModel");
const mongoose = require('mongoose');

exports.getOrders = (req, res) => {
//   const userEmail = req.email;

    try {
        // Menu.find({ email: userEmail })
        Orders.find(req.query)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => res.status(404).json({ error: "Bad request query" }));
    } catch {
        res.status(500).json({ error: "Get request failed, please try again" });
    }
};

exports.getOrderById = (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid order ID' });
  }
  Orders.findById(id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(doc);
    })
    .catch((error) => res.status(500).json(error));
};


exports.deleteOrder = (req, res) => {
    let { id } = req.params;
    Orders.findByIdAndDelete(id)
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.editOrder = (req, res) => {
    let { id } = req.params;
    Orders.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.createOrders = (req, res) => {
    let { cartItems, status, name, registrationDate } = req.body;
    // let name = req.name;

    let orders = new Orders({
      cartItems: cartItems,
      status: status,
      registrationDate: registrationDate,
      name: name
    //   email: email
    });
    orders.save().then((doc) => {
      res.status(200).json(doc);
    });
  };
  