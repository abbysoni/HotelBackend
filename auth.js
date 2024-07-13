const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const Person = require('./models/People')

//passport-local middleware for authentication
passport.use(new LocalStrategy(
    async(Username, Password, done) => {
      try {
        console.log("recieve creds: " + Username + " and " + Password);
        const user = await Person.findOne({ username: Username })
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
      // User.findOne({ username: username }, function (err, user) {
      //   if (err) { return done(err); }
      //   if (!user) { return done(null, false); }
      //   if (!user.verifyPassword(password)) { return done(null, false); }
      //   return done(null, user);
      // });
    }
  ));

  module.exports= passport
