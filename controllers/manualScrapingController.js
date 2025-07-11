const { scrapeViewMenu, scrapeNorthsiderMenu } = require("./scrapeMenu");

exports.manuallyScrapeMenu = (req, res) => {
  scrapeViewMenu();
  scrapeNorthsiderMenu();
};
