const {Router} = require("express");
const router = Router();
const teacherService = require("../services/teacher.service");

// Path: /api/teachers
router.get("/", async (req, res) => {
    const teachers = await teacherService.getAll();
    res.json(teachers);
});

// Path: /api/teachers/:id
router.get("/:id", async (req, res) => {
    const teacher = await teacherService.getOne(req.params.id);
    res.json(teacher);
});

// Path: /api/teachers
router.post("/", async (req, res) => {
    const teacher = await teacherService.create(req.body);
    res.json(teacher);
});

// Path: /api/teachers/:id
router.put("/:id", async (req, res) => {
    const teacher = await teacherService.update(req.params.id, req.body);
    res.json(teacher);
});

// Path: /api/teachers/:id
router.delete("/:id", async (req, res) => {
    const teacher = await teacherService.delete(req.params.id);
    res.json(teacher);
});

module.exports = router;