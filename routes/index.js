const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Routes for The View:
router.get("/view-menu-now", menuController.getViewMenuNow);
router.get("/view-menu-today", menuController.getViewMenuToday);

// Routes for Northsider:
router.get("/northsider-menu-now", menuController.getNorthsiderMenuNow);
router.get("/northsider-menu-today", menuController.getNorthsiderMenuToday);

// Misc Routes:
// router.get("/test", menuController.test);

module.exports = router;
