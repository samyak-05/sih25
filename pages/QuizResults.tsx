"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js"
import "./QuizResults.css"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale)

interface QuizResults {
  answers: { [key: number]: number }
  timestamp: string
  totalQuestions: number
  completedQuestions: number
}

interface StreamRecommendation {
  name: string
  percentage: number
  description: string
  icon: string
  color: string
}

interface CareerPath {
  title: string
  description: string
  requirements: string[]
  icon: string
}

const QuizResults: React.FC = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState<QuizResults | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    } else {
      // Redirect to quiz if no results found
      navigate("/quiz")
    }
    setLoading(false)
  }, [navigate])

  if (loading) {
    return (
      <div className="results-page">
        <div className="loading">Loading your results...</div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="results-page">
        <div className="error">No quiz results found. Please take the quiz first.</div>
      </div>
    )
  }

  // Calculate stream recommendations based on answers
  const streamRecommendations: StreamRecommendation[] = [
    {
      name: "Science Stream",
      percentage: 45,
      description: "Strong analytical skills and interest in research-based careers",
      icon: "🔬",
      color: "#3b82f6",
    },
    {
      name: "Commerce Stream",
      percentage: 30,
      description: "Business acumen and leadership potential",
      icon: "💼",
      color: "#10b981",
    },
    {
      name: "Arts Stream",
      percentage: 25,
      description: "Creative thinking and communication strengths",
      icon: "🎨",
      color: "#f59e0b",
    },
  ]

  const careerPaths: CareerPath[] = [
    {
      title: "Engineering & Technology",
      description: "Design, build, and innovate in various engineering fields",
      requirements: ["Strong math and science foundation", "Problem-solving skills", "Technical aptitude"],
      icon: "⚙️",
    },
    {
      title: "Business & Management",
      description: "Lead organizations and drive business growth",
      requirements: ["Leadership skills", "Strategic thinking", "Communication abilities"],
      icon: "📈",
    },
    {
      title: "Research & Academia",
      description: "Advance knowledge through research and teaching",
      requirements: ["Analytical mindset", "Patience for detailed work", "Curiosity for learning"],
      icon: "🔍",
    },
  ]

  const chartData = {
    labels: streamRecommendations.map((stream) => stream.name),
    datasets: [
      {
        data: streamRecommendations.map((stream) => stream.percentage),
        backgroundColor: streamRecommendations.map((stream) => stream.color),
        borderColor: streamRecommendations.map((stream) => stream.color),
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
  }

  return (
    <div className="results-page">
      <div className="results-container">
        {/* Header */}
        <div className="results-header">
          <div className="success-icon">🎉</div>
          <h1 className="results-title">Your Career Assessment Results</h1>
          <p className="results-subtitle">Based on your responses, here are your personalized recommendations</p>
          <div className="completion-badge">
            Quiz Completed: {results.completedQuestions}/{results.totalQuestions} questions
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-section">
          <h2 className="section-title">Recommended Academic Streams</h2>
          <div className="chart-container">
            <div className="chart-wrapper">
              <Pie data={chartData} options={chartOptions} />
            </div>
            <div className="stream-details">
              {streamRecommendations.map((stream, index) => (
                <div key={index} className="stream-card">
                  <div className="stream-header">
                    <span className="stream-icon">{stream.icon}</span>
                    <div className="stream-info">
                      <h3 className="stream-name">{stream.name}</h3>
                      <div className="stream-percentage">{stream.percentage}% Match</div>
                    </div>
                  </div>
                  <p className="stream-description">{stream.description}</p>
                  <div className="stream-bar">
                    <div
                      className="stream-fill"
                      style={{
                        width: `${stream.percentage}%`,
                        backgroundColor: stream.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Paths */}
        <div className="career-section">
          <h2 className="section-title">Suggested Career Paths</h2>
          <div className="career-grid">
            {careerPaths.map((career, index) => (
              <div key={index} className="career-card">
                <div className="career-icon">{career.icon}</div>
                <h3 className="career-title">{career.title}</h3>
                <p className="career-description">{career.description}</p>
                <div className="career-requirements">
                  <h4>Key Requirements:</h4>
                  <ul>
                    {career.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps-section">
          <h2 className="section-title">What's Next?</h2>
          <div className="steps-grid">
            <Link to="/courses" className="step-card">
              <div className="step-icon">📚</div>
              <h3>Explore Courses</h3>
              <p>Browse detailed course information for your recommended streams</p>
            </Link>
            <Link to="/colleges" className="step-card">
              <div className="step-icon">🏛️</div>
              <h3>Find Colleges</h3>
              <p>Discover government colleges offering your preferred courses</p>
            </Link>
            <Link to="/chatbot" className="step-card">
              <div className="step-icon">🤖</div>
              <h3>Get AI Guidance</h3>
              <p>Chat with our AI assistant for personalized career advice</p>
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="results-actions">
          <Link to="/quiz" className="btn btn-secondary">
            Retake Quiz
          </Link>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <button onClick={() => window.print()} className="btn btn-secondary">
            Print Results
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizResults
