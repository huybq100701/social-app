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
router.post('/likepost', async (req, res) => {
  const { _id, email, postdescription, action } = req.body;
  console.log(email, postdescription);

  if (!_id || !email || !postdescription || !action) {
    return res.status(422).json({ error: 'Invalid Credentials' });
  }
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let post;
    if (action === 'allposts') {
      post = user.posts;
    } else {
      post = user.posts.find((post) => post.postdescription === postdescription);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const likedIndex = post.likes.indexOf(email);
      if (action === 'like') {
        if (likedIndex === -1) {
          post.likes.push(email);
        }
      } else if (action === 'unlike') {
        if (likedIndex !== -1) {
          post.likes.splice(likedIndex, 1);
        }
      } else {
        return res.status(400).json({ error: 'Invalid action' });
      }
    }

    await user.save();
    res.status(200).json({ message: `Action '${action}' successful`, post });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//comment
router.post('/commentpost', async (req, res) => {
  const { _id, email, postdescription, comment, action } = req.body;
  console.log(email, postdescription, comment);

  if (!_id || !email || !postdescription || (!comment && action !== 'allposts')) {
    return res.status(422).json({ error: 'Invalid Credentials' });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (action === 'allposts') {
      user.posts.forEach((post) => {
        post.comments.push({ email, comment });
      });
    } else {
      const post = user.posts.find((post) => post.postdescription === postdescription);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      post.comments.push({ email, comment });
    }

    await user.save();
    res.status(200).json({ message: 'Comment added successfully', post });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;