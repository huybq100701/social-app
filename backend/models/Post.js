const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  profilepic: {
    type: String,
    default: "",
    // required: true
  },
  post_pic: {
    type: String,
    default: "",
  },
  postdescription: {
    type: String,
    default: "",
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

console.log("Abc");

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
