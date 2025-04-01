import React, { useState, useEffect } from "react";

const questions = [
  { id: 1, question: "What is 5 + 3?", options: [6, 7, 8, 9], answer: 8 },
  { id: 2, question: "What is 12 - 4?", options: [6, 7, 8, 9], answer: 8 },
  { id: 3, question: "What is 6 × 2?", options: [10, 12, 14, 16], answer: 12 },
  { id: 4, question: "What is 15 ÷ 3?", options: [3, 4, 5, 6], answer: 5 },
  { id: 5, question: "What is 9 + 7?", options: [15, 16, 17, 18], answer: 16 },
  { id: 6, question: "What is 14 - 6?", options: [6, 7, 8, 9], answer: 8 },
  { id: 7, question: "What is 3 × 5?", options: [10, 12, 15, 18], answer: 15 },
  { id: 8, question: "What is 20 ÷ 4?", options: [4, 5, 6, 7], answer: 5 },
  { id: 9, question: "What is 7 + 8?", options: [13, 14, 15, 16], answer: 15 },
  { id: 10, question: "What is 10 - 3?", options: [5, 6, 7, 8], answer: 7 },
];

function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25); // 25-second timer

  useEffect(() => {
    // Shuffle questions daily
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled.slice(0, 10));
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(); // Auto-click Next when time reaches 0
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    setShowAnswer(true);
    setShowNext(false);

    setTimeout(() => {
      setShowAnswer(false);
      setShowNext(true);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(25); // Reset timer for next question
    }, 2000);
  };

  if (quizQuestions.length === 0) {
    return <h2>Loading Quiz...</h2>;
  }

  if (currentQuestionIndex >= quizQuestions.length) {
    return <h2>Quiz Completed! 🎉</h2>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#ddd",
          marginBottom: "10px",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(timeLeft / 25) * 100}%`, // Shrinks as time decreases
            height: "100%",
            backgroundColor: timeLeft <= 5 ? "red" : "#007bff",
            transition: "width 1s linear",
          }}
        ></div>
      </div>

      <h2>{quizQuestions[currentQuestionIndex].question}</h2>

      {/* Timer Display */}
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: timeLeft <= 5 ? "red" : "black",
          marginBottom: "10px",
        }}
      >
        Time Left: {timeLeft}s
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
          <li
            key={index}
            style={{
              backgroundColor: showAnswer && option === quizQuestions[currentQuestionIndex].answer ? "green" : "lightgray",
              padding: "15px",
              margin: "10px auto",
              width: "200px",
              borderRadius: "5px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {option}
          </li>
        ))}
      </ul>

      {/* Show Next button only if showNext is true */}
      {showNext && (
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Quiz;
