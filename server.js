// dotenv config
require("dotenv").config();

// database connection
const db = require("./db/connection");
const db_url = process.env.MONGO_URI;


// app logic
const app = require("./app");

// Port
const PORT = process.env.PORT || 5000;



// connect to db and starts the server
const StartServer = async () => {
  try {
    await db(db_url).then(() => {
      app.listen(PORT, () => {
        console.log(`Server is connected to database and running on PORT : ${PORT}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer()