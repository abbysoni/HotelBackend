const express = require('express')
const app = express()

require('dotenv').config()
const port = process.env.PORT|| 3000

const db = require('./db')

const bodyParser= require('body-parser')
app.use(bodyParser.json())
//this can be replaced with this 
// app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to our hotel')
})


const personRoutes= require('./routes/personRoutes')
app.use('/',personRoutes)

const menuRoutes = require('./routes/menuRoutes')
// removed menu from end points on menuroutes hence this will not work
// app.use('/',menuRoutes)
app.use('/menu',menuRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})