const {Router} = require("express");
const router = Router();
const subjectController = require("../controllers/subject.controller");
const { validateToken, isAdmin } = require("../middlewares/auth.handler");
// Path: /api/subjects
router.get("/",
    validateToken,
    async (req, res, next) => {
        try {
            const subjects = await subjectController.getAll();
            res.json(subjects);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/subjects/:id
router.get("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const subject = await subjectController.getOne(req.params.id);
            res.json(subject);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/subjects/teacher/:teacherId
router.get("/teacher/:teacherId",
    validateToken, 
    async (req, res, next) => {
        try {
            const subjects = await subjectController.getByTeacherId(req.params.teacherId);
            res.json(subjects);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/subjects/search
router.post("/search",
    validateToken,
    async (req, res, next) => {
        try {
            const {query} = req.body;
            const subjects = await subjectController.search(query);
            res.json(subjects);
        } catch (error) {
            next(error);
        }
    }
);

// Path: /api/subjects
router.post("/",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const subject = await subjectController.create(req.body);
            res.json(subject);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/subjects/:id
router.put("/:id",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const updatedSubject = await subjectController.update(req.params.id, req.body);
            res.json(updatedSubject);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/subjects/:id
router.delete("/:id",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const deletedSubject = await subjectController.delete(req.params.id);
            res.json(deletedSubject);
        } catch (error) {
            next(error);
        }
    }
);
module.exports = router;