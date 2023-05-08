const express = require("express");
const app = express();
const router = require("./routes/route");
const cors = require("cors");
const connection = require("./db/connection");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(router);
const start = () => {
  try {
    app.listen(2000, async () => {
      console.log("server is starred at port 2000");
      await connection();
    });
  } catch (error) {
    console.log("error is main app server connection ");
  }
};

start();
