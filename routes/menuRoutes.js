const express = require('express');
const router = express.Router();

const Menu = require('../models/Menu');

router.post('/menu', async(req,res)=>{
    try{
      const data = req.body;
      console.log("Received data", data);
  
      const newMenu = new Menu(data);
  
      const Response = await newMenu.save(data);
      console.log("Data saved", Response);
      res.status(200).json(newMenu);
    } catch(error){
      console.error("Error saving menu item's data", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
  
router.get('/',async(req,res)=>{
    try{
      const data = await Menu.find();
      res.status(200).json(data)
    }catch(error) {
      console.log("Error finding person", error);
      res.status(500).json({ error: "Internal Server Error" });
}});

router.get('/:catType',async(req,res)=>{
    try {
        const catType = req.params.catType;
        const data = await Menu.find({category: catType})
        res.status(200).json(data)
        
    } catch (error) {
        console.log("Error finding person", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;