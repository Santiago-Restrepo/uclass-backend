const {Router} = require("express");
const router = Router();
const reviewService = require("../services/review.service");

// Path: /api/reviews
router.get("/", async (req, res) => {
    const reviews = await reviewService.getAll();
    res.json(reviews);
});

// Path: /api/reviews/:id
router.get("/:id", async (req, res) => {
    const review = await reviewService.getOne(req.params.id);
    res.json(review);
});

// Path: /api/reviews
router.post("/", async (req, res) => {
    const review = await reviewService.create(req.body);
    res.json(review);
});

// Path: /api/reviews/:id
router.put("/:id", async (req, res) => {
    const review = await reviewService.update(req.params.id, req.body);
    res.json(review);
});

// Path: /api/reviews/:id
router.delete("/:id", async (req, res) => {
    const review = await reviewService.delete(req.params.id);
    res.json(review);
});

module.exports = router;