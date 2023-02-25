const {Router} = require("express");
const resourceController = require("../controllers/resource.controller");
const router = Router();
// Path: api/resources
router.get("/", async (req, res) => {
    const resources = await resourceController.getAll();
    res.json(resources);
});
// Path: api/resources/:id
router.get("/:id", async (req, res) => {
    const resource = await resourceController.getOne(req.params.id);
    res.json(resource);
});
// Path: api/resources
router.post("/", async (req, res) => {
    const resource = await resourceController.create(req.body);
    res.json(resource);
});
// Path: api/resources/:id
router.put("/:id", async (req, res) => {
    const resource = await resourceController.update(req.params.id, req.body);
    res.json(resource);
});
// Path: api/resources/:id
router.delete("/:id", async (req, res) => {
    const resource = await resourceController.delete(req.params.id);
    res.json(resource);
});

module.exports = router;