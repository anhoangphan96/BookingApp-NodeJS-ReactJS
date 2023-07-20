const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const userRoute = require("./routes/user");
const homepageRoute = require("./routes/homepage");
const detailRoute = require("./routes/detailpage");
const transactionRoute = require("./routes/transaction");
app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(userRoute);
app.use("/home", homepageRoute);
app.use("/detail", detailRoute);
app.use("/transaction", transactionRoute);
mongoose
  .connect(
    "mongodb+srv://anphfx21936:Hoangan512@cluster0.fabhbp4.mongodb.net/bookingApp"
  )
  .then((result) => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => console.log(err));
