const {Router} = require("express");
const router = Router();
const reviewController = require("../controllers/review.controller");
const { validateToken, isAdmin } = require("../middlewares/auth.handler");

// Path: /api/reviews
router.get("/", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const reviews = await reviewController.getAll();
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/pending
router.get("/pending", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const reviews = await reviewController.getPending();
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
);


// Path: /api/reviews/:id
router.get("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const review = await reviewController.getOne(req.params.id);
            res.json(review);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/reviews/user/:userId
router.get("/user/:userId",
    validateToken,
    async (req, res, next) => {
        try {
            const reviews = await reviewController.getByUserId(req.params.userId);
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/reviews/subject/:subjectId
router.get("/subject/:subjectId",
    validateToken,
    async (req, res, next) => {
        try {
            const reviews = await reviewController.getBySubjectId(req.params.subjectId);
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/reviews/teacher/:teacherId
router.get("/teacher/:teacherId",
    validateToken,
    async (req, res, next) => {
        try {
            const reviews = await reviewController.getByTeacherId(req.params.teacherId);
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/reviews/edits/:id
router.get("/edits/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const reviews = await reviewController.getEdits(req.params.id);
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/reviews
router.post("/",
    validateToken,
    async (req, res, next) => {
        try {
            const user = req.user;
            const body = req.body;
            if(user && user.id){
                body.user = user.id;
            }
            const review = await reviewController.create(body);
            res.json(review);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/reviews/:id
router.put("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const user = req.user;
            const updatedReview = await reviewController.update(req.params.id, req.body, user);
            res.json(updatedReview);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/reviews/admin/:id
router.put("/admin/:id",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const updatedReview = await reviewController.updateByAdmin(req.params.id, req.body);
            res.json(updatedReview);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/reviews/approve/:id
router.put("/approve/:id",
    validateToken, 
    isAdmin,
    async (req, res, next) => {
        try {
            const updatedReview = await reviewController.approve(req.params.id);
            res.json(updatedReview);
        } catch (error) {
            next(error);
        }
    }
);
router.put("/reject/:id",
    validateToken, 
    isAdmin,
    async (req, res, next) => {
        try {
            const rejectedReason = req.body.reason;
            const rejectedReview = await reviewController.reject(req.params.id, rejectedReason);
            res.json(rejectedReview);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/reviews/:id
router.delete("/:id", async (req, res) => {
    const review = await reviewController.delete(req.params.id);
    res.json(review);
});

module.exports = router;