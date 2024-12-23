import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./quest.css";

const Quest = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Track if the room is successfully joined
  const [questions, setQuestions] = useState([]); // Store questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [userAnswer, setUserAnswer] = useState(""); // Store user's answer

  const navigate = useNavigate();

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/rooms/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, roomCode }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to join room");
        return;
      }

      // Set success state
      setSuccess(true);
      setError(null);

      // Set questions from the response
      setQuestions(data.room.questions);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const handleAnswerSubmit = async () => {
    const currentQuestion = questions[currentQuestionIndex];

    try {
      const response = await fetch(
        `/api/rooms/${roomCode}/questions/${currentQuestion._id}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userAnswer }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit answer");
        return;
      }

      alert(data.message); // Show success or failure message
      setUserAnswer(""); // Reset the answer input
      setError(null);

      // Move to the next question or show completion message
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        alert("You have completed all the questions!");
        navigate("/"); // Redirect to the home page or another appropriate page
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="enter-room">
      <h1>Join Room</h1>

      {!success ? (
        // Show the form to join the room
        <form onSubmit={handleJoinRoom} className="form">
          {error && <p className="error">{error}</p>}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
          <label htmlFor="roomCode">Room Code</label>
          <input
            type="text"
            id="roomCode"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            required
            placeholder="Enter room code"
          />
          <button type="submit">Join Room</button>
        </form>
      ) : questions.length === 0 ? (
        // Display a message if no questions are loaded yet
        <p className="success">You have successfully joined the room!</p>
      ) : (
        // Display the question page
        <div className="question-page">
          <h1>Room: {roomCode}</h1>
          <div className="question-container">
            <p>
              Question {currentQuestionIndex + 1}/{questions.length}
            </p>
            <h2>{questions[currentQuestionIndex].questionText}</h2>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <button onClick={handleAnswerSubmit}>Submit Answer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quest;
