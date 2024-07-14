const express = require('express')
const passport = require('passport')
const app = express()
require('dotenv').config()
const port = process.env.PORT|| 3000
const db = require('./db')
//for local strategy
require('./config/auth')
//for google login strategy

// const localAuthRoutes = require('./routes/localAuth');
const googleAuthRoutes = require('./routes/googleAuth');
// const profileRoutes = require('./routes/profile');


// Middleware configuration
const logRequest = (req,res,next) => {
  console.log(`Request received at ${new Date().toLocaleString()}: ${req.method} ${req.url}`)
  // console.log(`Request made to ${req.originalUrl}`)
  next() //move on to next phase  
}

app.use(logRequest)


const bodyParser= require('body-parser')
app.use(bodyParser.json())
//this can be replaced with this 
// app.use(express.json())




// need to intialize before using it
app.use(passport.initialize())
app.use(googleAuthRoutes)
// const localAuth = passport.authenticate('local',{session:false});
// const gAuth = passport.authenticate('google',{scope:['https://www.googleapis.com/auth/plus.login']})



// add logrequest to entry route as variable if app.use(logRequest) is not there already
app.get('/', (req, res) => {
  res.send('Welcome to our hotel')
})


const personRoutes= require('./routes/personRoutes')
// app.use('/person',localAuth, personRoutes) to check username and password before entering
app.use('/person', personRoutes)


const menuRoutes = require('./routes/menuRoutes')
// removed menu from end points on menuroutes hence this will not work
// app.use('/',menuRoutes)
app.use('/',menuRoutes);

// const gAuthRoutes = require('./routes/gAuthRoutes')
// app.use('/',gAuth, gAuthRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})