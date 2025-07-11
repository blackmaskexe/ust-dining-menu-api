const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const manualScrapingController = require("../controllers/manualScrapingController");

const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"] || req.query.apiKey;
  const validApiKey = process.env.AUTH_API_KEY;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }

  next();
};

// Routes for The View:
router.get("/view-menu-now", menuController.getViewMenuNow);
router.get("/view-menu-today", menuController.getViewMenuToday);

// Routes for Northsider:
router.get("/northsider-menu-now", menuController.getNorthsiderMenuNow);
router.get("/northsider-menu-today", menuController.getNorthsiderMenuToday);

// Route(s) for manual scraping of the menu:
router.post(
  "/manual-scrape-menu",
  authenticateApiKey,
  manualScrapingController.manuallyScrapeMenu
);

// Misc Routes:
// router.get("/test", menuController.test);

module.exports = router;
