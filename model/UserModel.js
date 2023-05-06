const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true],
      minlength: 8
    },
  }
);

// ~ static method to sign up user
userSchema.statics.signup = async function (email, password) {
  // ^ validation
  if (!email || !password) {
    throw new Error('Please enter all fields');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Please enter a valid email address');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must contain: 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long"
    );
  }

  // if exists 
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({
    email,
    password: hash
  });

  return user;
}


// ~ static method to login user
userSchema.statics.login = async function (email, password) {
  // ^ validation
  if(!email || !password) {
    throw new Error('Please enter all fields');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Please enter a valid email address');
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw new Error('User does not exist');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;

}

module.exports = mongoose.model('User', userSchema);