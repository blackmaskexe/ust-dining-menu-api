
# Hosting the Dining Menu API on AWS: A Simple Overview

This project is split into two main parts, both running on AWS (Amazon Web Services). Here’s a basic, non-technical explanation of how it works:

## 1. Scraping and Interpreting the Menu (AWS Lambda + AI)

- **Automated Scraping:**
  - A small program (called a Lambda function) runs in the cloud. It visits the official dining menu website and grabs the latest menu data.
- **AI Interpretation:**
  - The raw menu data is often messy, so the Lambda function sends it to an AI model to turn it into a clean, easy-to-use format (JSON).
  - **Important:** If you use a paid AI model, you can get charged a lot because the menu data is large! Always use a free or very cheap AI model (like Google Gemini, which is free for proof-of-concept use) to avoid unexpected costs.
- **Storing the Data:**
  - Once the AI has cleaned up the menu, the Lambda function saves it into a DynamoDB database (a cloud-based table for storing data).

## 2. Serving the Menu to Users (API Gateway + Lambda)

- **API Endpoints:**
  - Another Lambda function reads the menu data from DynamoDB.
  - It provides different API endpoints, such as:
    - **Menu Now:** Shows only what’s available right now.
    - **Menu Today:** Shows everything available today.
  - These endpoints do some processing to make sure users only get the information they need (not the whole week’s menu at once).

## Why This Setup?

- **Automatic Updates:** The menu updates itself without anyone having to do it manually.
- **Always Available:** The API is always online and can handle many users at once.
- **Cost Control:** By using free/cheap AI and serverless functions, you keep costs low.

## Final Notes

- If you want to see the technical details or code, check out the [GitHub repository](https://github.com/blackmaskexe/ust-dining-menu-api/).
- If you’re setting this up yourself, always double-check which AI model you’re using to avoid surprise charges!

---

## Technical Details

Below are some technical specifics for those interested in how the system is built and deployed:

### 1. AWS Lambda Functions
- **Language/Runtime:** Node.js 22
- **Two Lambda Functions:**
  - `menu-scraper` stack: Scrapes and processes menu data
  - `menu-api` stack: Serves menu data via API endpoints
- **Environment Variables:**
  - Only the scraper Lambda uses an environment variable for the Gemini API Key
- **Timeouts:**
  - Scraper Lambda hahasve a 10-minute timeout (AI usually completes in under 1 minute, timeout is just to be safe in case of overloading of AI)

### 2. AI Model
- **Model Used:** Gemini 2.0 Flash (Google)
- **Why Gemini?** It is fast, free for proof-of-concept, and accurate. If you upgrade to a paid tier, costs are still very low (just cents per use). **Always use a free/cheap model to avoid high costs!**
- **API Key Storage:**
  - Gemini API Key is stored in AWS Parameter Store (auto-created on deploy; replace with your own key)
- **Error Handling:**
  - If Gemini API fails (usually due to the source website not being updated), the menu data is left blank for that location

### 3. DynamoDB Table
- **Structure:**
  - Partition Key: Dining location (e.g., `theView`)
  - Sort Key: Week number (e.g., `2025-W31`)
  - Other fields: Timestamp, location, and a JSON array of menu data
- **Retrieval:**
  - To get the correct menu, you must know both the week number and the dining location

### 4. API Endpoints
- **API Gateway** exposes endpoints for both The View and Northsider locations:
  - `/api/view-menu-now` — Current meal for The View
  - `/api/view-menu-today` — All meals for today for The View
  - `/api/northsider-menu-now` — Current meal for Northsider
  - `/api/northsider-menu-today` — All meals for today for Northsider
- **Swagger/OpenAPI:**
  - The API is documented using OpenAPI (Swagger) for easy integration and testing.
- **Authentication:**
  - No authentication is currently required (open API, but security will be added in the future)

### 5. Deployment & CI/CD
- **Deployment Tool:** [Serverless Framework](https://www.serverless.com/)
- **CI/CD Pipeline:**
  - Code is automatically deployed when pushed to the repository, using a pipeline configuration maintained by Chad Cluck (ITS, University of St. Thomas). See [this documentation](https://github.com/63Klabs/atlantis-cfn-configuration-repo-for-serverless-deployments) for more info on the pipeline process.
- **Scraping Schedule:**
  - Scraping Lambda runs every Sunday at 3am UTC (cron via `events::rule`, will be upgraded to `scheduler::schedule`)
- **Logging & Tracing:**
  - All logs are sent to CloudWatch Logs
  - AWS X-Ray is enabled in production for tracing
- **Frontend Error Handling:**
  - Most user-facing error handling is done in the widget/component that displays the menu (see documentation part 03)
- **Backend Error Handling:**
  - If scraping or AI fails, blank data is stored for that location/week
  - Logs and traces can be checked in CloudWatch/X-Ray for debugging

---
