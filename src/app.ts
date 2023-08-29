import "dotenv/config";
import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import { config } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use('/', router.get('/', (_req, res) => {
  res.send('Server is up');
}));
app.use('/api/v1', routes);
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
