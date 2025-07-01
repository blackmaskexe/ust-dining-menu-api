const express = require("express");
require("./scraping/scrapeScheduler"); // import and run the webscraping scheduler
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // This enables CORS for all routes

// Routes
const indexRouter = require("./routes/index");
const { callGeminiAPI } = require("./scraping/scrapeMenu");
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

// import dummy data into the weeklyMenu folder
// add logic to the controllers to serve a response based on that data
