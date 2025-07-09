const viewMenuData = require("../weeklyMenu/theView.json");
const northsiderMenuData = require("../weeklyMenu/northsider.json");

function getMenuToday(diningLocationMenuData) {
  // Extract today's menu for each table_title

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" }); // gives sum like "Tuesday" or "Saturday"
  const todayMenusMeals = diningLocationMenuData
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
  // Get current time in Chicago timezone
  const now = new Date();
  const chicagoDate = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Chicago" })
  );

  const hour = chicagoDate.getHours();
  const day = chicagoDate.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday

  // Define operating hours clearly
  const BREAKFAST_START = 7;
  const BREAKFAST_END = 11;
  const LUNCH_START = 11;
  const LUNCH_END = 16;
  const DINNER_START = 16;
  const DINNER_END = 19;

  // Saturday special case
  if (day === 6) {
    return "Saturday Brunch";
  }

  // Regular weekday schedule
  if (hour >= BREAKFAST_START && hour < BREAKFAST_END) {
    return "Breakfast";
  }
  if (hour >= LUNCH_START && hour < LUNCH_END) {
    return "Lunch";
  }
  if (hour >= DINNER_START && hour < DINNER_END) {
    return "Dinner";
  }

  // Outside operating hours
  return null;
}

function getMenuNow(diningLocationMenuData) {
  const todayMenuMeals = getMenuToday(diningLocationMenuData);
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
  res.json(getMenuNow(viewMenuData));
};

exports.getViewMenuToday = (req, res) => {
  res.json(getMenuToday(viewMenuData));
};

exports.getNorthsiderMenuNow = (req, res) => {
  res.json(getMenuNow(northsiderMenuData));
};

exports.getNorthsiderMenuToday = (req, res) => {
  res.json(getMenuToday(northsiderMenuData));
};
