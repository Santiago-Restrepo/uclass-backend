const {Router} = require("express");
const router = Router();
const classController = require("../controllers/class.controller");
const { validateToken, isAdmin } = require("../middlewares/auth.handler");

// Path: /api/classes
router.get("/",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const classes = await classController.getAll();
            res.json(classes);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/classes/subject/:subjectId
router.get("/subject/:subjectId",
    validateToken,
    async (req, res, next) => {
        try {
            const classes = await classController.findBySubjectId(req.params.subjectId);
            res.json(classes);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/classes/teacher/:teacherId
router.get("/teacher/:teacherId",
    validateToken,
    async (req, res, next) => {
        try {
            const classes = await classController.findByTeacherId(req.params.teacherId);
            res.json(classes);
        } catch (error) {
            next(error);
        }
    }
);


router.get("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const classFound = await classController.getOne(req.params.id);
            res.json(classFound);
        } catch (error) {
            next(error);
        }
    }
);

router.post("/",
    validateToken,
    async (req, res, next) => {
        try {
            const newClass = await classController.create(req.body);
            res.json(newClass);
        } catch (error) {
            next(error);
        }
    }
);

router.put("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const updatedClass = await classController.update(req.params.id, req.body);
            res.json(updatedClass);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const deletedClass = await classController.delete(req.params.id);
            res.json(deletedClass);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
