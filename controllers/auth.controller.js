const User = require("../models/User");
const passport = require("passport");
const boom = require('@hapi/boom');
const jwt = require("jsonwebtoken");
const {config} = require("dotenv");
config();
class AuthController{
    constructor(){
    }
    login(req, res){
        
        const {email, password} = req.body;
        if(!email || !password){
            throw boom.badRequest("Email and password are required");
        }
        passport.authenticate("local", (err, user) => {
            if(err){
                throw boom.unauthorized(err);
            }
            req.login(user, {session: false}, (err) => {
                if(err){
                    throw boom.unauthorized(err);
                }
                const token = user.generateToken();
                res.status(200).json({token});
            })
        })(req, res);
    }
    signIn(req, res){
        // do something
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