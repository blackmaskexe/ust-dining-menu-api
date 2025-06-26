const cron = require("node-cron");
const scrapeMenu = require("./scrapeMenu");

// Runs every Monday at 2:00 AM
// cron.schedule("0 2 * * 1", () => {
//   // a web scraping scheduler running at 2am once every week
//   scrapeMenu();
// });

scrapeMenu(0);
