module.exports = () => {
  return {
    menu: "menu",
  };

  // this should fetch the menus, and overwrite the respective menu files
};

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const diningLocationMenus = require("../utils/diningLocationsMenus");
const sampleAIResponse = require("../utils/sampleAIResponse");

// Replace this with your actual Gemini API client or HTTP call
async function callGeminiAPI(prompt) {}

module.exports = async function scrapeMenu(diningLocationIndex) {
  const selectedDiningLocationIndex = diningLocationIndex;
  const selectedDiningLocation =
    diningLocationMenus[selectedDiningLocationIndex];

  // Fetch the menu page
  const response = await axios.get(selectedDiningLocation.dining_menu_link, {
    httpsAgent: new (require("https").Agent)(),
  });
  const rawSiteHtml = response.data;

  // Parse HTML and extract relevant content
  const parsedHTML = cheerio.load(rawSiteHtml);
  const relevantContent = parsedHTML("#content").html();

  // Prepare AI instructions and sample response

  // Call Gemini API (replace with your actual call)
  const aiResponse = await callGeminiAPI(aiInstructions + relevantContent);

  // Clean and parse the response
  let cleanedResponse = aiResponse
    .trim()
    .replace(/^```json|^```|```$/g, "")
    .trim();
  let menuData;
  try {
    menuData = JSON.parse(cleanedResponse);
  } catch (e) {
    menuData = [];
  }

  // Save to file (overwrite each week)
  const dataDir = path.join(__dirname, "../data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  fs.writeFileSync(
    path.join(dataDir, "menuData.json"),
    JSON.stringify(menuData, null, 2)
  );

  return menuData;
};
