const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
