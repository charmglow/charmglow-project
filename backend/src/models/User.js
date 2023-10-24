const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  shippingAddress: {
    street: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      });
    });
  } catch (error) {
    next(error);
  }
});
userSchema.post('validate', function (error, doc, next) {
  if (error) {
    const validationErrors = {};

    for (field in error.errors) {
      validationErrors[field] = error.errors[field].message;
    }

    next(new Error(JSON.stringify(validationErrors)));
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function comparePassword(data) {
  return bcrypt.compare(data, this.password);
};
module.exports = mongoose.model('User', userSchema);
