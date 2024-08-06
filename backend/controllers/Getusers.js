const UserSchema = require('../models/UserSchema');

exports.getUsers = async (req,res)=>{
    try{
        const Users = await UserSchema.find()
        res.send(Users)
      
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}