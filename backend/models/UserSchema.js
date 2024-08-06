const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        trim:true,
        
    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        enum: ['student','admin'],  
    },
    batch:{
        type: String,
        enum: ['The Uniques', 'academics', 'Super60'],
    }
    
});

module.exports = mongoose.model("User",userSchema);