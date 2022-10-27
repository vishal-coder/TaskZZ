import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).send("All inputs are required");
    }

    const dBUserByEmail = await User.findOne({ username: username });

    if (!dBUserByEmail) {
      return res
        .status(401)
        .send({ message: "Invalid Credentials", success: false });
    }

    const isPasswordMathced = await bcrypt.compare(
      password,
      dBUserByEmail.password
    );

    if (!isPasswordMathced) {
      return res
        .status(401)
        .send({ message: "Invalid Credentials", success: false });
    }

    var token = jwt.sign(
      { id: dBUserByEmail._id.toString() },
      process.env.SECRET_KEY
    );
    res.send({
      message: "user logged in successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Please try again later");
  }
};
