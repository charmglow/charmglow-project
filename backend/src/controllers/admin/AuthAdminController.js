const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin');

async function loginAdmin(req, res) {
  const { password, email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ msgStatus: 'User account not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msgStatus: 'Invalid credentials!' });
    }
    const token = jwt.sign(
      {
        userId: admin._id,
        email: admin.email,
      },
      process.env.SECRET_KEY_ADMIN,
    );
    delete admin._doc.password;
    res.json({
      msgStatus: `Welcome ${admin._doc.name}`,
      token,
      ...admin._doc,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msgStatus: 'Server error', validation: error });
  }
}
async function signupAdmin(req, res) {
  const { email, password, name } = req.body;
  try {
    const newAdmin = new Admin({
      email,
      password,
      name,
    });
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ msgStatus: 'Email is already exists' });
    }
    const savedAdmin = await newAdmin.save();

    res.status(201).json({
      msgStatus: 'Admin account has been created successfully',
      user: savedAdmin,
    });
  } catch (error) {
    const validationError = JSON.parse(error.message);
    res.status(422).json({ msgStatus: validationError });
  }
}

module.exports = { loginAdmin, signupAdmin };
