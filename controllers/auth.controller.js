const User = require("../models/User");
const passport = require("passport");
const boom = require('@hapi/boom');
const jwt = require("jsonwebtoken");
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
    async googleLogin(req, res){
        console.log(req.user);
        if(!req.user){
            throw boom.unauthorized("User not found");
        }
        const {email} = req.user;
        const user = await User.findOne({email});
        const token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: 60 * 60 * 24
        });
        res.status(200).json({token});
    }



}

// Path: backend\routes\auth.routes.js

module.exports = new AuthController();