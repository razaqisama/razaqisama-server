import express from "express";
import { UserController } from '../controllers';

const router = express.Router();

router.get("/", UserController.getAll);
router.post("/register", UserController.register);
router.post("/login", UserController.login);


export default router;
