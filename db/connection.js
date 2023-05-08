const mongoose = require("mongoose");

const connection = async (req, res) => {
  try {
    const url =
      "mongodb+srv://Abhijeet2010:Abhijeet123@database-1.uv48jyg.mongodb.net/user?retryWrites=true&w=majority";
    await mongoose.connect(url);
    console.log("mongoose connected succesfully");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connection;
