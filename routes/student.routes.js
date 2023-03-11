const {Router} = require("express");
const router = Router();
const studentController = require("../controllers/student.controller");
const { validateToken, isAdmin } = require("../middlewares/auth.handler");
// Path: /api/students
router.get("/", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const students = await studentController.getAll();
            res.json(students);
        } catch (err) {
            next(err);
        }
    }
);

// Path: /api/students/:id
router.get("/:id", 
    validateToken,
    async (req, res, next) => {
        try {
            const student = await studentController.getOne(req.params.id);
            res.json(student);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/students/:id
router.put("/:id", 
    validateToken,
    isAdmin,
    async (req, res, next) => {    
        try {
            const student = await studentController.update(req.params.id, req.body);
            res.json(student);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/students/:id
router.delete("/:id", async (req, res) => {
    const student = await studentController.delete(req.params.id);
    res.json(student);
});

module.exports = router;
