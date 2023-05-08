const UserModel = require("../model/userSchema");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "Plz fill the data correctly" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: hashPassword });
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Plz fill the data correctly" });
    }

    const verifyemail = await UserModel.findOne({ email: email });

    if (verifyemail) {
      const passMatch = await bcrypt.compare(password, verifyemail.password);

      if (!passMatch) {
        res.status(400).json({ message: "Invalid credentials" });
      } else {
        res.status(200).json({ message: "Login Succesfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credintials" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { register, login };
