const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    default: "",
    // required: true
  },
});
console.log("abc");
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("Just before saving before hashing  ", user.password);
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  console.log("Just before saving after hashing  ", user.password);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
