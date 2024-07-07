const mongoose = require('mongoose');

//define the person schema object
const personSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    } ,
    age:Number,
    work:{
        type:String,
        enum:['chef','waiter','manager']
    },
    mobile:Number,
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    }

});

//Create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;