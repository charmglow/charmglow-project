const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function login(req, res) {
  const { username, password, email } = req.body;
  console.log(req.body);
  try {
    if (!(username || email) || !password) {
      return res
        .status(422)
        .json({ message: 'Username and password are required fields.' });
    }
    const user = await User.findOne().or([{ username }, { email }]);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      },
    );
    delete user._doc.password;
    res.json({
      message: 'User login successfully',
      token,
      ...user._doc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', validation: error });
  }
}
async function signup(req, res) {
  const { username, email, password, name } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      password,
      name,
    });
    await newUser.validate();
    const existingUser = await User.findOne().or([{ username }, { email }]);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Username or email already exists' });
    }
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User account has been created successfully',
      user: savedUser,
    });
  } catch (error) {
    const validationError = JSON.parse(error.message);
    res.status(422).json({ message: validationError });
  }
}

module.exports = { login, signup };
