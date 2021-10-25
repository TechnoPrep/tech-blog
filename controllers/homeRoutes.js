const router = require('express').Router();
const session = require('express-session');
const { Post, User, Comment } = require('../models');
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

    if(req.session.logged_in){
      let session = {
        loggedIn: true
      }
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('home', { posts, session });
      
    } else {
      let session = {
        loggedIn: false
      }

      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('home', { posts, session });
    }

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
      include: [{ 
        model: Post,
         order: [
          ['date_created', 'ASC']
        ], 
      }],
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

router.get('/post/edit/:id', withAuth, async (req, res) => {

  try {

    const postData = await Post.findByPk(req.params.id, {
      where: {
      user_id: req.session.user_id,
      },
    })

    const post = postData.get({ plain: true });

    console.log(post);

    res.render('editPost', { post } )

  } catch (err) {
    res.status(400).json(err);
  }

});

router.get('/comment/edit/:id', withAuth, async (req, res) => {

  try {

    const commentData = await Comment.findByPk(req.params.id, {
      where: {
      user_id: req.session.user_id,
      },
    })

    const comment = commentData.get({ plain: true });

    res.render('editComment', { comment } )

  } catch (err) {
    res.status(400).json(err);
  }

});

router.get('/comment/add/:id', withAuth, async (req, res) => {

  try {

    const post = {
      id: req.params.id
    }

    console.log(post);

    res.render('newComment', { post })
    
  } catch (err) {
    res.status(400).json(err);
  }

});

router.get('/post/new', withAuth, async (req, res) => {

  try {

    res.render('newPost')
    
  } catch (err) {
    res.status(400).json(err);
  }

});

router.get('/post/:id', async (req, res) => {

  try {

    const postData = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: { exclude: ['password'] }
      }],
    })

    const commentData = await Comment.findAll({
      order: [
        ['date_created', 'DESC']
      ],
      where: {
        post_id: req.params.id
      },
      include: [{
        model: User,
        attributes: { exclude: ['password'] }
      }],
    })

    const session = req.session

    console.log(session);

    const post = await postData.get({ plain: true });

    const comments =  commentData.map((comment) => comment.get({ plain: true }))

    res.render('postComments', { comments, post, session } )

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
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
