import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generaterTokenAndSetCookie.js";
import Room from "../models/roomModel.js";
import { v2 as cloudinary } from "cloudinary";

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user Data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Errr in signUser:", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ $or: [{ username }] });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" });

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Errr in loginUser:", err.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "user logged out succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Errr in loginUser:", err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "you cannot follow/unfollow yourself" });

    if (!userToModify) return res.status(400).json({ error: "user not found" });

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      //unfollow user
      // modify currentb user following ,modify followers
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "unfollowed" });
    } else {
      //follow user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "followed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Errr in followUnFollowUser:", err.message);
  }
};
const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "user not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ message: "you cannot update someone else profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();
    // password should be null
    user.password = null;
    res.status(200).json({ message: "profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("error in updateuser", err.message);
  }
};

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updateAt");
    if (!user) return res.status(400).json({ message: "user not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in getprofile", err.message);
  }
};
const answeruser = async (req, res) => {
  try {
    const { roomId, questionId } = req.params; // Extract roomId and questionId from req.params
    const { userAnswer } = req.body; // Extract userAnswer from req.body
    const username = req.user._id;

    // Find the room by ID
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Find the question within the room's questions array by questionId
    const question = room.questions.id(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found in the room" });
    }

    // Compare the user's answer with the correct answer
    if (question.correctAnswer === userAnswer) {
      // Check if the user has already been added to the correctUsers array
      if (!question.correctUsers.includes(username)) {
        question.correctUsers.push(username); // Add the user's name to the correctUsers array
        await room.save(); // Save the updated room
      }

      return res
        .status(200)
        .json({ message: "Correct answer", isCorrect: true });
    } else {
      return res
        .status(200)
        .json({ message: "Incorrect answer", isCorrect: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
  answeruser,
};
