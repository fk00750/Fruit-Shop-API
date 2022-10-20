const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes/index");
const path = require("path");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const app = express();

// app.get('/', (req,res) => {
//     res.send("Welcome")
// })

app.use("/", express.static(path.join(__dirname, "public")));

// parse json data
app.use(express.json());
// app.use(helmet({
//     crossOriginEmbedderPolicy: false
// }));
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// app.use(xss());
// // Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);

module.exports = app;
