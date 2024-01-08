import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import users from '../Models/Auth.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "User Already Exists!" });
      alert("User Already Exists!")
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", { expiresIn: '1h' });
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await users.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: "User does not exist." });
      }
  
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: '1h' });
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Something went wrong." });
    }
  };

