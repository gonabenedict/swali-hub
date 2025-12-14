import 'dotenv/config';
import mongoose from "mongoose";
import User from "../models/UserModels.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRES_IN = '24h';
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
             });    
        }
        if(!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }
        const exists = await User.findOne({ email }).lean();
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Email already in use"
            });
        }

        const newId = new mongoose.Types.ObjectId();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            _id: newId,
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();

        if (!JWT_SECRET) throw new Error("JWT_SECRET is not in server");

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id.toString(),
                name: newUser.name,
                email: newUser.email
            }
        });
    }
    catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

// LOGIN
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        } 
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

            return res.status(201).json({
                success: true,
                message: "User logged in successfully",
                token,
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email
                
                }
            });
    }
   catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}