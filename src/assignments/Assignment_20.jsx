import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_20.css";

const Assignment_20 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://apis.dnjs.lk/objects/quiz.php");
      setQuestions(response.data);
      setUserAnswers(new Array(response.data.length).fill(-1)); // Initialize with -1 (no answer)
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load questions:", error);
      setIsLoading(false);
    }
  };

  const handleAnswer = (answerIndex) => {
    if (showResult) return;

    const currentQuestion = questions[currentIndex];
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // Store user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = answerIndex;
    setUserAnswers(newUserAnswers);

    if (answerIndex === currentQuestion.correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowReview(false);
    setReviewIndex(0);
    loadQuestions();
  };

  const startReview = () => {
    setShowReview(true);
    setReviewIndex(0);
  };

  const nextReviewQuestion = () => {
    if (reviewIndex < questions.length - 1) {
      setReviewIndex(reviewIndex + 1);
    }
  };

  const lastReviewQuestion = () => {
    if (reviewIndex > 0) {
      setReviewIndex(reviewIndex - 1);
    }
  };

  const backToScore = () => {
    setShowReview(false);
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading quiz...</div>
      </div>
    );
  }

  if (isComplete && !showReview) {
    return (
      <div className="container">
        <div className="complete">
          <h1>🎉 Quiz Complete!</h1>
          <p className="final-score">
            You scored {score} out of {questions.length}
          </p>
          <p>{Math.round((score / questions.length) * 100)}%</p>
          <div className="complete-buttons">
            <button className="restart-btn" onClick={restart}>
              Try Again
            </button>
            <button className="review-btn" onClick={startReview}>
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review Section
  if (showReview) {
    const reviewQuestion = questions[reviewIndex];
    const userAnswer = userAnswers[reviewIndex];

    return (
      <div className="container">
        <div className="quiz">
          <div className="header">
            <h1>Assignment #20 - Review</h1>
            <p>
              Question {reviewIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="question-card">
            <div className="review-answers">
              {reviewQuestion.answers.map((answer, index) => {
                let answerClass = "review-answer";
                
                if (index === reviewQuestion.correct) {
                  answerClass += " correct-answer";
                } else if (index === userAnswer && index !== reviewQuestion.correct) {
                  answerClass += " wrong-answer";
                } else {
                  answerClass += " other-answer";
                }

                return (
                  <div key={index} className={answerClass}>
                    {answer}
                  </div>
                );
              })}
            </div>

            <h2 className="question">{reviewQuestion.question}</h2>

            <div className="review-navigation">
              <button 
                className="nav-btn" 
                onClick={lastReviewQuestion}
                disabled={reviewIndex === 0}
              >
                Last
              </button>
              <button 
                className="nav-btn" 
                onClick={nextReviewQuestion}
                disabled={reviewIndex === questions.length - 1}
              >
                Next
              </button>
            </div>

            <div className="review-info">
              <p>
                <strong>Your answer:</strong> {userAnswer >= 0 ? reviewQuestion.answers[userAnswer] : "No answer"}
              </p>
              <p>
                <strong>Correct answer:</strong> {reviewQuestion.answers[reviewQuestion.correct]}
              </p>
              <p className={userAnswer === reviewQuestion.correct ? "correct-text" : "incorrect-text"}>
                {userAnswer === reviewQuestion.correct ? "✅ Correct" : "❌ Incorrect"}
              </p>
            </div>

            <button className="back-btn" onClick={backToScore}>
              Back to Score
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="error">No questions available</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container">
      <div className="quiz">
        <div className="header">
          <h1>Assignment #20</h1>
          <p>
            Question {currentIndex + 1} of {questions.length} | Score: {score}
          </p>
        </div>

        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="question-card">
          <h2 className="question">{currentQuestion.question}</h2>

          <div className="answers">
            {currentQuestion.answers.map((answer, index) => {
              let buttonClass = "answer-btn";

              if (showResult) {
                if (index === currentQuestion.correct) {
                  buttonClass += " correct";
                } else if (index === selectedAnswer) {
                  buttonClass += " incorrect";
                } else {
                  buttonClass += " disabled";
                }
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                >
                  {answer}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="feedback">
              {selectedAnswer === currentQuestion.correct
                ? "✅ Correct!"
                : "❌ Wrong answer"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment_20;