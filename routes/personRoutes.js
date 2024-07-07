const express = require('express');
const router = express.Router();

const Person = require('../models/People')

router.post('/person', async (req, res) => {
    try {
      const data = req.body
      console.log("Received data", data);
  
      const newPerson = new Person(data)
  
      const response = await newPerson.save();
      console.log("Data saved", response);
      res.status(200).json(newPerson)
    } catch (error) {
      console.error("Error saving person's data", error)
      res.status(500).json({ error: "Internal Server Error" })
    }
});
  
router.get('/person',async(req,res)=>{
    try{
      const data = await Person.find();
      res.status(200).json(data)
    }catch(error) {
      console.log("Error finding person", error);
}});

  
router.get('/person/:workType',async(req,res)=>{
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

// Update operation via parameter ID
router.put('/person/:id',async(req,res)=>{
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
router.delete('/person/:id',async(req,res)=>{
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


module.exports = router;