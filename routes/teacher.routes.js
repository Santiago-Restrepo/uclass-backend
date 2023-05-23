const {Router} = require("express");
const router = Router();
const teacherController = require("../controllers/teacher.controller");
//middlewares
const { validateToken, isAdmin } = require("../middlewares/auth.handler");
// Path: /api/teachers
router.get("/", 
    validateToken,
    async (req, res, next) => {
        try {
            const teachers = await teacherController.getAll();
            res.json(teachers);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/best",
    validateToken,
    async (req, res, next) => {
        try {
            const teachers = await teacherController.getBest();
            res.json(teachers);
        } catch (error) {
            next(error);
        }
    }
);

//Path: /api/teachers/search
router.post("/search",
    validateToken,
    async (req, res, next) => {
        try {
            const {query} = req.body;
            const teachers = await teacherController.search(query);
            res.json(teachers);
        } catch (error) {
            next(error);
        }
    }
);
            
// Path: /api/teachers/:id
router.get("/:id", 
    validateToken,
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const teacher = await teacherController.getOne(id);
            res.json(teacher);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/teachers
router.post("/", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const teacher = await teacherController.create(req.body);
            res.json(teacher);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/teachers/:id
router.put("/:id", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const teacher = await teacherController.update(req.params.id, req.body);
            res.json(teacher);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/teachers/:id
router.delete("/:id", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const teacher = await teacherController.delete(req.params.id);
            res.json(teacher);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;