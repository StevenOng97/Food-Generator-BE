const express = require("express");
require("./db/mongoose");
const multer = require("multer");
const sharp = require("sharp");
const Food = require("./models/Food");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const regexFileValidation = /\.(jpg|jpeg|png)$/;
const upload = new multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(regexFileValidation)) {
      return callback(new Error("You can only upload jpg, jpeg and png"));
    }

    callback(undefined, true);
  },
});

app.post(
  "/food",
  upload.single("image"),
  async (req, res) => {
    const { title = "" } = req.body;

    const buffer = await sharp(req.file.buffer)
      // .resize({ width: 1024, height: 768 })
      .png()
      .toBuffer();

    const foodSchema = {
      title,
      image: buffer,
    };

    const food = new Food(foodSchema);

    try {
      await food.save();
      res.send();
    } catch (err) {
      throw new Error(err);
    }
  },
  (error, req, res, next) => {
    if (error.message) {
      throw new Error(error.message);
    }
  }
);

app.get("/food", async (req, res) => {
  const regex = req.query.title ? new RegExp(`\^${req.query.title}`, "i") : "";

  const foods = await Food.find({ title: { $regex: regex } });

  if (foods.length === 0) {
    return res
      .status(404)
      .send({ message: `There is no food matches your request` });
  }

  res.send(foods);
});

app.get("/food/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);

  res.send(food);
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
