const {Router} = require("express");
const resourceController = require("../controllers/resource.controller");
const router = Router();
const { validateToken, isAdmin } = require("../middlewares/auth.handler");
// Path: api/resources
router.get("/",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const resources = await resourceController.getAll();
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }
);
// Path: api/resources/subject/:subjectId
router.get("/subject/:subjectId",
    validateToken,
    async (req, res, next) => {
        try {
            const resources = await resourceController.getBySubjectId(req.params.subjectId);
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }
);
// Path: api/resources/user/:userId
router.get("/user/:userId",
    validateToken,
    async (req, res, next) => {
        try {
            const resources = await resourceController.getByUserId(req.params.userId);
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }
);

// Path: api/resources
router.post("/",
    validateToken,
    async (req, res, next) => {
        try {
            const resource = await resourceController.create(req.body);
            res.json(resource);
        } catch (error) {
            next(error);
        }
    }
);

// Path: api/resources/:id
router.put("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const user = req.user;
            const resource = await resourceController.update(req.params.id, req.body, user);
            res.json(resource);
        } catch (error) {
            next(error);
        }
    }
);

// Path: api/resources/:id
router.delete("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const user = req.user;
            const resource = await resourceController.delete(req.params.id, user);
            res.json(resource);
        } catch (error) {
            next(error);
        }
    }
);

// Path: api/resources/admin/:id
router.delete("/admin/:id",
    validateToken,
    isAdmin,  
    async (req, res, next) => {
        try {
            const resource = await resourceController.deleteByAdmin(req.params.id);
            res.json(resource);
        } catch (error) {
            next(error);
        }
    }
);





module.exports = router;