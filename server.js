const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT|| 3000
const db = require('./db')
const passport= require('./auth')



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
const localAuth = passport.authenticate('local',{session:false});






















// add logrequest to entry route as variable if app.use(logRequest) is not there already
app.get('/', (req, res) => {
  res.send('Welcome to our hotel')
})


const personRoutes= require('./routes/personRoutes')
app.use('/person',localAuth, personRoutes)

const menuRoutes = require('./routes/menuRoutes')
// removed menu from end points on menuroutes hence this will not work
// app.use('/',menuRoutes)
app.use('/',menuRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})