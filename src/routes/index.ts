import express from "express";
import ArticleRoute from './Article';

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Application Deployed",
  });
});

router.use("/articles", ArticleRoute);

export default router;
