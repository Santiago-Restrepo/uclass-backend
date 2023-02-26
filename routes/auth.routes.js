const {Router} = require("express");
const authController = require("../controllers/auth.controller");
const router = Router();

router.post("/signup", (req, res) => {
    res.send("signup");
});

router.post("/signin", (req, res) => {
    res.send("signin");
});

module.exports = router;