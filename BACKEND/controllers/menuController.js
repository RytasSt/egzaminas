const Menu = require("../models/menuModel");
const mongoose = require('mongoose');

exports.getMenu = (req, res) => {
//   const userEmail = req.email;

    try {
        // Menu.find({ email: userEmail })
        Menu.find(req.query)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => res.status(404).json({ error: "Bad request query" }));
    } catch {
        res.status(500).json({ error: "Get request failed, please try again" });
    }
};

exports.getMenuById = (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid menu ID' });
  }
  Menu.findById(id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: 'Menu not found' });
      }
      res.status(200).json(doc);
    })
    .catch((error) => res.status(500).json(error));
};


exports.deleteMenu = (req, res) => {
    let { id } = req.params;
    Menu.findByIdAndDelete(id)
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.editMenu = (req, res) => {
    let { id } = req.params;
    Menu.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.createMenu = (req, res) => {
    let { title, id } = req.body;
    // let email = req.email;

    let menu = new Menu({
      title: title,
    //   email: email
    });
    menu.save().then((doc) => {
      res.status(200).json(doc);
    });
  };
  