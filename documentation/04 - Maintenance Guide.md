


# Maintenance Guide for Content Editors: Dining Menu Now Widget (showcase.html)

This guide is for content editors who maintain the Dining Menu Now widget in the OneStThomas CMS. You do not need to be a programmer! This will help you confidently update, fix, or extend the widget.

---

## 1. Understanding Each Part of the Widget Code

The widget code in `showcase.html` is divided into three main sections:

### a. CSS (between `<style> ... </style>` at the top)
Controls the appearance: colors, fonts, spacing, layout, and how the widget looks on mobile.
  - `.themed-box`, `.tab-button`, `.menu-item-box`, etc. are the main style classes.
  - You can change colors, font sizes, and spacing by editing the values here.
  - Responsive design: The `@media` sections make the widget look good on phones and tablets.

### b. HTML (the main structure)
This is the visible part of the widget.
  - The title is inside `<h3 id="widget-title-text">`.
  - The menu content appears inside `<div id="menu-now-content">`.
  - The tab buttons ("The View", "Northsider", etc.) are created by the JavaScript code.

### c. JavaScript (inside `<script type="text/javascript"> ... </script>`)
This is the logic that makes the widget work.
  - **APIs:** The widget fetches menu data from the university's dining API. The URLs are set at the top (e.g., `viewTodayApiUrl`).
  - **Timings:** The `diningMenuTimings` array controls meal times for each location.
  - **Tabs:** The `tabs` array controls which dining locations appear as tabs.
  - **Functions:**
    - `getCurrentMealName(location)`: Figures out which meal is being served now.
    - `getNextMealInfo(location)`: Finds the next meal if the dining hall is closed.
    - `renderContent()`: Updates the widget display when you switch tabs or when new data loads.
    - `displayMenu(mealData, targetElement)`: Shows the menu for the current meal.
    - `fetchTodayMenu(url, location)`: Loads menu data from the API.
  - **How it works:**
    - When the page loads, the widget shows the tabs and fetches menu data for today.
    - When you click a tab, it shows the menu for that location.
    - If the dining hall is closed, it shows when the next meal will be served.

---

## 2. How to Change the Timings of Dining Locations

1. In the JavaScript section, find the `diningMenuTimings` array (look for `const diningMenuTimings = [`).
2. Each object in this array represents a dining location (e.g., "The View").
3. To change meal times, edit the values for `breakfastStart`, `lunchEnd`, etc. (use 24-hour time, e.g., `16:00` for 4pm).
4. You can add new meals (like `brunchStart`, `brunchEnd`) or remove meals as needed. The widget will automatically use the new names and times.
5. Save your changes and check the widget to make sure the times and meal names display as you expect.

---

## 3. How to Add More Dining Locations (Tabs)

1. In the JavaScript section, find the `tabs` array (look for `const tabs = [`).
2. Each object in this array is a tab (dining location). Example:
   ```js
   { name: 'The View', id: 'the-view-tab', ariaId: 'the-view-panel', menuLink: 'https://www.stthomas.edu/dining/locations-menus-hours/the-view/menu/index.html' }
   ```
3. To add a new location:
   - Add a new object with the correct `name`, `id`, `ariaId`, and `menuLink`.
   - Make sure the `name` matches the location name used in `diningMenuTimings` and in the API.
   - Add the new location's timings to `diningMenuTimings`.
   - Add the new API URL for today’s menu at the top of the script (e.g., `const newLocationTodayApiUrl = "...";`).
   - Update the logic in `fetchTodayMenu` and anywhere else that checks for location names, so the new location is supported.
4. Save and test the widget. The new tab should appear and show menu data if the API is set up for it.

---

## 4. How to Use AI to Fix Bugs or Add Features

If you want to fix a bug or add a new feature, you can use an AI assistant (like GitHub Copilot or ChatGPT) to help you. Here’s how to get the best results:

1. **Be specific:** Clearly describe what you want to change. For example: “Change the background color of the menu to purple” or “Add a new tab for ‘Tommie Grill’.”
2. **Copy the relevant code:** If possible, copy and paste the part of the code you want to change into the AI prompt.
3. **Ask for step-by-step help:** For example, “How do I add a new meal time called ‘Brunch’ to the widget?”
4. **Review the AI’s suggestion:** Make sure the code makes sense and matches your needs before pasting it into the widget.
5. **Test your changes:** After updating the code, save and refresh the widget to make sure it works as expected.

---

## Contact

- For backend/API issues: Contact the technical maintainer listed in the API documentation or GitHub repo.
- For widget appearance or content issues: Contact your web/content team or the person who manages the website.
