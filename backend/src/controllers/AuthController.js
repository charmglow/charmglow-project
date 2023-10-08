const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function login(req, res) {
  const { password, email } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msgStatus: 'User account not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msgStatus: 'Invalid credentials!' });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
    );
    delete user._doc.password;
    res.json({
      msgStatus: 'User login successfully',
      token,
      ...user._doc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msgStatus: 'Server error', validation: error });
  }
}
async function signup(req, res) {
  console.log(req.body);
  const { email, password, name } = req.body;
  try {
    const newUser = new User({
      email,
      password,
      name,
    });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msgStatus: 'Email is already exists' });
    }
    const savedUser = await newUser.save();

    res.status(201).json({
      msgStatus: 'User account has been created successfully',
      user: savedUser,
    });
  } catch (error) {
    const validationError = JSON.parse(error.message);
    res.status(422).json({ msgStatus: validationError });
  }
}

module.exports = { login, signup };
