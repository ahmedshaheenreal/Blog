import express from "express";
import { configDotenv } from "dotenv";
import router from "./routes/router";

configDotenv();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server running on localhost on port ", PORT);
});
