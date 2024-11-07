import express from "express";
import sequelize from "./config/database"; // Assuming this is your sequelize instance
import fs from "fs";
import path from "path";

const app = express();

// Load all models (if not already loaded in another place)
const modelsPath = path.join(__dirname, "models");
fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(modelsPath, file)).default;
    if (model) {
      // Register models with sequelize instance if they are not defined yet
    }
  });

// Sync the models with the database
sequelize
  .sync({ alter: true }) // `alter: true` will update the tables without dropping them
  .then(() => {
    console.log("All tables synchronized successfully.");
    // Start your server after syncing the database
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Error syncing tables:", error);
  });
