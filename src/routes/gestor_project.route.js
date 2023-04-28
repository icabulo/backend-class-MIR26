import express from "express";
import {
  createGestorProject,
  getAllGestorProject,
} from "../controllers/gestor_project.controller.js";

const router = express.Router();

//Create a project
router.post("/", createGestorProject);
router.get("/", getAllGestorProject);

export default router;
