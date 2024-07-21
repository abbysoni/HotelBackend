// const express = require('express');
// const passport = require('passport');
// const { generateToken } = require('../config/jwt')
// const router = express.Router();

// router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// router.get('/auth/google/callback',
//    passport.authenticate('google', { session: false, failureRedirect: '/' }),
//  (req, res) => {
//    // User authentication successful
//    if (!req.user) {
//     return res.status(401).json({ error: 'User not found' });
//    }
//   // Create a JWT token using the generateToken function
//   const token = generateToken({ id: req.user._id, displayName: req.user.displayName });
//   res.json({ token });
// });
  
// module.exports = router;