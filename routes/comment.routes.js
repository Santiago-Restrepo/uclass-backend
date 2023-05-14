const {Router} = require("express");
const commentController = require("../controllers/comment.controller")
const router = Router();
const { validateToken, isAdmin } = require("../middlewares/auth.handler");

// Path: /api/comments
router.get("/", 
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const comments = await commentController.getAll();
            res.json(comments);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/comments
router.post("/",
    validateToken,
    async (req, res, next) => {
        try {
            const {user} = req;
            if(user && user.id){
                req.body.user = user.id;
            }
            const comment = await commentController.create(req.body);
            res.json(comment);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/comments/resource/:resourceId

router.get("/resource/:resourceId",
    validateToken,
    async (req, res, next) => {
        try {
            const comments = await commentController.getByResourceId(req.params.resourceId);
            res.json(comments);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/comments/review/:reviewId

router.get("/review/:reviewId",
    validateToken,
    async (req, res, next) => {
        try {
            const comments = await commentController.getByReviewId(req.params.reviewId);
            res.json(comments);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/comments/user/:userId

router.get("/user/:userId",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const comments = await commentController.getByUserId(req.params.userId);
            res.json(comments);
        } catch (error) {
            next(error);
        }
    }
);

router.delete("/:id",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            // const user = req.user;
            const comment = await commentController.delete(req.params.id);
            res.json(comment);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

