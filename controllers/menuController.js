const viewMenuData = require("../weeklyMenu/theView.json");

function getTodayMenu() {
  // Extract today's menu for each table_title

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }); // gives sum like "Tuesday" or "Saturday"
  const todayMenusMeals = viewMenuData
    .map((section) => {
      const menuForToday = section.menu_on_days[today];
      if (menuForToday && Object.keys(menuForToday).length > 0) {
        return {
          table_title: section.table_title,
          menu: menuForToday,
        };
      }
      return {};
    })
    .filter(Boolean); // removes any falsy values from the array

  return todayMenusMeals;

  // this will return an array like this:
  // [
  //   {
  //     table_title: "Breakfast",
  //     menu: {
  //       "Main Course": ["Croissant"],
  //       "Greens Station": ["Oatmeal & Toppings"],
  //       "Your Call Station": ["Eggs & Omelet Bar"],
  //       "Bakery Station": ["Chocolate Chip Muffins", "Mini Cinnamon Rolls"],
  //       "Other Open Stations": ["Waffles & Toppings"],
  //     },
  //   },
  //   {
  //     table_title: "Lunch",
  //     menu: {
  //       "Main Course": ["Croissant"],
  //       "Greens Station": ["Oatmeal & Toppings"],
  //       "Your Call Station": ["Eggs & Omelet Bar"],
  //       "Bakery Station": ["Chocolate Chip Muffins", "Mini Cinnamon Rolls"],
  //       "Other Open Stations": ["Waffles & Toppings"],
  //     },
  //   },
  // ];
}

function getMealTimeNow() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });

  if (day === "Saturday" && hour >= 8 && hour < 14) {
    return "Saturday Brunch";
  }
  if (hour < 11) {
    return "Breakfast";
  }
  if (hour < 15) {
    return "Lunch";
  }
  if (hour < 18) {
    return "Dinner";
  }
  // returning null in other cases (place closed, errors, etc)
  return null;
}

function getMenuNow() {
  const todayMenuMeals = getTodayMenu();
  const mealTimeNow = getMealTimeNow();

  const menuNow = todayMenuMeals.filter((meanuMeal) => {
    if (meanuMeal.table_title == mealTimeNow) {
      return true;
    } else {
      return false;
    }
  });

  if (menuNow.length == 1) {
    return menuNow[0];
  } else {
    return {};
  }

  // returns an object like this:
  // {
  //     table_title: "Lunch",
  //     menu: {
  //       "Main Course": ["Croissant"],
  //       "Greens Station": ["Oatmeal & Toppings"],
  //       "Your Call Station": ["Eggs & Omelet Bar"],
  //       "Bakery Station": ["Chocolate Chip Muffins", "Mini Cinnamon Rolls"],
  //       "Other Open Stations": ["Waffles & Toppings"],
  //     },
  //   },
}

exports.getViewMenuNow = (req, res) => {
  res.json(getMenuNow());
};

exports.getViewMenuToday = (req, res) => {
  res.json(getTodayMenu());
};

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
  apiKey: "AIzaSyBjE7Ss9Ov3VmbE_1LA_M_OX6VGKxcLLSg",
});

exports.test = (req, res) => {
  async function callGeminiAPI(prompt) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(response.text);
    console.log("I always want you and I COMING DOWNNNNN");
  }
  callGeminiAPI("I ALWAYS WANT YOU AND I COMING DOOWNNNNNN");
};
