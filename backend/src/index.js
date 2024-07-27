import dotenv from "dotenv";
import connectDB from "../db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.on("error", (error) => {
    console.log("error : " + error);
    throw error;
  });

  app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
  });
});
