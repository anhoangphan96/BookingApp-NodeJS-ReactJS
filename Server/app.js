//Khai báo các biến lấy thư viện, route, app  cần dùng
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/user");
const transactionRoute = require("./routes/transaction");
const hotelRoute = require("./routes/hotel");
const roomRoute = require("./routes/room");
//Config cors
app.use(
  cors({
    origin: [
      process.env.CLIENT_APP_LOCAL,
      process.env.CLIENT_APP_FIREBASE,
      process.env.ADMIN_APP_LOCAL,
      process.env.ADMIN_APP_FIREBASE,
    ],
    method: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(bodyParser.json());
//Config session
app.set("trust proxy", true);
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    proxy: "true",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // thời gian sống của cookie do session gửi trả client-side là 30 ngày
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

app.use("/user", userRoute);
app.use("/transaction", transactionRoute);
app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);

//Connect tời mongodb bằng mongoose connect
mongoose
  .connect(
    "mongodb+srv://anphfx21936:Hoangan512@cluster0.fabhbp4.mongodb.net/bookingApp"
  )
  .then((result) => {
    console.log("connected");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));
