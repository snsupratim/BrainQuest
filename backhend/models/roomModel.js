import mongoose from "mongoose";

// Define the schema for questions
const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
  correctUsers: {
    type: [String], // This will store an array of usernames who gave the correct answer
    default: [], // By default, it will be an empty array
  },
});
// Define the schema for rooms
const roomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    roomCode: {
      type: String,
      required: true,
      // unique: true,
    },
    questions: [questionSchema],
    joined: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
