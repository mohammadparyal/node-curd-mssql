const express = require("express");
const ctrl = require("../controller/accounts-ctrl");

const router = express.Router();

router.post("/create", ctrl.add);
router.post("/update", ctrl.edit);
router.get("/:id/info", ctrl.get);
router.get("/all/limit/:limit/page/:page", ctrl.getAll);
router.delete("/:id", ctrl.deleteIt);

module.exports = router;
