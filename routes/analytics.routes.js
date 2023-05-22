const {Router} = require("express");
const router = Router();
const analyticsController = require("../controllers/analytics.controller");
const { validateToken, isAdmin } = require("../middlewares/auth.handler");

// Path: /api/reviews
router.get("/teachersReviewsCount", 
    validateToken,
    async (req, res, next) => {
        try {
            const reviews = await analyticsController.getTeachersReviewsCount();
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;