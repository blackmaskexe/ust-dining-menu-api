# UST Dining Menu API

## Project Overview

This Node.js Express server provides a RESTful API for accessing and serving dining menu data for campus locations at the University of St. Thomas. It features automated web scraping, AI-powered data formatting, and robust endpoints for menu queries. The project is organized using the MVC (Model-View-Controller) architecture for maintainability and scalability.

---

## Codebase Structure

- **app.js**: Main entry point. Sets up Express, middleware, routes, and starts the server.

  ```js
  const express = require("express");
  require("./scraping/scrapeScheduler");
  const cors = require("cors");
  // ...existing code...
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  ```

- **routes/index.js**: Defines API endpoints for menu queries and manual scraping. Includes API key authentication for sensitive routes.

  ```js
  router.get("/view-menu-now", menuController.getViewMenuNow);
  router.post(
    "/manual-scrape-menu",
    authenticateApiKey,
    manualScrapingController.manuallyScrapeMenu
  );
  ```

- **controllers/menuController.js**: Contains logic for filtering and serving menu data for "The View" and "Northsider". Example:

  ```js
  exports.getViewMenuNow = (req, res) => {
    res.json(getMenuNow(viewMenuData));
  };
  ```

- **controllers/manualScrapingController.js**: Allows manual triggering of the scraping process via a protected endpoint.

- **scraping/scrapeMenu.js**: Scrapes menu data from dining websites, processes HTML with Cheerio, formats with Gemini AI, and saves to JSON files. Example:

  ```js
  const response = await axios.get(selectedDiningLocation.dining_menu_link, {
    httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
  });
  const parsedHTML = cheerio.load(response.data);
  const relevantContent = parsedHTML("#content").html();
  // ...AI formatting and file writing...
  ```

- **scraping/scrapeScheduler.js**: Uses `node-cron` to automate weekly scraping (every Monday at 2am).

  ```js
  cron.schedule("0 2 * * 1", () => {
    scrapeViewMenu();
    scrapeNorthsiderMenu();
  });
  ```

- **utils/**: Contains helper files for AI prompts and menu location data.

- **weeklyMenu/**: Stores the latest menu data in JSON files (`theView.json`, `northsider.json`), overwritten weekly.

- **showcase.html**: Example widget frontend that consumes the API.

---

## How the Server Works

1. **Scraping**: The server scrapes menu data from campus dining websites using Axios and Cheerio. The raw HTML is processed by Gemini AI to produce structured JSON.
2. **Scheduling**: Scraping runs automatically every week via `node-cron`, and can be triggered manually via a protected API endpoint.
3. **Serving Data**: API endpoints return menu data for today or the current meal time, filtered from the latest JSON files.
4. **Widget Integration**: The API is designed to be consumed by widgets or other frontends (see `showcase.html`).

---

## API Endpoints

- `GET /view-menu-now` — Get menu for the current meal time at The View.
- `GET /view-menu-today` — Get today's full menu at The View.
- `GET /northsider-menu-now` — Get menu for the current meal time at Northsider.
- `GET /northsider-menu-today` — Get today's full menu at Northsider.
- `POST /manual-scrape-menu` — Manually trigger scraping (requires API key).

---

## Maintenance & Extending the Server

### Adding New Dining Locations

1. Add the location and its menu URL to `utils/diningLocationsMenus.js`.
2. Update scraping logic in `scrapeMenu.js` to handle the new location.
3. Add new endpoints and controller logic as needed.

### Updating for Website Changes

- If the dining website structure changes, update the Cheerio selectors and AI prompt in `scrapeMenu.js` and `utils/aiPrompt.js`.
- Test scraping manually using the `/manual-scrape-menu` endpoint.

### Troubleshooting

- Check logs for scraping errors or API issues.
- Ensure `.env` contains valid API keys for Gemini and any authentication.

### General Tips

- Keep dependencies updated (`npm install`).
- Use environment variables for sensitive data.
- Document new endpoints and logic in this README.

---

## Example: Adding a New Menu Location

Suppose you want to add a new dining location "Southsider":

1. Add its info to `utils/diningLocationsMenus.js`:
   ```js
   diningLocationMenus.push({
     index: 2,
     location: "Southsider",
     dining_menu_link: "https://...",
   });
   ```
2. Update `scrapeMenu.js` to handle scraping for Southsider.
3. Add new endpoints in `routes/index.js` and controller logic in `controllers/menuController.js`.

---

## Contributing

Pull requests and suggestions are welcome! Please document new endpoints and logic in this README for future maintainers.
