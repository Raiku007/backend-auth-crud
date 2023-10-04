const User = require('../models/user-model');

const loginEmailSchema = {
  notEmpty: {
    errorMessage: 'Email is required',
  },
  isEmail: {
    errorMessage: 'Email format is invalid',
  },
};

const registerEmailSchema = {
  notEmpty: {
    errorMessage: 'Email is required',
  },
  isEmail: {
    errorMessage: 'Email format is invalid',
  },
  custom: {
    options: async (value) => {
      const user = await User.findOne({ email: value });
      if (!user) {
        return true;
      } else {
        throw new Error('User record exists');
      }
    },
  },
};

const passwordSchema = {
  notEmpty: {
    errorMessage: 'Password is required',
  },
  isLength: {
    options: { min: 8, max: 128 },
    errorMessage: 'Password should be between 8 - 128 characters long',
  },
  matches: {
    options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
    errorMessage: 'Password must contain at least one lowercase letter, one uppercase letter, and one special symbol',
  },
};

const usernameSchema = {
  notEmpty: {
    errorMessage: 'Username is required',
  },
  isLength: {
    options: { min: 3 },
    errorMessage: 'Username should be minimum 3 characters',
  },
};

const userRegistrationSchema = {
  username: usernameSchema,
  email: registerEmailSchema,
  password: passwordSchema,
};

const userLoginSchema = {
  email: loginEmailSchema,
  password: passwordSchema,
};

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
};
