# Building a Widget Around the API (For Non-Technical Users)

## What is a Widget in OneStThomas?

A widget is a small, customizable box you can add to your OneStThomas page. It can show information, buttons, or even live data—like the campus dining menu—using custom HTML, CSS, and JavaScript.

## How Can You Build a Widget Like the Dining Menu?

You don't need to be a programmer! You can use AI tools (like ChatGPT, Gemini, or Copilot) to help you generate the code for your widget. Just describe what you want ("I want a box that shows today's menu from this API, with tabs for Breakfast, Lunch, and Dinner, and some nice colors"), and the AI can give you the code to copy-paste.

## Steps to Build Your Own Widget

### 1. Decide What You Want to Show

Think about what information you want in your widget. For example: "Show today's menu for The View, with tabs for each meal, and make it look modern and easy to read."

### 2. Ask AI to Generate the Code

You can use an AI assistant to generate the HTML, CSS, and JavaScript for you. Here’s an example prompt you can use:

> "Generate a widget for OneStThomas that fetches menu data from this API URL: [your-api-url-here]. It should have tabs for each meal (Breakfast, Lunch, Dinner), use my school's theme colors, and look good on both desktop and mobile."

The AI will give you code similar to this (see below). You can copy and paste it into your widget's code editor in OneStThomas.

### 3. Paste the Code into the Widget

In the OneStThomas CMS, create a new widget and paste the code into the appropriate section (HTML, CSS, and JavaScript). You can use the variables and options provided by the widget system to customize things like colors, titles, and links.

### 4. Customize with Theme Colors and Variables

You can use special variables like `var(--udl-brand-default)` for your school's colors. These make sure your widget matches the rest of the site.

### 5. Save and Preview

Save your widget and preview it on your page. If you want to change something, you can ask the AI for a new version or tweak the code yourself.

---

## Example: Dining Menu Widget Code (Copy-Paste Ready)

Below is a real, working example of a widget you can use. This code will fetch menu data from your API and display it with tabs for each meal. You can copy this code, replace the API URL, and use it in your OneStThomas widget.

```html
<style>
  .themed-button-wrapper {
    font-family: "Inter", sans-serif;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
  }
  .themed-button-wrapper .themed-box {
    background-color: var(--udl-brand-default);
    color: var(--udl-brand-default-contrast);
    border: 1px solid var(--udl-brand-default-variant);
    border-radius: 0.75rem;
    box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.15), 0 4px 8px -2px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    max-width: 900px;
    width: 100%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
  }
  .themed-button-wrapper .meal-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .themed-button-wrapper .meal-tab-button {
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--udl-brand-primary-variant);
    border-radius: 0.5rem;
    background-color: var(--udl-brand-default);
    color: var(--udl-brand-primary);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-grow: 1;
    text-align: center;
    max-width: 180px;
  }
  .themed-button-wrapper .meal-tab-button.active {
    background-color: var(--udl-brand-primary);
    color: var(--udl-brand-primary-contrast);
    border-color: var(--udl-brand-primary);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .themed-button-wrapper .themed-box__subtitle {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--udl-brand-primary);
    margin-top: 0;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--udl-brand-primary-variant);
    text-align: center;
  }
  .themed-button-wrapper .menu-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0;
    table-layout: fixed;
  }
  .themed-button-wrapper .menu-table th,
  .themed-button-wrapper .menu-table td {
    padding: 0.8rem 1rem;
    border: 1px solid var(--udl-brand-default-variant);
    text-align: left;
  }
  .themed-button-wrapper .menu-table th {
    background-color: var(--udl-brand-secondary);
    font-weight: 600;
    color: var(--udl-brand-secondary-contrast);
    font-size: 1.05rem;
  }
  .themed-button-wrapper .station-name {
    font-weight: bold;
  }
  .themed-button-wrapper .menu-item-box-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .themed-button-wrapper .menu-item-box {
    background-color: var(--udl-brand-primary-variant);
    color: var(--udl-brand-primary-contrast);
    padding: 0.4rem 0.8rem;
    border-radius: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    white-space: nowrap;
    flex-shrink: 0;
    border: 1px solid var(--udl-brand-primary);
  }
</style>

<div class="themed-button-wrapper">
  <div class="themed-box menu-content-container">
    <p class="themed-box__description">Loading Menu...</p>
  </div>
</div>

<script type="text/javascript">
  (function () {
    const apiUrl = "https://your-api-url-here"; // Replace with your real API endpoint
    const widgetWrapper = document.currentScript.previousElementSibling;
    const contentBox = widgetWrapper.querySelector(".menu-content-container");
    let allMenuData = [];

    function renderMenu(mealTitle) {
      contentBox.innerHTML = "";
      const mealTabsContainer = document.createElement("div");
      mealTabsContainer.className = "meal-tabs";
      contentBox.appendChild(mealTabsContainer);
      allMenuData.forEach((meal) => {
        if (meal.table_title) {
          const button = document.createElement("button");
          button.className = "meal-tab-button";
          button.textContent = meal.table_title;
          if (meal.table_title === mealTitle) button.classList.add("active");
          button.addEventListener("click", () => renderMenu(meal.table_title));
          mealTabsContainer.appendChild(button);
        }
      });
      const selectedMeal = allMenuData.find(
        (meal) => meal.table_title === mealTitle
      );
      if (!selectedMeal || !selectedMeal.menu) {
        contentBox.insertAdjacentHTML(
          "beforeend",
          `<p class="themed-box__description">No menu details available for ${mealTitle}.</p>`
        );
        return;
      }
      let menuContentHtml = `<h4 class="themed-box__subtitle">${selectedMeal.table_title}</h4><table class="menu-table"><thead><tr><th>Station</th><th>Items</th></tr></thead><tbody>`;
      for (const [station, items] of Object.entries(selectedMeal.menu)) {
        if (items && Array.isArray(items) && items.length > 0) {
          menuContentHtml += `<tr><td data-label="Station" class="station-name">${station}</td><td data-label="Items"><ul class="menu-item-box-container">`;
          for (const item of items) {
            menuContentHtml += `<li class="menu-item-box">${item}</li>`;
          }
          menuContentHtml += `</ul></td></tr>`;
        }
      }
      menuContentHtml += `</tbody></table>`;
      contentBox.insertAdjacentHTML("beforeend", menuContentHtml);
    }

    contentBox.innerHTML = `<p class="themed-box__description">Loading Menu...</p>`;
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((menuData) => {
        allMenuData = menuData.data || menuData;
        if (!allMenuData || allMenuData.length === 0) {
          contentBox.innerHTML = `<p class="themed-box__description">No menu available for today.</p>`;
          return;
        }
        if (allMenuData[0] && allMenuData[0].table_title) {
          renderMenu(allMenuData[0].table_title);
        } else {
          contentBox.innerHTML = `<p class="themed-box__description">Could not parse menu data correctly.</p>`;
        }
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        contentBox.innerHTML = `<p class="themed-box__description">Cannot load menu. Please try again later.</p>`;
      });
  })();
</script>
```

You can copy this code, replace the API URL with your own, and paste it into your widget. The widget will automatically fetch and display the menu with tabs for each meal.

---

## Tips for Non-Technical Users

- **Describe what you want clearly to the AI.** The more details you give, the better the code will match your needs.
- **Use your school's theme variables** (like `var(--udl-brand-default)`) to keep your widget looking consistent.
- **Preview and test** your widget before publishing.
- **Ask for help!** If you get stuck, you can always ask the AI for a different version or more explanation.

---

## Summary

You don’t need to write code from scratch. Use AI to generate the widget code, customize it with your own text and colors, and paste it into OneStThomas. This way, anyone can build beautiful, functional widgets—no programming required!
