const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const verifyOrigin = require("../BackEnd/middleware/verifyOrigin");
const cloudinary = require("cloudinary");
const PORT = process.env.PORT;
const { userRoutes } = require("./Routes/userRoutes");
const { adminRoutes } = require("./Routes/adminRoutes");
const { connection } = require("./services/dataBase");
const utils = require("./utils/utils");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(bodyParser = require("body-parser")),
  //VERIFY ORIGINS
  app.use(cors());
app.use(verifyOrigin);

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

/* error handling for 404 routes */
app.use(function (req, res, next) {
  var err = new Error("request not found");
  err.status = 404;
  res.status(err.status || 500).send({
    errCode: 23,
    errMsg: "request not found",
  });
});
// In prod, dont return stacktrace to the browser

app.listen(PORT || 8000, async (req, res) => {
  console.log("----  app starteed  -----");

  await connection;
  try {
    if (!connection) {
      utils.sendResponse(req, res, 200, "Server Started Running!", [
        { Sucess: "Surver Suceefully Stared Running!" },
      ]);
    }
    console.log(`Port Started Running on Port ${PORT}`);
  } catch (error) {
    if (!connection) {
      utils.sendResponse(req, res, error.errCode, error.errMsg);
    }
  }
});
