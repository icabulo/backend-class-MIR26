import express from "express";
import {
  getAllGestor,
  getOneGestor,
  createGestor,
  updateGestor,
  deleteOneGestor,
} from "../controllers/gestor.cotroller.js";
import { verifyToken } from "../controllers/user.controller.js";

const router = express.Router();

//Routes
// Select all gestores
router.get("/", verifyToken, getAllGestor);

// Select one gestor

router.get("/:id", verifyToken, getOneGestor);

//create a gestor
router.post("/", verifyToken, createGestor);

//update a gestor
router.put("/:id", verifyToken, updateGestor);

//delete a gestor
router.delete("/:id", verifyToken, deleteOneGestor);

export default router;
