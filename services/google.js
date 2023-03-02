const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const {config} = require("dotenv");
const { parseGoogleProfile } = require('../lib/functions');
config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existingGoogleUser = await User.findOne({ googleId: profile.id });
            if (!existingGoogleUser) {
                const parsedProfile = parseGoogleProfile(profile);
                const existingEmailUser = await User.findOne({ email: parsedProfile.email });
                if (existingEmailUser) {
                    existingEmailUser.googleId = profile.id;
                    existingEmailUser.provider = "google";
                    existingEmailUser.photo = parsedProfile.photo;
                    existingEmailUser.save();
                    return done(null, existingEmailUser);
                }else{
                    const newUser = await User.create(parsedProfile);
                    return done(null, newUser);
                }
            } else {
                return done(null, existingGoogleUser);
            }
        } catch (error) {
            return done(error, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
}); 


