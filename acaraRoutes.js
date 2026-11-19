const express = require("express");
const router = express.Router();
const c = require("./acaraController");

router.get("/", c.getAll);
router.get("/:id", c.getById);
router.post("/", c.create);
router.put("/:id", c.update);
router.delete("/:id", c.remove);
router.post("/generate-deskripsi", c.generateDeskripsi);

module.exports = router;
