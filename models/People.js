// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');


// //define the person schema object
// const personSchema= new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     } ,
//     age:Number,
//     work:{
//         type:String,
//         enum:['chef','waiter','manager']
//     },
//     mobile:Number,
//     email:{
//         type: String,
//         // required: true,
//         // unique: true,
//         // validate: {
//         //     validator: function(v) {
//         //         return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
//         //     },
//         //     message: props => `${props.value} is not a valid email!`
//         // } 
//     },

//     username:{
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password:{
//         type:String,
//         required:true
//     }

// });

// // Pre function middleware
// personSchema.pre('save', async function(next){
//     const person = this;
//     if(!person.isModified('password')) return next();

//     //     {
//     //     person.password = await bcrypt.hash(person.password, 10);
//     // }
//     try {
//         //more the no more will be conplexity
//         const salt = await bcrypt.genSalt(10);
//         //hash password
//         const hashedPassword = await bcrypt.hash(person.password, salt)

//         person.password = hashedPassword;

//         next();
//     } catch (err) {
//         return next(err);
//     }
// })

// personSchema.methods.comparePassword = async function(candidatePassword){
//     try {
//         const isMatch = await bcrypt.compare(candidatePassword,this.password )
//         //compare function extracts salt from stored(this.password) and use it to hash entered pasword then compare

//         return isMatch;
//     } catch (error) {
//         throw error;
//     }
// }

// //Create person model
// const Person = mongoose.model('Person', personSchema);
// module.exports = Person;