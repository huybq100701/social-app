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

// Like a post
router.post('/likepost', (req, res) => {
  const { email, postdescription } = req.body;
  console.log(email, postdescription);

  if (!email || !postdescription) {
    return res.status(422).json({ error: 'Invalid Credentials' });
  }

  User.findOne({ email }) 
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const post = user.posts.find((post) => post.postdescription === postdescription);
      // console.log("Day la post:",post)
      // console.log("Day la email:",email)
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.likes.includes(email)) {
        return res.status(400).json({ error: 'User already liked the post' });
      }

      post.likes.push(email);
      const newUser = await User.findByIdAndUpdate({_id:user._id},user)
      res.status(200).json({ message: 'Post liked successfully' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Unlike a post
router.post('/unlikepost', (req, res) => {
  const { email, postdescription } = req.body;
  console.log(email, postdescription);

  if (!email || !postdescription) {
    return res.status(422).json({ error: 'Invalid Credentials' });
  }

  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const post = user.posts.find((post) => post.postdescription === postdescription);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const likedIndex = post.likes.indexOf(email);

      if (likedIndex !== -1) {
        // User has already liked the post, so we'll remove the like
        post.likes.splice(likedIndex, 1);
      } else {
        // User has not liked the post, so we'll add the like
        post.likes.push(email);
      }

      const newUser = await User.findByIdAndUpdate(user._id, user);
      res.status(200).json({ message: 'Post unlike status updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
});



module.exports = router;