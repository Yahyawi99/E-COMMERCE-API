require("express-async-errors");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const express = require("express");
const app = express();

// file upload
const fileUpload = require("express-fileupload");

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// database
const connectDB = require("./db/connect");

// Routes
const authRouter = require("./routes/AuthRoute");
const UserRouter = require("./routes/UserRoute");
const ProductRouter = require("./routes/productRoute");
const ReviewRouter = require("./routes/reviewRoute");
const OrderRouter = require("./routes/orderRoute");

// Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/orders", OrderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Listening on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
