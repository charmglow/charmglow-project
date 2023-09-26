const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
    validate: {
      validator: function (value) {
        const usernameRegex = /^[a-zA-Z0-9._-]+$/;
        return usernameRegex.test(value);
      },
      message: 'Invalid username format',
    },
    unique: true,
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
    minlength: 8,
    validate: {
      validator: function (value) {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        return passwordRegex.test(value);
      },
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character (@ $ ! % * ? &)',
    },
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
  console.log(data);
  console.log(this.password);
  return bcrypt.compare(data, this.password);
};
module.exports = mongoose.model('User', userSchema);
