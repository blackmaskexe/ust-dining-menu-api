const {
  scrapeViewMenu,
  scrapeNorthsiderMenu,
} = require("../scraping/scrapeMenu");

exports.manuallyScrapeMenu = (req, res) => {
  res.json({
    message: "Scraping was started. You will see the updated menu shortly!",
    completionTime: "1-2 minutes",
  });

  scrapeViewMenu();
  scrapeNorthsiderMenu();
};
