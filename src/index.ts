import express from "express";
import { configDotenv } from "dotenv";
import router from "./routes/router";
import errorHandler from "./utils/errorHandler";
import sequelize from "./config/database";
import "./models";
import { Sequelize } from "sequelize";
const PORT = process.env.PORT || 3000;
configDotenv();
function app(database: Sequelize | any) {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", router);
  app.use(errorHandler);

  // sequelize
  //   .sync({ alter: true })
  //   .then(() => console.log("Database & tables synced"))
  //   .catch((error) => console.error("Error syncing database:", error));

  return app;
}
export const server = app(sequelize).listen(PORT, () => {
  console.log("Server running on localhost on port ", PORT);
});

export default app;
