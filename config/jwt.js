const jwt = require('jsonwebtoken');
require('dotenv').config()

//extract the jwt token from the request header
const jwtAuthMiddleware = (req,res,next)=>{
    //first check if the request header have authorization
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: "No token found"});

const token = req.headers.authorization.split(' ')[1];
if(!token) return res.status(401).json({error: "Unauthorized"});
try{
    //Verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user information to the request object
    req.user = decoded;
    next();
}catch(err){
    console.error(err);
    res.status(500).json({error:'Invalid jwt token'});
}};

//function to generate the jwt token
const generateToken = (userData)=>{
    console.log("data recieved at generate token:",userData,process.env.JWT_SECRET,{expiresIn:30000})
    //Generate a new token using userData
   return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};