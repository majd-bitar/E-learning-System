import User from "../models/userModel.js"
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

//register user
const registerUser = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const user = new User((name,email,password,role));
        await user.save();

        res.status(201).json({message:"User registered successfully"});
    }catch(e){
        console.log(e);
        res.status(500).json({message:e.message});
    }
};

//login user
const loginUser = async (req,res)=>{
    try{
        const {email,password}= req.body;

        const user = await User.findOne({email});

        if(!user || !await(user.matchPassword(password))){
            return res.status(401).json({message:"invalid username or password"});
        }

        const token = jwt.sign({id:user._id, role:user.role},jwtSecret);
        res.json({token:token})

    }catch(e){res.status(500).json({message:e.message});}
};

export default{registerUser,loginUser};