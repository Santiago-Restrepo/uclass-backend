const {Router} = require("express");
const { validateToken, isAdmin } = require("../middlewares/auth.handler");
const programController = require("../controllers/program.controller");
const boom = require('@hapi/boom');
const router = Router();
// Path: /api/programs
router.get("/",
    validateToken,  
    async (req, res, next) => {
        try {
            const programs = await programController.getAll();
            res.json(programs);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/programs/:id
router.get("/:id",
    validateToken,
    async (req, res, next) => {
        try {
            const program = await programController.getOne(req.params.id);
            if(!program) throw boom.notFound("Program not found");
            res.json(program);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/programs
router.post("/",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const program = await programController.create(req.body);
            res.json(program);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/programs/:id
router.put("/:id",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const program = await programController.update(req.params.id, req.body);
            if(!program) throw boom.notFound("Program not found");
            res.json(program);
        } catch (error) {
            next(error);
        }
    }
);
// Path: /api/programs/:id
router.delete("/:id",
    validateToken,
    isAdmin,
    async (req, res, next) => {
        try {
            const program = await programController.delete(req.params.id);
            if(!program) throw boom.notFound("Program not found");
            res.json(program);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;





