const {Router} = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const { validateToken, isAdmin } = require("../middlewares/auth.handler");
// Path: /api/users
router.get("/", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const users = await userController.getAll();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }
);

// Path: /api/users/:id
router.get("/:id", 
    validateToken,
    async (req, res, next) => {
        try {
            const user = await userController.getOne(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/users/:id
router.put("/:id", 
    validateToken,
    isAdmin,
    async (req, res, next) => {    
        try {
            const user = await userController.update(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/users/:id
router.delete("/:id", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const user = await userController.delete(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/roles", async (req, res) => {
    const roles = await userController.getRoles();
    res.json(roles);
});

module.exports = router;
