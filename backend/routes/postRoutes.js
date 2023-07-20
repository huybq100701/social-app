const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("./../models/Post");

// // Route to create a new post
// router.post('/create-post', async (req, res) => {
//   try {
//     const { userid, profilepic, post_pic, postdescription } = req.body;
//     const newPost = new Post({
//       userid,
//       profilepic,
//       post_pic,
//       postdescription,
//     });
//     await newPost.save();
//     res.status(201).json({ message: 'Post created successfully', post: newPost });
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong', details: error.message });
//   }
// });

// Route to get all posts
router.get("/allposts", async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "userId",
      model: "User",
    });
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

//Like ost
router.put("/likepost", async (req, res) => {
  const { postId, userId } = req.body;

  try {
    // Find the post by its id
    const post = await Post.findById(postId);

    // Find the user by their id
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ error: "Post or User not found" });
    }

    // Check if the user's like is not already in the likes array
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    } else {
      res.status(400).json({ message: "Post already liked by this user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});
console.log("Abc");
// Unlike post
router.put("/unlikepost", async (req, res) => {
  console.log("abcs");
  const { postId, userId } = req.body;

  try {
    // Find the post by its id
    const post = await Post.findById(postId);

    // Find the user by their id
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(404).json({ error: "Post or User not found" });
    }

    // Check if the user's like is in the likes array
    const userLikedIndex = post.likes.indexOf(userId);
    if (userLikedIndex !== -1) {
      post.likes.splice(userLikedIndex, 1);
      await post.save();
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      res.status(400).json({ message: "Post is not liked by this user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

// Create post
router.post("/posts", async (req, res) => {
  try {
    const posts = await Post.create(req.body);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

// Route to add a like to a post
router.post("/like-post", async (req, res) => {
  try {
    const { postId, userid } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.likes.push({ userid });
    await post.save();
    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

// Route to add a comment to a post
router.post("/comment-post", async (req, res) => {
  try {
    const { postId, userid, text } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.comments.push({ userid, text });
    await post.save();
    res.status(200).json({ message: "Comment added successfully", post });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

module.exports = router;
