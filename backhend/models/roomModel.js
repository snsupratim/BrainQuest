import mongoose from "mongoose";

// Define the schema for questions
const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
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
