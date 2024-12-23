import express from "express";
import {
  answerUser,
  createRoom,
  deleteRoom,
  enterAndGetRoom,
  enterUser,
  getRoom,
} from "../controllers/roomController.js";
import adminRoute from "../middlewares/adminRoute.js";
import protectRoute from "../middlewares/protectRoute.js";
import roomRoute from "../middlewares/roomRoute.js";

const router = express.Router();
// router.get("/:roomCode", getRoom);
router.post("/answer/:roomId/:questionId", protectRoute, answerUser);
// router.post("/entry", enterUser);
router.post("/entry", enterAndGetRoom); //protectroute
router.post("/create", createRoom); // adminRoute
router.delete("/:id", adminRoute, deleteRoom); // adminRoute

export default router;
