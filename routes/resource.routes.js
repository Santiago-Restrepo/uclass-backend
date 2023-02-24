const {Router} = require("express");
const resourceService = require("../services/resource.service");
const router = Router();
// Path: api/resources
router.get("/", async (req, res) => {
    const resources = await resourceService.getAll();
    res.json(resources);
});
// Path: api/resources/:id
router.get("/:id", async (req, res) => {
    const resource = await resourceService.getOne(req.params.id);
    res.json(resource);
});
// Path: api/resources
router.post("/", async (req, res) => {
    const resource = await resourceService.create(req.body);
    res.json(resource);
});
// Path: api/resources/:id
router.put("/:id", async (req, res) => {
    const resource = await resourceService.update(req.params.id, req.body);
    res.json(resource);
});
// Path: api/resources/:id
router.delete("/:id", async (req, res) => {
    const resource = await resourceService.delete(req.params.id);
    res.json(resource);
});

module.exports = router;