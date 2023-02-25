const {Router} = require("express");
const router = Router();
const teacherController = require("../controllers/teacher.controller");

// Path: /api/teachers
router.get("/", async (req, res) => {
    const teachers = await teacherController.getAll();
    res.json(teachers);
});

// Path: /api/teachers/:id
router.get("/:id", async (req, res) => {
    const teacher = await teacherController.getOne(req.params.id);
    res.json(teacher);
});

// Path: /api/teachers
router.post("/", async (req, res) => {
    const teacher = await teacherController.create(req.body);
    res.json(teacher);
});

// Path: /api/teachers/:id
router.put("/:id", async (req, res) => {
    const teacher = await teacherController.update(req.params.id, req.body);
    res.json(teacher);
});

// Path: /api/teachers/:id
router.delete("/:id", async (req, res) => {
    const teacher = await teacherController.delete(req.params.id);
    res.json(teacher);
});

module.exports = router;