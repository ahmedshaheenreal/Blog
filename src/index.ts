import express from "express";
import { configDotenv } from "dotenv";
import router from "./routes/router";
import errorHandler from "./utils/errorHandler";

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(errorHandler);
export const server = app.listen(PORT, () => {
  console.log("Server running on localhost on port ", PORT);
});
export default app;
