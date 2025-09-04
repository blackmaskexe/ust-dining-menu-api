const settings = require("../settings.js");

const diningLocationMenus = [
  {
    index: 0,
    location: "The View",
    dining_menu_link: settings.theViewMenuLink,

    meal_timings: {
      Monday: {
        Breakfast: "07:00-09:00",
        Lunch: "11:00-14:00",
        Dinner: "16:00-20:30",
        Brunch: null,
      },
      Tuesday: {
        Breakfast: "07:00-09:00",
        Lunch: "11:00-14:00",
        Dinner: "16:00-20:30",
        Brunch: null,
      },
      Wednesday: {
        Breakfast: "07:00-09:00",
        Lunch: "11:00-14:00",
        Dinner: "16:00-20:30",
        Brunch: null,
      },
      Thursday: {
        Breakfast: "07:00-09:00",
        Lunch: "11:00-14:00",
        Dinner: "16:00-20:30",
        Brunch: null,
      },
      Friday: {
        Breakfast: "07:00-09:00",
        Lunch: "11:00-14:00",
        Dinner: "16:00-20:30",
        Brunch: null,
      },
      Saturday: {
        Breakfast: null,
        Lunch: null,
        Dinner: "16:00-19:00",
        Brunch: "09:00-14:00",
      },
      Sunday: {
        Breakfast: null,
        Lunch: null,
        Dinner: "16:00-19:00",
        Brunch: "09:00-14:00",
      },
    },
    exceptions: [
      // {
      //   start_date: "2025-08-21",
      //   end_date: "2025-09-01",
      //   notes: "Modified schedule for Fall semester transition",
      //   operating_timings: {
      //     Thursday: "07:00-19:00",
      //     Friday: "07:00-19:00",
      //     Saturday: "07:00-19:00",
      //     Sunday: null,
      //     Monday: "07:00-19:00",
      //     Tuesday: "07:00-19:00",
      //     Wednesday: "07:00-19:00",
      //   },
      //   meal_timings: {
      //     Monday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: null,
      //     },
      //     Tuesday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: null,
      //     },
      //     Wednesday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: null,
      //     },
      //     Thursday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: null,
      //     },
      //     Friday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: null,
      //     },
      //     Saturday: {
      //       Breakfast: null,
      //       Lunch: null,
      //       Dinner: "16:00-19:00",
      //       Brunch: "09:00-11:00",
      //     },
      //     Sunday: {
      //       Breakfast: null,
      //       Lunch: null,
      //       Dinner: "16:00-19:00",
      //       Brunch: "09:00-11:00",
      //     },
      //   },
      // },
      // {
      //   start_date: "2025-09-02",
      //   end_date: "2025-09-02",
      //   notes:
      //     "Modified Hours on Tuesday, September 2nd before resuming normal hours",
      //   operating_timings: {
      //     Tuesday: "07:00-20:30",
      //   },
      //   meal_timings: {
      //     Tuesday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-20:30",
      //       Brunch: null,
      //     },
      //   },
      // },
    ],
  },
  {
    index: 1,
    location: "Northsider",
    dining_menu_link: settings.northsiderMenuLink,

    meal_timings: {
      Monday: {
        Breakfast: "07:00-10:00",
        Lunch: "11:00-14:00",
        Dinner: "17:00-20:30",
        Brunch: null,
      },
      Tuesday: {
        Breakfast: "07:00-10:00",
        Lunch: "11:00-14:00",
        Dinner: "17:00-20:30",
        Brunch: null,
      },
      Wednesday: {
        Breakfast: "07:00-10:00",
        Lunch: "11:00-14:00",
        Dinner: "17:00-20:30",
        Brunch: null,
      },
      Thursday: {
        Breakfast: "07:00-10:00",
        Lunch: "11:00-14:00",
        Dinner: "17:00-20:30",
        Brunch: null,
      },
      Friday: {
        Breakfast: "07:00-10:00",
        Lunch: "11:00-14:00",
        Dinner: "17:00-20:30",
        Brunch: null,
      },
      Saturday: {
        Breakfast: null,
        Lunch: null,
        Dinner: "17:00-20:00",
        Brunch: "09:00-14:00",
      },
      Sunday: {
        Breakfast: null,
        Lunch: null,
        Dinner: "17:00-20:00",
        Brunch: "09:00-14:00",
      },
    },
    exceptions: [
      // {
      //   start_date: "2025-08-21",
      //   end_date: "2025-09-01",
      //   notes: "Modified schedule for Fall semester transition",
      //   operating_timings: {
      //     Thursday: null,
      //     Friday: null,
      //     Saturday: null,
      //     Sunday: "09:00-19:00",
      //     Monday: "07:00-19:00",
      //     Tuesday: "07:00-19:00",
      //     Wednesday: "07:00-19:00",
      //   },
      //   meal_timings: {
      //     Monday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: null,
      //     },
      //     Tuesday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: null,
      //     },
      //     Wednesday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: null,
      //     },
      //     Thursday: {
      //       Breakfast: null,
      //       Lunch: null,
      //       Dinner: null,
      //       Brunch: null,
      //     },
      //     Friday: {
      //       Breakfast: null,
      //       Lunch: null,
      //       Dinner: null,
      //       Brunch: null,
      //     },
      //     Saturday: {
      //       Breakfast: null,
      //       Lunch: null,
      //       Dinner: null,
      //       Brunch: null,
      //     },
      //     Sunday: {
      //       Breakfast: null,
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-19:00",
      //       Brunch: "09:00-11:00",
      //     },
      //   },
      // },
      // {
      //   start_date: "2025-09-02",
      //   end_date: "2025-09-02",
      //   notes:
      //     "Modified Hours on Tuesday, September 2nd before resuming normal hours",
      //   operating_timings: {
      //     Tuesday: "07:00-20:30",
      //   },
      //   meal_timings: {
      //     Tuesday: {
      //       Breakfast: "07:00-09:00",
      //       Lunch: "11:00-14:00",
      //       Dinner: "16:00-20:30",
      //       Brunch: null,
      //     },
      //   },
      // },
    ],
  },
];

module.exports = diningLocationMenus;
