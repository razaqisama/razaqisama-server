import express from "express";
import { ArticleController } from '../controllers';

const router = express.Router();

router.get("/", ArticleController.getAll);
router.get("/:slug", ArticleController.findOneBySlug);
router.post("/", ArticleController.createOne);
router.put("/:id", ArticleController.updateOne);
router.delete("/:id", ArticleController.deleteOne);


export default router;
