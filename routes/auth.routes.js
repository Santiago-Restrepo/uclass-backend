const {Router} = require("express");
const authController = require("../controllers/auth.controller");
const passport = require("passport");
const router = Router();
router.post("/signup", async (req, res, next) => {
    try {
        const {user} = req.body;
        const token = await authController.signUp(user);
        res.status(201).json({
            data: token,
            message: "user created"
        });
    } catch (error) {
        next(error);
    }
});

router.post("/signin", async (req, res, next) => {
    try {
        const {user} = req.body;
        const token = await authController.signIn(user);
        res.status(200).json({
            data: token,
            message: "user logged in"
        });
    } catch (error) {
        next(error);
    }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:3001/login', failureMessage: true }),
    async (req, res) => {
        // Successful authentication, redirect home.
        const user = req.user;
        const token = await authController.googleLogin(user);
        res.status(200).send(`<!DOCTYPE html>
        <html>
        <head>
            <title>Google Login</title>
        </head>
        <body>

            <script>
                window.opener.postMessage({token: "${token}"}, "*");
                window.close();
            </script>
        </body>
        </html>`);
    }
);
module.exports = router;