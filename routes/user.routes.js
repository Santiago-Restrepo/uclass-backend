const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");


//Roles
router.get("/roles", async (req, res) => {
    const roles = await userController.getRoles();
    res.json(roles);
});

module.exports = router;
    