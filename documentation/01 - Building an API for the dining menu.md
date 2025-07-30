## Tools Used:

- Expressjs on Nodejs for API handling
- Cheerio and Axios, libraries for scraping websites
- npm packages that include:
  - Google Gemini API (Or you preferred API Provider, but Gemini is the only AI API Provider that requires no payment methods for proof of concepts)
  - Axios: For making http and https requests
  - Cheerio: For parsing data fetched by axios into a processable html format

## Basic Idea for the API:

1. Scrape the website using Axios, parse it using and select relevant parts using Cheerio
2. Feed these relevant parts into a call to Gemini API along with detailed instructions of how to parse the data into a usable format
3. Store the formatted menu data from the AI into a json file (later, we will have it so that it is stored in a dynamodb table on AWS instead, as we do not want the files on our server to be changing as a good developing practice)
4. Create endpoints using expressjs to return specific parts of the stored menu data:

- for example, if the user calls https://www.apiurl.com/view-menu-now, they should only get the menu of The View right now (The data is scraped for the entire week, but it is not a good idea to send the entire week to the user with a single endpoint. Instead we break it down into multiples, like /view-menu-now and /view-menu-today

- NOTE: To make this documentation relatively sleek, I will not be including import statements or other non-essential parts of the code. If you want the entire codebase, you are free to take a look at [Dining Menu Scraper API on GitHub](https://github.com/blackmaskexe/ust-dining-menu-api/)

## 1. Scraping Menu Data from Public Website:

```js
// calling axios to fetch the raw contents of the website:
const response = await axios.get(selectedDiningLocation.dining_menu_link, {
  // note that selectedDiningLocation.dining_menu_link refers to the url of the dining menu we will be scraping, https://www.stthomas.edu/dining/locations-menus-hours/the-view/menu/index.html in our case

  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: false,
  }),
});
const rawSiteHtml = response.data;

// Parse HTML and extract relevant content
const parsedHTML = cheerio.load(rawSiteHtml);
const relevantContent = parsedHTML("#content").html();
```

## 2. Calling Gemini API, Receiving Menu Data Formatted in JSON:

- This is the instructions that I pass to Gemini API (alongside with the relevant HTML Content of the website) in order to expect a formatted JSON:

```js
const sampleResponse = [
  {
    table_title: "Breakfast",
    menu_on_days: {
      Monday: {
        "Main Course": ["Croissant"],
        "Greens Station": ["Oatmeal & Toppings"],
        "Your Call Station": ["Eggs & Omelet Bar"],
        "Bakery Station": ["Apple Cinnamon Muffins"],
        "Other Open Stations": ["Waffle & Toppings"],
      },
      Tuesday: {
        "Main Course": ["Croissant"],
        "Greens Station": ["Cantaloupe"],
        "Your Call Station": ["Eggs & Omelet Bar"],
        "Bakery Station": ["Chocolate Chip Muffins"],
        "Other Open Stations": ["Waffles & Toppings"],
      },
      Wednesday: {
        "Main Course": ["Croissant"],
        "Greens Station": ["Lunch Bunch Grapes"],
        "Your Call Station": ["Eggs & Omelet Bar"],
        "Bakery Station": ["Orange Blossom Muffins"],
        "Other Open Stations": ["Waffles & Toppings"],
      },
      Thursday: {
        "Main Course": ["Croissant"],
        "Greens Station": ["Kiwi"],
        "Your Call Station": ["Eggs & Omelet Bar"],
        "Bakery Station": ["Cappuccino Muffins"],
        "Other Open Stations": ["Waffles & Toppings"],
      },
      Friday: {
        "Main Course": ["Croissant"],
        "Greens Station": ["Pineapple"],
        "Your Call Station": ["Eggs & Omelet Bar"],
        "Bakery Station": ["Blueberry Muffins"],
        "Other Open Stations": ["Waffles & Toppings"],
      },
    },
  },
  {
    table_title: "Lunch",
    menu_on_days: {
      Monday: {
        "Main Course": ["Beef Chili Dog"],
        "Your Call": ["Pad Thai Stir Fry Bar"],
        "World Eats": ["Fish Tacos"],
        Bakery: ["Chocolate Chocolate Chip Cookies"],
        "Other Open Stations": ["Deli"],
      },
      Tuesday: {
        "Main Course": ["Open-faced Turkey Sandwich"],
        "Your Call": ["Pad Thai Stir Fry Bar"],
        "World Eats": ["Piada Bar"],
        Bakery: ["Oatmeal Butterscotch Cookies"],
        "Other Open Stations": ["Grill"],
      },
      Wednesday: {
        "Main Course": ["Philly Steak Sandwich"],
        "Your Call": ["Pad Thai Stir Fry Bar"],
        "World Eats": ["Honey Chili Lime Shrimp Tacos"],
        Bakery: ["Peanut Butter Cookies"],
        "Other Open Stations": ["Pasta Bar"],
      },
      Thursday: {
        "Main Course": ["Grilled Mediterranean Chicken Breast"],
        "Your Call": ["Pad Thai Stir Fry Bar"],
        "World Eats": ["Nacho Bar"],
        Bakery: ["Sugar Cookies"],
        "Other Open Stations": ["Pizza Bar"],
      },
      Friday: {
        "Main Course": ["Supreme Grilled Cheese"],
        "Your Call": ["Pad Thai Stir Fry Bar"],
        "World Eats": ["Chipotle Citrus BBQ Chicken"],
        Bakery: ["Chocolate Peanut Butter M&M Cookies"],
        "Other Open Stations": ["Soups"],
      },
    },
  },
  {
    table_title: "Dinner",
    menu_on_days: {
      Monday: {
        "Main Course": ["Grilled Balsamic Chicken & Pomodoro Relish"],
        "Your Call Station": ["Pad Thai Stir Fry Bar"],
        "World Eats Station": ["Beef Chow Mein"],
        Bakery: ["Chocolate Chocolate Chip Cookies"],
        "Other Open Stations": ["Deli"],
      },
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
    },
  },
  {
    table_title: "Saturday Brunch",
    menu_on_days: {
      Saturday: {
        "Main Course": ["Scrambled Eggs w/Cheese"],
        "World Eats Station": ["Cheese Manicotti"],
        "Greens Station": ["Oatmeal & Toppings"],
        Bakery: ["Banana Nut Muffins"],
        "Other Open Stations": ["Deli"],
      },
    },
  },
];

const aiInstructions = `
I will paste the raw html content of a website, and you will format it as a JSON array containing json objects and constructs.
This is the html code for a website that contains the menu at campus locations at a University.
Your response should look like the following based on the content: ${JSON.stringify(
  sampleResponse
)}.
(Please note that this is just a skeleton response. Your response should contain all the information in the website, and not miss any entry for any item or day.
Your response should only contain the JSON object, and nothing else. There might be just one item per menu element on the sample response, but you have to output ALL of the items present on the website in your response, don't leave any behind please, and also include all the days of the week when the menu is served)
If something goes wrong, just return an empty JSON array, but you do have to always return valid json response.
`;

module.exports = aiInstructions;
```

## 3. Storing the Menu Data:

Once the menu data is received from the Gemini API in JSON format, it is stored in a file for later retrieval by the API endpoints. This is typically done using Node's `fs` module. The data is saved in the `weeklyMenu/` directory, with a separate file for each dining location (e.g., `theView.json`, `northsider.json`).

**Example code for storing the menu data:**

```js
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../weeklyMenu");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
fs.writeFileSync(
  path.join(dataDir, "theView.json"),
  JSON.stringify(menuData, null, 2)
);
```

This will overwrite the file each time new data is scraped, ensuring the API always serves the latest menu.

---

## 4. API Implementation (Endpoints and Controllers)

The Express server exposes endpoints to serve menu data. Controllers handle the logic for filtering and returning the correct menu based on the request.

**Example controller for serving today's menu:**

```js
const viewMenuData = require("../weeklyMenu/theView.json");

function getTodayMenu(menuData) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return menuData
    .map((section) => {
      const menuForToday = section.menu_on_days[today];
      if (menuForToday && Object.keys(menuForToday).length > 0) {
        return {
          table_title: section.table_title,
          menu: menuForToday,
        };
      }
      return null;
    })
    .filter(Boolean);
}

exports.getViewMenuToday = (req, res) => {
  res.json(getTodayMenu(viewMenuData));
};
```

**Example route definition:**

```js
router.get("/view-menu-today", menuController.getViewMenuToday);
```

You can add similar controllers and routes for other endpoints, such as `/view-menu-now`, `/northsider-menu-today`, etc. The controller logic can be extended to filter by meal time, location, or other criteria as needed.

You can check out the GitHub Repository for this project's backend (API + Scraping) side of things [on my GitHub](https://www.github.com/blackmaskexe/ust-dining-menu-api)
