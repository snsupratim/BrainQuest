import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
  answeruser,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile); //#4

router.post("/signup", signupUser); //#1

router.post("/login", loginUser); //#2

router.post("/logout", logoutUser); //#3
// not needed
router.post("/follow/:id", protectRoute, followUnFollowUser);
// router.post("/answer/:roomId/:questionId", answeruser);

router.put("/update/:id", protectRoute, updateUser); //#5

export default router;
