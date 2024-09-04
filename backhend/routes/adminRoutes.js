import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  signupAdmin,
} from "../controllers/adminController.js";

// import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// router.get("/profile/:username", getUserProfile);

router.post("/signup", signupAdmin);

router.post("/login", loginAdmin);

router.post("/logout", logoutAdmin);

// router.post("/update/:id", protectRoute, updateUser);

export default router;
