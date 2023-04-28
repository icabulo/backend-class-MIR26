import express from "express";
import {
  login,
  generateToken,
  register,
} from "../controllers/user.controller.js";

const router = express.Router();
router.post("/login", login, generateToken); //1. se ejecuta el middleware login (es middleware porque tiene next)
router.post("/", register);

export default router;
