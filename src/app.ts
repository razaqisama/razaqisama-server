import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);
app.use(errorHandler);

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
