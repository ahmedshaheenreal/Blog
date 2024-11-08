import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv();
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    logging: console.log,
  }
);
// sequelize
//   .sync()
//   .then(() => console.log("Database & tables synced"))
//   .catch((error) => console.error("Error syncing database:", error));
export default sequelize;
