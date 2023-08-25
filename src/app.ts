import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config";
import blogRoutes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(blogRoutes);

mongoose
  .connect(config.db.url || "")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
