const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    const postData = await Post.findAll({
      order: [
        ['date_created', 'DESC']
      ],
      include: [{
        model: User,
        attributes: { 
          exclude: ['password', 'email'] 
        }
      }],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { posts });
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('signup');
  } catch (err) {
    res.status(404).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    console.log(user);

    //Iterate over the messages array
    const posts = userData.posts.map((post) => post.get({ plain: true }));

    res.render('dashboard', { user, posts });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
