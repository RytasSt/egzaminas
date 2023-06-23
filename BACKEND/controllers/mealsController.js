const Meals = require("../models/mealsModel");
const mongoose = require('mongoose');

exports.getMeals = (req, res) => {
//   const userEmail = req.email;

    try {
        // Meals.find({ email: userEmail })
        Meals.find(req.query)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => res.status(404).json({ error: "Bad request query" }));
    } catch {
        res.status(500).json({ error: "Get request failed, please try again" });
    }
};

exports.getMealsById = (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'Invalid meals ID' });
  }
  Meals.findById(id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: 'Meals not found' });
      }
      res.status(200).json(doc);
    })
    .catch((error) => res.status(500).json(error));
};


exports.deleteMeals = (req, res) => {
    let { id } = req.params;
    Meals.findByIdAndDelete(id)
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.editMeals = (req, res) => {
    let { id } = req.params;
    Meals.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((error) => res.status(404).json(error));
};

exports.createMeals = (req, res) => {
    let { title, description, menu, id } = req.body;
    // let email = req.email;

    let meals = new Meals({
      title: title,
      description: description,
      menu: menu,
      // picture: picture,
      id: id
    //   email: email
    });
    meals.save().then((doc) => {
      res.status(200).json(doc);
    });
  };
  