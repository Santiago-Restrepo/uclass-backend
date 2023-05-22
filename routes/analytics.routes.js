const {Router} = require("express");
const router = Router();
const analyticsController = require("../controllers/analytics.controller");
const { validateToken, isAdmin } = require("../middlewares/auth.handler");

// Path: /api/reviews
router.get("/teachers/reviews/count", 
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
router.get("/reviews/count",
    validateToken,
    async (req, res, next) => {
        try {
            const reviews = await analyticsController.getReviewsByDate();
            res.json(reviews);
        } catch (error) {   
            next(error);
        }
    }
);

router.get("/teachers/reviews/rating/count", 
    validateToken,
    async (req, res, next) => {
        try {
            const reviews = await analyticsController.getTeachersReviewsCountByRatings();
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
);
router.get("/teachers/reviews/comments/count", 
    validateToken,
    async (req, res, next) => {
        try {
            const comments = await analyticsController.getTeachersReviewCommentsCount();
            res.json(comments);
        } catch (error) {
            next(error);
        }
    }
);

//Resources and subjects

router.get("/resources/count",
    validateToken,
    async (req, res, next) => {
        try {
            const resources = await analyticsController.getResourcesByDate();
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/subjects/resources/count",
    validateToken,
    async (req, res, next) => {
        try {
            const resources = await analyticsController.getSubjectResourcesCount();
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/subjects/resources/comments/count",
    validateToken,
    async (req, res, next) => {
        try {
            const resources = await analyticsController.getSubjectResourceCommentsCount();
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/subjects/resources/rating/count",
    validateToken,
    async (req, res, next) => {
        try {
            const resources = await analyticsController.getSubjectResourceRatingCount();
            res.json(resources);
        } catch (error) {
            next(error);
        }
    }
);
module.exports = router;