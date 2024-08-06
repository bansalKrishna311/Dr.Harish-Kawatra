const mongoose = require('mongoose');
require('dotenv').config();

exports.dbconnect= async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("Database connected successfully")
    }
    catch(err){
        console.log("Error in connecting database")
    }
}