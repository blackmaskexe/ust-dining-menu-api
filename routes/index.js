const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("view-menu-now", menuController.getViewMenuNow);
router.get("/view-menu-today", menuController.getViewMenuToday);

module.exports = router;
