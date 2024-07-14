const express = require('express');
const router = express.Router();

const {jwtAuthMiddleware, generateToken} = require('../config/jwt')

const Person = require('../models/People')

// router.post('/', async (req, res) => {
//     try {
//       const data = req.body
//       console.log("Received data", data);
  
//       const newPerson = new Person(data)
  
//       const response = await newPerson.save();
//       console.log("Data saved", response);
//       res.status(200).json(newPerson)
//     } catch (error) {
//       console.error("Error saving person's data", error)
//       res.status(500).json({ error: "Internal Server Error" })
//     }
// });
  
router.get('/',jwtAuthMiddleware, async(req,res)=>{
    try{
      const data = await Person.find();
      res.status(200).json(data)
    }catch(error) {
      console.log("Error finding person", error);
}});

  


// Update operation via parameter ID
router.put('/:id',async(req,res)=>{
try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new:true, //return the updated document
        runValidators: true, //run mongoose validation
    })

    if (!response){
        return res.status(404).json({error:"Person not found"})
    }

    console.log("Data updated")
    res.status(200).json(response)

} catch (error) {
    console.error("Error saving person's data", error)
    res.status(500).json({ error: "Internal Server Error" })
}
})


// Delete by id
router.delete('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;
    
        const response = await Person.findByIdAndDelete(personId)
        
        if (!response){
            return res.status(404).json({error:"Person not found"})
        }
    
        console.log("DATA DELETED")
        res.status(200).json(response)
    
    } catch (error) {
        console.error("Error deleting data", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.post('/signup',async(req,res)=>{
  try {
    const data = req.body
    console.log("Received data", data);

    const newPerson = new Person(data)

    const response = await newPerson.save();
    console.log("Data saved", response);

    const payload = {
      id:response.id,
      username: response.username
    }

  console.log(JSON.stringify(payload));
    //you can use anything unique to generate token inplace of username
    const token = generateToken(payload);
    console.log("Token is : ", token);

    
    res.status(200).json({response:response, token:token})

  } catch (error) {
    console.error("Error saving person's data", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

router.post('/login', async(req, res) => {
  try {
    //extract username and password from request
    const { username, password } = req.body;

    //find person by username
    const user = await Person.findOne({ username:username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //generate token
    const payload = {
      id: user.id,
      username: user.username
    }

    console.log("Payload for token :", payload);

    const token= generateToken(payload);

    //pass the token
    res.json({token})

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
})


//profile route not working needs to be checked
router.get('/profile',jwtAuthMiddleware, async(req,res)=>{
try {
  console.log("Received request at /profile route");
  const userData = req.user;
  console.log("User Data:", userData);

  const userId = userData.id;
  const user = await Person.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  console.log("User:", user);
  res.status(200).json(user);
  
} catch (error) {
  console.error(error)
    res.status(500).json({ error: "Internal Server Error"});
}
});


//this should be written at last or it will conflict with /profile or other such routes and error will appear
// "error": "invalid work Type"
router.get('/:workType',async(req,res)=>{
  try{
    const workType= req.params.workType; //extract workType from url
    if(workType=='chef'|| workType=='waiter'||workType=='manager')
      {
        const response = await Person.find({ work: workType});
        console.log("Response Fetched");
        res.status(200).json(response);
      }else{
        res.status(404).json({error: "invalid work Type"});
      }
    }catch(err){
      console.error("Error finding person with worktype", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  
})

module.exports = router;