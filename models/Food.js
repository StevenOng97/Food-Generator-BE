const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  image: {
    type: Buffer,
    required: true
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;