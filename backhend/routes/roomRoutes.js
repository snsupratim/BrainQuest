import express from "express";
import {
  createRoom,
  deleteRoom,
  enterUser,
  getRoom,
} from "../controllers/roomController.js";
import adminRoute from "../middlewares/adminRoute.js";
import protectRoute from "../middlewares/protectRoute.js";
import roomRoute from "../middlewares/roomRoute.js";

const router = express.Router();
router.get("/:id", roomRoute, getRoom);
router.post("/entry", protectRoute, enterUser);
router.post("/create", adminRoute, createRoom); // adminRoute
router.delete("/:id", adminRoute, deleteRoom); // adminRoute

export default router;
