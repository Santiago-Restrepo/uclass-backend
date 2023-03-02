const {Router} = require("express");
const authController = require("../controllers/auth.controller");
const passport = require("passport");
const router = Router();
const {OAuth2Client} = require('google-auth-library');
const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage',
);
router.post("/signup", (req, res) => {
    res.send("signup");
});

router.post("/signin", (req, res) => {
    res.send("signin");
});

router.post('/google', async (req, res) => {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    console.log(tokens);
    res.json(tokens);
});
module.exports = router;