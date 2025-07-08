const cron = require("node-cron");
const {scrapeViewMenu, scrapeNorthsiderMenu} = require("./scrapeMenu");

// Runs every Monday at 2:00 AM
cron.schedule("0 2 * * 1", () => {
  // a web scraping scheduler running at 2am once every week

  scrapeViewMenu(); // 0 is the index for The View menu
});

// scrapeMenu(0);

scrapeNorthsiderMenu();