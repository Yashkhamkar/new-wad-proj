const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadController = require("./controllers/uploadControllers");
const path = require("path");
dotenv.config();
mongoose.set("strictQuery", false);
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", (req, res) => {
//   res.send("gg");
// });
app.use("/images", express.static("public/images"));
app.use("/auth", userRoutes);
app.use("/product", productRoutes);
app.use("/upload", uploadController);
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit();
  }
};
connectDB();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
