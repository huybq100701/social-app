const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.post('/setprofilepic', async (req, res) => {
  const { email, profilepic } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ error: 'Invalid Credentials' });
    }
    user.profilepic = profilepic;
    await user.save();
    res.json({ message: 'Profile picture updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/addpost', async (req, res) => {
  const { email, post, postdescription } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ error: 'Invalid Credentials' });
    }
    user.posts.push({ post, postdescription, likes: [], comments: [] });
    await user.save();
    res.json({ message: 'Post added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getposts', async (req, res) => {
  try {
    const users = await User.find().select('username profilepic posts');
    const posts = users.flatMap((user) =>
      user.posts.map((post) => ({
        username: user.username,
        profile_image: user.profilepic,
        post_pic: post.post,
        post_description: post.postdescription,
        likes: post.likes,
        comments: post.comments
      }))
    );
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/addcomment', async (req, res) => {
  const { email, postId, userId, comment } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ error: 'Invalid Credentials' });
    }

    const post = user.posts.id(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ userId, comment });
    await user.save();

    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/likepost', async (req, res) => {
  const { email, postId, userId } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ error: 'Invalid Credentials' });
    }

    const post = user.posts.id(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likedIndex = post.likes.indexOf(userId);
    if (likedIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likedIndex, 1);
    }

    await user.save();

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.post('/likepost', async (req, res) => {
//   try {
//     const { userId, postId } = req.body;

//     const user = await User.findById(userId);
//     console.log(user)
//     const {posts} = user;
//     const {likes} = posts;
//     console.log(likes)
//     // const newPosts = []
//     // if (posts.includes(postId)){
//     //   newPosts = posts.filter((id) => id != postId)
//     // } else {
//     //   newPosts = posts.push(postId)
//     // }
//     // const newUser = {
//     //   ...user,
//     //   posts: newPosts
//     // }
//     // await User.save(newUser)
//     return res.json(likes);

//   } catch (error) {
    
//   }
// })



module.exports = router;
