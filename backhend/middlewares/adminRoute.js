import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

const adminRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET0);

    const admin = await Admin.findById(decoded.adminId).select("-password");

    req.admin = admin;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in loginAdmin:", error.message);
  }
};

export default adminRoute;
