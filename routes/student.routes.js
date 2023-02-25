const {Router} = require("express");
const router = Router();
const studentController = require("../controllers/student.controller");

// Path: /api/students
router.get("/", async (req, res, next) => {
    try {
        const students = await studentController.getAll();
        res.json(students);
    } catch (err) {
        next(err);
    }
});

// Path: /api/students/:id
router.get("/:id", async (req, res, next) => {
    try {
        const student = await studentController.getOne(req.params.id);
        res.json(student);
    } catch (error) {
        console.log(error.isBoom);
        next(error);
    }
});

// Path: /api/students
router.post("/", async (req, res) => {
    const student = await studentController.create(req.body);
    res.json(student);
});

// Path: /api/students/:id
router.put("/:id", async (req, res) => {    
    const student = await studentController.update(req.params.id, req.body);
    res.json(student);
});

// Path: /api/students/:id
router.delete("/:id", async (req, res) => {
    const student = await studentController.delete(req.params.id);
    res.json(student);
});

module.exports = router;
