const { GoogleGenAI } = require("@google/genai");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const diningLocationMenus = require("../utils/diningLocationsMenus");
const aiInstructions = require("../utils/aiPrompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function callGeminiAPI(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}

exports.scrapeViewMenu = async function scrapeViewMenu() {
  const selectedDiningLocation = diningLocationMenus[0]; // selecting The View as a dining location

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

  console.log("The party and");
  const aiResponse = await callGeminiAPI(aiInstructions + relevantContent);
  console.log("The after party");

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

  const dataDir = path.join(__dirname, "../weeklyMenu");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  fs.writeFileSync(
    path.join(dataDir, "theView.json"),
    JSON.stringify(menuData, null, 2)
  );

  return menuData;
};

exports.scrapeNorthsiderMenu = async function scrapeNorthsiderMenu() {
  const selectedDiningLocation = diningLocationMenus[1]; // selecting Northsider as a dining location

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
  console.log("The party and");
  const aiResponse = await callGeminiAPI(aiInstructions + relevantContent);
  console.log("The after party");

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

  const dataDir = path.join(__dirname, "../weeklyMenu");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  fs.writeFileSync(
    path.join(dataDir, "northsider.json"),
    JSON.stringify(menuData, null, 2)
  );

  return menuData;
};
