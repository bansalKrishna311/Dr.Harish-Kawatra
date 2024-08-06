const bcrypt = require('bcrypt');
const UserSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// signup handler
exports.signup = async (req,res)=>{
    const {name,email,password,role,batch} = req.body;
    try{
        // check if user already exists or not
        const user = await UserSchema.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            })
        }

        // hash password
        let hashpassword;
        try{
            // hashing password
            hashpassword = await bcrypt.hash(password,10);

        }catch(er){
            return res.status(400).json({
                success:false,
                message:"Password hashing failed",
            })
        }

        // create entry for User
        const newUser = new UserSchema({
            name,email,password:hashpassword, role: role?role:"student",
            batch,
        })
    
        newUser.save();
        return res.status(200).json({
            success:true,
            message:"Signup Successful",
        })

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"Signup failed",
        })
    }
}

exports.login = async (req,res)=>{
    const {email,password} = req.body;
    // checking if the email exists in db or not

    const userExist = await UserSchema.findOne({email});
    console.log(userExist)
    if(!userExist){
        return res.status(404).json({
            success:false,
            message:"User not found",
        })
    }
    else if(userExist){
          // checking if the password is correct or not
    const validPassword = await bcrypt.compare(password,userExist.password);
    console.log(validPassword)
    if(!validPassword){
        return res.status(403).json({
            success:false,
            message:"Invalid Password",
        })
    }
    else{
        return res.status(200).json({
            success:true,
            message:"Login Successful",
        })
    }
    }
  

    

}

exports.deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserSchema.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
      const users = await UserSchema.find();
      res.status(200).json({
        success: true,
        message: "user deleted successfully",
          users,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  };