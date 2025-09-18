"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AptitudeQuiz.css"

interface Question {
  id: number
  question: string
  options: string[]
  category: "science" | "commerce" | "arts" | "technical" | "creative"
}

const AptitudeQuiz: React.FC = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      question: "Which subject do you find most interesting?",
      options: ["Mathematics and Physics", "Business and Economics", "Literature and History", "Computer Programming"],
      category: "science",
    },
    {
      id: 2,
      question: "What type of activities do you enjoy most?",
      options: [
        "Conducting experiments and research",
        "Managing projects and leading teams",
        "Writing and creative expression",
        "Building and fixing things",
      ],
      category: "technical",
    },
    {
      id: 3,
      question: "Which career environment appeals to you?",
      options: [
        "Laboratory or research facility",
        "Corporate office or business setting",
        "Creative studio or cultural institution",
        "Technology company or startup",
      ],
      category: "commerce",
    },
    {
      id: 4,
      question: "What motivates you most in your work?",
      options: [
        "Discovering new knowledge and solutions",
        "Achieving financial success and growth",
        "Expressing creativity and inspiring others",
        "Solving complex technical problems",
      ],
      category: "creative",
    },
    {
      id: 5,
      question: "Which skill would you most like to develop?",
      options: [
        "Advanced analytical and research skills",
        "Leadership and business management",
        "Artistic and communication abilities",
        "Programming and technical expertise",
      ],
      category: "arts",
    },
  ]

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store results in localStorage for the results page
    const results = {
      answers,
      timestamp: new Date().toISOString(),
      totalQuestions: questions.length,
      completedQuestions: Object.keys(answers).length,
    }

    localStorage.setItem("quizResults", JSON.stringify(results))
    navigate("/quiz-results")
  }

  const isCurrentQuestionAnswered = answers[questions[currentQuestion].id] !== undefined
  const totalAnswered = Object.keys(answers).length
  const progressPercentage = (totalAnswered / questions.length) * 100

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {/* Header */}
        <div className="quiz-header">
          <h1 className="quiz-title">Career Aptitude Assessment</h1>
          <p className="quiz-subtitle">Discover your strengths and find the perfect career path</p>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-info">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-number">Question {currentQuestion + 1}</div>

          <h2 className="question-text">{questions[currentQuestion].question}</h2>

          <div className="options-list">
            {questions[currentQuestion].options.map((option, index) => (
              <label
                key={index}
                className={`option-item ${answers[questions[currentQuestion].id] === index ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${questions[currentQuestion].id}`}
                  value={index}
                  checked={answers[questions[currentQuestion].id] === index}
                  onChange={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                />
                <div className="option-content">
                  <div className="option-radio"></div>
                  <span className="option-text">{option}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="quiz-navigation">
          <button onClick={handlePrevious} disabled={currentQuestion === 0} className="btn btn-secondary nav-btn">
            ← Previous
          </button>

          <div className="question-indicators">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentQuestion ? "current" : answers[questions[index].id] !== undefined ? "completed" : ""
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={totalAnswered < questions.length || isSubmitting}
              className="btn btn-primary nav-btn submit-btn"
            >
              {isSubmitting ? "Processing..." : "Submit Quiz"}
            </button>
          ) : (
            <button onClick={handleNext} disabled={!isCurrentQuestionAnswered} className="btn btn-primary nav-btn">
              Next →
            </button>
          )}
        </div>

        {/* Quiz Info */}
        <div className="quiz-info">
          <div className="info-card">
            <h3>📊 About This Assessment</h3>
            <ul>
              <li>Takes approximately 5-10 minutes to complete</li>
              <li>Analyzes your interests and aptitudes</li>
              <li>Provides personalized career recommendations</li>
              <li>Suggests suitable academic streams</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AptitudeQuiz
