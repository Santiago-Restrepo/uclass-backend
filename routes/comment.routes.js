const {Router} = require("express");
const commentService = require("../services/comment.service")
const router = Router();

// Path: /api/comments
router.get("/", async (req, res) => {
    const comments = await commentService.getAll();
    res.json(comments);
});

// Path: /api/comments/:id
router.get("/:id", async (req, res) => {
    const comment = await commentService.getOne(req.params.id);
    res.json(comment);
});

// Path: /api/comments
router.post("/", async (req, res) => {
    const comment = await commentService.create(req.body);
    res.json(comment);
});

// Path: /api/comments/:id
router.put("/:id", async (req, res) => {
    const comment = await commentService.update(req.body);
    res.json(comment);
});

// Path: /api/comments/:id
router.delete("/:id", async (req, res) => {
    const comment = await commentService.delete(req.params.id);
    res.json(comment);
});

module.exports = router;

