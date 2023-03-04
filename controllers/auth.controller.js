const User = require("../models/User");
const passport = require("passport");
const boom = require('@hapi/boom');
const jwt = require("jsonwebtoken");
const {config} = require("dotenv");
config();
class AuthController{
    constructor(){
    }
    jwtSignUser(user){
        const ONE_WEEK = 60 * 60 * 24 * 7;
        return jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: ONE_WEEK
        });
    }
    async signUp(user){
        if(!user){
            throw boom.badRequest("User not found");
        }
        const {name, email, password, repeatPassword} = user;
        if(!name || !email || !password || !repeatPassword) {
            console.log(name, email, password, repeatPassword);
            throw boom.badRequest("All fields are required");
        }
        if(password !== repeatPassword){
            throw boom.badRequest("Passwords don't match");
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw boom.badRequest("User already exists");
        }
        //encrypt password
        const newUser = new User(user);
        await newUser.save();
        return this.jwtSignUser(newUser.toJSON());
    }
    async signIn(user){
        if(!user){
            throw boom.badRequest("User not found");
        }
        const {email, password} = user;
        if(!email || !password){
            throw boom.badRequest("All fields are required");
        }

        const userFound = await User.findOne({email});
        if(!userFound){
            throw boom.badRequest("User not found");
        }
        //De


    }
    async googleLogin(user){
        
        if(!user){
            throw boom.unauthorized("User not found");
        }
        const {email} = user;
        const userFound = await User.findOne({email});
        const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
        });
        return token;
    }



}

// Path: backend\routes\auth.routes.js

module.exports = new AuthController();