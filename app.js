const express = require("express");
const productRoutes = require("./routes/productRoutes");
const { connectDb } = require("./configs/db");
require("dotenv").config();

const app = express();
app.use(express.json()); // Add this line to parse JSON bodies

const port = 4000;
connectDb(process.env.MONGO_URL);
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
