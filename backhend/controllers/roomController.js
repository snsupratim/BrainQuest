import Room from "../models/roomModel.js";
import User from "../models/userModels.js";
import generateTokenAndSetCookie from "../utils/rooms/generaterTokenAndSetCookie.js";

// Function to create a new room
const createRoom = async (req, res) => {
  try {
    const { roomCode, roomName, questions } = req.body;

    // Check if all required fields are provided
    if (!roomCode || !roomName || !questions) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if a room with the same roomCode already exists
    const existingRoom = await Room.findOne({ roomCode });
    if (existingRoom) {
      return res.status(400).json({ message: "Room code must be unique" });
    }

    // Create a new Room entry
    const newRoom = new Room({ roomCode, roomName, questions });
    await newRoom.save();

    res.status(201).json({ message: "Room created successfully", newRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

const getRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const room = await Room.findOne({ roomCode });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // if (!roomCode) {
    //   return res.status(400).json({ message: "Please provide the room code" });
    // }

    // Check if the room code matches
    // if (!code) {
    //   return res.status(400).json({ message: "Invalid code provided" });
    // }

    res.status(200).json({ room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "room not found" });

    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "room deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const enterUser = async (req, res) => {
  try {
    const { username, roomCode } = req.body;

    // Find the user and room
    const user = await User.findOne({ username });
    const room = await Room.findOne({ roomCode });

    // Check if user and room exist
    if (!user || !room) {
      return res.status(400).json({ error: "Invalid username or room code" });
    }

    // Add the user to the room's participants
    room.joined.push(username);
    await room.save();

    // Update the user's profile to indicate they have joined the room
    user.joined.push(room.roomName);
    await user.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Respond with user information
    res.status(200).json({
      username: user.username,
      score: user.score,
      rank: user.rank,
      joined: user.joined, // Optionally include the rooms the user has joined
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in enterUser:", err.message);
  }
};
//answering questions

const answerUser = async (req, res) => {
  try {
    const { roomId, questionId } = req.params; // Extract roomId and questionId from URL parameters
    const { userAnswer } = req.body; // Extract userAnswer from the request body
    const userId = req.user._id; // Assume `req.user` contains authenticated user data

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
      // Check if the user is already in the correctUsers array
      if (!question.correctUsers.includes(userId.toString())) {
        question.correctUsers.push(userId.toString()); // Add the userId to the correctUsers array
      }
      await room.save(); // Save the updated room document
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

const enterAndGetRoom = async (req, res) => {
  try {
    const { username, roomCode } = req.body;

    // Find the user and room
    const user = await User.findOne({ username });
    const room = await Room.findOne({ roomCode });

    // Check if user and room exist
    if (!user || !room) {
      return res.status(400).json({ error: "Invalid username or room code" });
    }

    // Add the user to the room's participants
    room.joined.push(username);
    await room.save();

    // Update the user's profile to indicate they have joined the room
    user.joined.push(room.roomName);
    await user.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(user._id, res);

    // Respond with room and user information
    res.status(200).json({
      room: {
        roomCode: room.roomCode,
        roomName: room.roomName,
        questions: room.questions,
      },
      user: {
        username: user.username,
        score: user.score,
        rank: user.rank,
        joined: user.joined, // Include the rooms the user has joined
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in enterAndGetRoom:", err.message);
  }
};

export {
  createRoom,
  getRoom,
  deleteRoom,
  enterUser,
  answerUser,
  enterAndGetRoom,
};
