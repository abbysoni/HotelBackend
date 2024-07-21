const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
// const Person = require('../models/People')


// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const user = require('../models/User')
const User = require('../models/User')

//passport-local middleware for authentication
passport.use(new LocalStrategy(
    async(Username, Password, done) => {
      try {
        console.log("recieve creds: " + Username + " and " + Password);
        // const user = await Person.findOne({ username: Username })
        const user = await User.findOne({ username: Username })
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        // const isPasswordMatch = user.password === Password ?true : false;
        const isPasswordMatch = await user.comparePassword(Password);

        if (!isPasswordMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }else{
          return done(null, user);  // successful login
        }
  
      } catch (err) {
        return done(err)
      }
    }
  ));

//  passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   }, async (token, tokenSecret, profile, done) => {
//     try {
//       console.log("Google profile: ", profile);
//       const email = profile.emails ? profile.emails[0].value : undefined;
//       const displayName = profile.displayName || '';
//       // const user = await Person.findOrCreate({ googleId: profile.id }, {
//         const result = await User.findOrCreate({ googleId: profile.id }, {
//           displayName: displayName,
//           email: email
//         });
//         const user = result.doc;
//         return done(null, user);
//     } catch (err) {
//       done(err,null);
//     }
//   }));

  module.exports= passport
