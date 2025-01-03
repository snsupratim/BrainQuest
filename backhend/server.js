import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { v2 as cloudinary } from "cloudinary";
// import cors from "cors";
dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json()); //to parse json data in the req.body
app.use(express.urlencoded({ extended: false })); // to parse from data in req.body
app.use(cookieParser());
// app.use(cors());

//Routes

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admins", adminRoutes);

app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);
