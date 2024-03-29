const {Router} = require("express");
const authController = require("../controllers/auth.controller");
const passport = require("passport");
const router = Router();
router.post("/signup", async (req, res, next) => {
    try {
        const {user} = req.body;
        const data = await authController.signUp(user);
        res.status(201).json({
            ...data,
            message: "user created"
        });
    } catch (error) {
        next(error);
    }
});

router.post("/signin", async (req, res, next) => {
    try {
        const {user, token} = req.body;
        const cookieDomain = process.env.NODE_ENV === 'production' ? '.uclass.space' : 'localhost';
        let data = {};
        if(token){
            data = await authController.signInwithToken(token);
        }else{
            data = await authController.signIn(user);   
            //Set cookie
            //Frontend domain: frontend.uclass.space
            //Backend domain: backend.uclass.space
        }
        res.cookie('token', data.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: cookieDomain
        });

        res.status(200).json({
            ...data,
            message: "user logged in"
        });
    } catch (error) {
        next(error);
    }
});

router.get("/logout", async (req, res, next) => {
    try {
        const cookieDomain = process.env.NODE_ENV === 'production' ? '.uclass.space' : 'localhost';
        res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: cookieDomain
        });
        res.status(200).json({
            message: "user logged out"
        });
    } catch (error) {
        next(error);
    }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: 'https://uclass-frontend.vercel.app/login', failureMessage: "f" }),
    async (req, res) => {
        // Successful authentication, redirect home.
        const user = req.user;
        const token = await authController.googleLogin(user);
        //Set cookie
        const cookieDomain = process.env.NODE_ENV === 'production' ? '.uclass.space' : 'localhost';
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: cookieDomain
        });
        res.status(200).send(`<!DOCTYPE html>
        <html>
        <head>
            <title>Google Login</title>
        </head>
        <body>
            <script>
                window.opener.postMessage({token: "${token}", name: "${user.name}"}, "*");
                window.close();
            </script>
        </body>
        </html>`);
    }
);
module.exports = router;