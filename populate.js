// dotenv config
require("dotenv").config();

const db = require("./db/connection");
const db_url = process.env.MONGO_URI;

// app logic
const app = require("./app");

// Port
const PORT = process.env.PORT || 5000;

// product
// const product = require("./models/product");
const fruitFarm = require('./models/geoJson')

// const fruits = require("./fruits.json");
const fruits = require("./fruitFarm.json");

const StartServer = async () => {
  try {
    await db(db_url);
    console.log("connected");
    await fruitFarm.deleteMany();
    console.log("Deleted !!!!");
    await fruitFarm.create(fruits.map(fruit => {
      return fruit
    }));
    console.log("Created !!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

StartServer();
