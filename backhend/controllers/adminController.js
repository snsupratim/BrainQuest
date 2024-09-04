import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/admins/generaterTokenAndSetCookie.js";
import Admin from "../models/adminModel.js";

const signupAdmin = async (req, res) => {
  try {
    const { name, email, adminname, password } = req.body;
    const admin = await Admin.findOne({ $or: [{ email }, { adminname }] });
    if (admin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      adminname,
      password: hashedPassword,
    });
    await newAdmin.save();

    if (newAdmin) {
      generateTokenAndSetCookie(newAdmin._id, res);
      res.status(201).json({
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        adminname: newAdmin.adminname,
      });
    } else {
      res.status(400).json({ error: "Invalid admin Data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Errr in signupAdmin:", err.message);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { adminname, password } = req.body;
    const admin = await Admin.findOne({ $or: [{ adminname }] });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin?.password || ""
    );
    if (!admin || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid adminname or password" });

    generateTokenAndSetCookie(admin._id, res);
    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      adminname: admin.adminname,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Errr in loginAdmin:", err.message);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "admin logged out succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Errr in loginAdmin:", err.message);
  }
};

export { signupAdmin, loginAdmin, logoutAdmin };
