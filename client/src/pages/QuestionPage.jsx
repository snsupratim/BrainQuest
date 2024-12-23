import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./questionpage.css";

const QuestionPage = () => {
  const { roomCode } = useParams(); // Get the roomCode from the URL
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the questions for the room
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/rooms/${roomCode}/questions`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load questions");
          return;
        }

        setQuestions(data.questions || []);
        setLoading(false);
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [roomCode]);

  const handleSubmitAnswer = async () => {
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

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="error">{error}</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-page">
      <h1>Room: {roomCode}</h1>
      <div className="question-container">
        <p>
          Question {currentQuestionIndex + 1}/{questions.length}
        </p>
        <h2>{currentQuestion.questionText}</h2>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
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
        <button onClick={handleSubmitAnswer}>Submit Answer</button>
      </div>
    </div>
  );
};

export default QuestionPage;
