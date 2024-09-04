import jwt from "jsonwebtoken";
import Room from "../models/roomModel.js";

const roomRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET2);

    const room = await Room.findById(decoded.roomId);

    req.room = room;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in loginRoom:", error.message);
  }
};

export default roomRoute;
