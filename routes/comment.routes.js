const {Router} = require("express");
const commentController = require("../controllers/comment.controller")
const router = Router();

// Path: /api/comments
router.get("/", async (req, res) => {
    const comments = await commentController.getAll();
    res.json(comments);
});

// Path: /api/comments/:id
router.get("/:id", async (req, res) => {
    const comment = await commentController.getOne(req.params.id);
    res.json(comment);
});

// Path: /api/comments
router.post("/", async (req, res) => {
    const comment = await commentController.create(req.body);
    res.json(comment);
});

// Path: /api/comments/:id
router.put("/:id", async (req, res) => {
    const comment = await commentController.update(req.body);
    res.json(comment);
});

// Path: /api/comments/:id
router.delete("/:id", async (req, res) => {
    const comment = await commentController.delete(req.params.id);
    res.json(comment);
});

module.exports = router;

