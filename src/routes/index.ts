import express from "express";
import ArticleRoute from './Article';
import UserRoute from './User';

const router = express.Router();

router.use("/articles", ArticleRoute);
router.use("/users", UserRoute);

export default router;
