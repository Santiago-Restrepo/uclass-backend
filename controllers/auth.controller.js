const User = require("../models/User");
const boom = require('@hapi/boom');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {config} = require("dotenv");
const Role = require("../models/Role");
config();
class AuthController{
    constructor(){
        this.roles = [];
    }

    async getRoles(){
        if(this.roles.length > 0){
            return this.roles;
        }
        const roles = await Role.find();
        console.log(roles);
        return roles;
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
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const roles = await Role.find({});
        const userRoleId = roles.find(role => role.name === "user")._id;
        const newUser = new User({
            name,
            email,
            password: hash,
            roles: [userRoleId]
        });
        await newUser.save();
        const token = this.jwtSignUser({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });
        return token;
    }
    async compareAsync(password, hash){
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, isMatch) => {
                if(err){
                    reject(err);
                }
                resolve(isMatch);
            });
        });
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
        const isMatch = await this.compareAsync(password, userFound.password);
        if(!isMatch){
            throw boom.badRequest("Invalid credentials");
        }
        const token = this.jwtSignUser({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email
        });
        return token;
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