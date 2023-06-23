// const ConfirmedOrders = require("../models/confirmedOrdersModel");
// const mongoose = require('mongoose');

// exports.getConfirmedOrders = (req, res) => {
// //   const userEmail = req.email;

//     try {
//         // Menu.find({ email: userEmail })
//         ConfirmedOrders.find(req.query)
//         .then((doc) => {
//             res.status(200).json(doc);
//         })
//         .catch((err) => res.status(404).json({ error: "Bad request query" }));
//     } catch {
//         res.status(500).json({ error: "Get request failed, please try again" });
//     }
// };

// exports.getConfirmedOrderById = (req, res) => {
//   let { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ message: 'Invalid order ID' });
//   }
//   ConfirmedOrders.findById(id)
//     .then((doc) => {
//       if (!doc) {
//         return res.status(404).json({ message: 'Order not found' });
//       }
//       res.status(200).json(doc);
//     })
//     .catch((error) => res.status(500).json(error));
// };


// exports.deleteConfirmedOrder = (req, res) => {
//     let { id } = req.params;
//     ConfirmedOrders.findByIdAndDelete(id)
//     .then((doc) => {
//         res.status(200).json(doc);
//     })
//     .catch((error) => res.status(404).json(error));
// };

// exports.editConfirmedOrder = (req, res) => {
//     let { id } = req.params;
//     ConfirmedOrders.findByIdAndUpdate(id, req.body, {
//         new: true,
//         runValidators: true,
//     })
//     .then((doc) => {
//         res.status(200).json(doc);
//     })
//     .catch((error) => res.status(404).json(error));
// };

// exports.createConfirmedOrders = (req, res) => {
//     let { cartItems } = req.body;
//     // let email = req.email;

//     let confirmedOrders = new ConfirmedOrders({
//       cartItems: cartItems,
//     //   email: email
//     });
//     confirmedOrders.save().then((doc) => {
//       res.status(200).json(doc);
//     });
//   };
  