// const express = require('express');
// const jwt = require('jsonwebtoken');

// const router = express.Router();

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// router.get('/profile', authenticateJWT, (req, res) => {
//   res.send(`Hello, user with ID: ${req.user.id}`);
// });

// module.exports = router;
