//Constant variables / packages
const express = require("express");
const rowdyLogger = require("rowdy-logger");
const mongoose = require("mongoose");
const googleRoute = require("./routes/googleAuth");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4040;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const rowdy = rowdyLogger.begin(app);

app.use("/auth/google", googleRoute);

//connect to database
const db_URL = process.env.MONGO_URL;

mongoose
  .connect(db_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

//routes

app.get("/", (req, res) => {
  res.send({ App: "FlicBase" });
});

app.listen(PORT, () => {
  console.log(`flicBase is listening at port: ${PORT}`);
  rowdy.print();
});
