const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGODB_URL}/food-generator`, {
  useNewUrlParser: true,
});