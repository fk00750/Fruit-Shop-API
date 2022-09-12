const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes/index");
const path = require("path");

const app = express();

// app.get('/', (req,res) => {
//     res.send("Welcome")
// })

app.use("/", express.static(path.join(__dirname, "public")));

// parse json data
app.use(express.json());
app.use("/api", routes);
app.use('/uploads', express.static('./uploads'))

app.use(errorHandler);

module.exports = app;
