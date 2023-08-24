import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Application Deployed",
  });
});

router.get("/blogs", (_req, res) => {
  res.send("/blog-post");
});
// Add more routes as needed

export default router;
