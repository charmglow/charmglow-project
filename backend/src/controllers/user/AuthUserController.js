const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

async function login(req, res) {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User account not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials!' });
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
      message: `Welcome ${user._doc.name}`,
      token,
      ...user._doc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error..', validation: error });
  }
}
async function signup(req, res) {
  const { email, password, name, shippingAddress } = req.body;
  try {
    const newUser = new User({
      email,
      password,
      name,
      shippingAddress,
    });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already exists' });
    }
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User account has been created successfully',
      user: savedUser,
    });
  } catch (error) {
    const validationError = JSON.parse(error.message);
    res.status(422).json({ error: validationError });
  }
}
const updateShippingAddress = async (req, res) => {
  const { shippingAddress } = req.body;
  try {
    // Find the user by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Update the shipping address fields
    user.shippingAddress.street =
      shippingAddress.street || user.shippingAddress.street;
    user.shippingAddress.city =
      shippingAddress.city || user.shippingAddress.city;
    user.shippingAddress.state =
      shippingAddress.state || user.shippingAddress.state;
    user.shippingAddress.country =
      shippingAddress.country || user.shippingAddress.country;

    // Save the updated user

    const savedUser = await user.save();
    delete savedUser._doc.password;
    return res.status(200).json({
      success: true,
      message: 'Shipping address updated successfully',
      user: { ...user._doc },
    });
  } catch (error) {
    return { success: false, message: error.message };
  }
};
module.exports = { login, signup, updateShippingAddress };
