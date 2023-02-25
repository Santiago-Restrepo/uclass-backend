const {Router} = require("express");
const router = Router();
const reviewController = require("../controllers/review.controller");

// Path: /api/reviews
router.get("/", async (req, res) => {
    const reviews = await reviewController.getAll();
    res.json(reviews);
});

// Path: /api/reviews/:id
router.get("/:id", async (req, res) => {
    const review = await reviewController.getOne(req.params.id);
    res.json(review);
});

// Path: /api/reviews
router.post("/", async (req, res) => {
    const review = await reviewController.create(req.body);
    res.json(review);
});

// Path: /api/reviews/:id
router.put("/:id", async (req, res) => {
    const review = await reviewController.update(req.params.id, req.body);
    res.json(review);
});

// Path: /api/reviews/:id
router.delete("/:id", async (req, res) => {
    const review = await reviewController.delete(req.params.id);
    res.json(review);
});

module.exports = router;