//Constant variables / packages
const express = require("express");
const rowdyLogger = require("rowdy-logger");
const mongoose = require("mongoose");
const googleRoute = require("./routes/googleAuth");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4040;

//middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://flicbase.netlify.app/",
      "https://flicbase.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const rowdy = rowdyLogger.begin(app);

//connect to database
const db_URL = process.env.MONGO_URL;

mongoose
  .connect(db_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully 🤘🏽");
  })
  .catch((error) => {
    console.log(error);
  });

//routes
app.use("/auth/google", googleRoute);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

//Listen
app.listen(PORT, () => {
  console.log(`flicBase is listening at port: ${PORT}`);
  rowdy.print();
});
