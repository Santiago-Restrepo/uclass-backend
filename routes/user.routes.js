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

router.get('/logged',
    validateToken,
    async (req, res, next) => {
        try {
            if(!req.user) throw boom.unauthorized('Unauthorized');
            res.json({
                ...req.user,
            })
        } catch (error) {
            next(error);
        }
    }
)

// Path: /api/users/roles
router.get("/roles",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const roles = await userController.getRoles();
            res.json(roles);
        } catch (error) {
            next(error);
        }
});


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

// Path: /api/users/changePassword

router.put("/changePassword", 
    validateToken,
    async (req, res, next) => {
        try {
            const body = req.body;
            const user = req.user;
            if(user) {
                body.userId = user.id;
            }
            const userUpdated = await userController.changePassword(body);
            res.json(userUpdated);
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
    async (req, res, next) => {
        try {
            const user = req.user;
            const userId = req.params.id;
            if(user.id !== userId) throw boom.unauthorized('Unauthorized');
            const userDeleted = await userController.delete(req.params.id);
            res.json(userDeleted);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
