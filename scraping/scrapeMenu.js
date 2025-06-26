const { GoogleGenAI } = require("@google/genai");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const diningLocationMenus = require("../utils/diningLocationsMenus");
const aiInstructions = require("../utils/aiPrompt");

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBjE7Ss9Ov3VmbE_1LA_M_OX6VGKxcLLSg",
});

async function callGeminiAPI(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text);
  console.log("I always want you and I COMING DOWNNNNN");
  return response.text;
}

module.exports = async function scrapeMenu(diningLocationIndex) {
  const selectedDiningLocationIndex = diningLocationIndex;
  const selectedDiningLocation =
    diningLocationMenus[selectedDiningLocationIndex];

  // Fetch the menu page
  const response = await axios.get(selectedDiningLocation.dining_menu_link, {
    httpsAgent: new (require("https").Agent)({
      rejectUnauthorized: false,
    }),
  });
  const rawSiteHtml = response.data;

  // Parse HTML and extract relevant content
  const parsedHTML = cheerio.load(rawSiteHtml);
  const relevantContent = parsedHTML("#content").html();

  // Prepare AI instructions and sample response

  console.log("TO YOU, AND TO ME");
  const aiResponse = await callGeminiAPI(aiInstructions + relevantContent);
  console.log("BUT YOU ESPECIALLY");

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
  console.log("I always want you and I coming downnnnnn");

  const dataDir = path.join(__dirname, "../weeklyMenu");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  fs.writeFileSync(
    path.join(dataDir, "theView.json"),
    JSON.stringify(menuData, null, 2)
  );

  return menuData;
};
