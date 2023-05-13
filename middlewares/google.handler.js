const passport = require('passport');
const User = require('../models/User');
const Role = require('../models/Role');
const {config} = require('dotenv');
config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: "https://uclass-backend.vercel.app/api/auth/google/callback"
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async function(accessToken, refreshToken, profile, done) {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const photo = profile.photos[0].value;
        //Only let users with @elpoli.edu.co email
        if(!email.includes("@elpoli.edu.co")){
            return done(null, false, {message: "Only @elpoli.edu.co emails are allowed"});
        }
        //Find user in mongo by googleId
        const googleUser = await User.findOne({googleId});
        if(!googleUser){
            //Find user in mongo by email
            const emailUser = await User.findOne({email});
            if(!emailUser){
                //Create new user
                const role = await Role.findOne({name: "user"});
                const newUser = new User({
                    googleId,
                    email,
                    name,
                    photo,
                    roles: [
                        role._id
                    ]
                });
                await newUser.save();
                done(null, newUser);
            }else{
                //Update user
                emailUser.googleId = googleId;
                await emailUser.save();
                done(null, emailUser);
            }
        }else{
            done(null, googleUser);
        }
    }
));

passport.serializeUser(function(user, done) {
done(null, user);
});
  
passport.deserializeUser(function(user, done) {
done(null, user);
});