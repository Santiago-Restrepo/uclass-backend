const {Router} = require("express");
const router = Router();
const subjectController = require("../controllers/subject.controller");

// Path: /api/subjects
router.get("/", async (req, res) => {
    const subjects = await subjectController.getAll();
    res.json(subjects);
});

// Path: /api/subjects/:id
router.get("/:id", async (req, res) => {
    const subject = await subjectController.getOne(req.params.id);
    res.json(subject);
});

// Path: /api/subjects
router.post("/", async (req, res) => {
    const subject = await subjectController.create(req.body);
    res.json(subject);
});

// Path: /api/subjects/:id
router.put("/:id", async (req, res) => {
    const subject = await subjectController.update(req.params.id, req.body);
    res.json(subject);
});

// Path: /api/subjects/:id
router.delete("/:id", async (req, res) => {
    const subject = await subjectController.delete(req.params.id);
    res.json(subject);
});

module.exports = router;