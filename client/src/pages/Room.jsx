import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import "./Room.css"; // Assuming Chakra UI is used for notifications

const Room = () => {
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const toast = useToast();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = questions.map((q, i) => {
      if (i === qIndex) {
        const updatedOptions = q.options.map((opt, j) =>
          j === oIndex ? value : opt
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/rooms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomName, roomCode, questions }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Room created successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setRoomName("");
        setRoomCode("");
        setQuestions([
          { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
        ]);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create the room.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong while creating the room.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Room Name:</label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Room Code:</label>
        <input
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          required
        />
      </div>
      <div>
        <h3>Questions</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <label>Question Text:</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) =>
                handleInputChange(index, "questionText", e.target.value)
              }
              required
            />
            <label>Options:</label>
            {question.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, oIndex, e.target.value)
                }
                placeholder={`Option ${oIndex + 1}`}
                required
              />
            ))}
            <label>Correct Answer:</label>
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) =>
                handleInputChange(index, "correctAnswer", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
      <button type="submit">Create Room</button>
    </form>
  );
};

export default Room;
