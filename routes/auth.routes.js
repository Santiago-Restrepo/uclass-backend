const {Router} = require("express");
const authController = require("../controllers/auth.controller");
const passport = require("passport");
const router = Router();
router.post("/signup", (req, res) => {
    res.send("signup");
});

router.post("/signin", (req, res) => {
    res.send("signin");
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
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