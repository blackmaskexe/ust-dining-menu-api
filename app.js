const express = require("express");
require("./scraping/scrapeScheduler"); // import and run the webscraping scheduler

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require("./routes/index");
app.use(indexRouter);

app.get("/", (req, res, next) => {
  res.json({
    apiWorking: true,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
