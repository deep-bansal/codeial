const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get(
  '/profile/:id',
  passport.checkAuthentication,
  usersController.profile
);
router.get('/signin', usersController.signIn);
router.get('/signup', usersController.signUp);
router.post('/create', usersController.create);
router.post('/update/:id', usersController.update);

router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/users/signin' }),
  usersController.createSession
);

router.get('/signout', usersController.signout);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/signin' }),
  usersController.createSession
);
module.exports = router;
