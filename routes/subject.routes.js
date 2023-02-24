const {Router} = require("express");
const router = Router();
const subjectService = require("../services/subject.service");

// Path: /api/subjects
router.get("/", async (req, res) => {
    const subjects = await subjectService.getAll();
    res.json(subjects);
});

// Path: /api/subjects/:id
router.get("/:id", async (req, res) => {
    const subject = await subjectService.getOne(req.params.id);
    res.json(subject);
});

// Path: /api/subjects
router.post("/", async (req, res) => {
    const subject = await subjectService.create(req.body);
    res.json(subject);
});

// Path: /api/subjects/:id
router.put("/:id", async (req, res) => {
    const subject = await subjectService.update(req.params.id, req.body);
    res.json(subject);
});

// Path: /api/subjects/:id
router.delete("/:id", async (req, res) => {
    const subject = await subjectService.delete(req.params.id);
    res.json(subject);
});

module.exports = router;