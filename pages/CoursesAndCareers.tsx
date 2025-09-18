"use client"

import type React from "react"
import { useState } from "react"
import "./CoursesAndCareers.css"

interface Course {
  id: number
  name: string
  stream: "Science" | "Commerce" | "Arts"
  duration: string
  description: string
  careerOptions: string[]
  eligibility: string
  averageSalary: string
  icon: string
  difficulty: "Easy" | "Medium" | "Hard"
  popularity: number
}

const CoursesAndCareers: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")

  const courses: Course[] = [
    {
      id: 1,
      name: "B.Tech Computer Science",
      stream: "Science",
      duration: "4 years",
      description:
        "Comprehensive program covering programming, algorithms, software engineering, and emerging technologies.",
      careerOptions: ["Software Engineer", "Data Scientist", "Product Manager", "Tech Entrepreneur"],
      eligibility: "12th with PCM, JEE Main/Advanced",
      averageSalary: "₹6-15 LPA",
      icon: "💻",
      difficulty: "Hard",
      popularity: 95,
    },
    {
      id: 2,
      name: "MBBS",
      stream: "Science",
      duration: "5.5 years",
      description:
        "Medical degree program for aspiring doctors, covering anatomy, physiology, pathology, and clinical practice.",
      careerOptions: ["Doctor", "Surgeon", "Medical Researcher", "Healthcare Administrator"],
      eligibility: "12th with PCB, NEET",
      averageSalary: "₹8-25 LPA",
      icon: "🩺",
      difficulty: "Hard",
      popularity: 90,
    },
    {
      id: 3,
      name: "B.Com",
      stream: "Commerce",
      duration: "3 years",
      description: "Business and commerce fundamentals including accounting, finance, economics, and business law.",
      careerOptions: ["Chartered Accountant", "Financial Analyst", "Business Manager", "Entrepreneur"],
      eligibility: "12th with Commerce/Any stream",
      averageSalary: "₹3-8 LPA",
      icon: "💼",
      difficulty: "Medium",
      popularity: 85,
    },
    {
      id: 4,
      name: "BBA",
      stream: "Commerce",
      duration: "3 years",
      description:
        "Business administration program focusing on management, marketing, finance, and organizational behavior.",
      careerOptions: ["Business Analyst", "Marketing Manager", "HR Manager", "Operations Manager"],
      eligibility: "12th with any stream",
      averageSalary: "₹4-10 LPA",
      icon: "📊",
      difficulty: "Medium",
      popularity: 80,
    },
    {
      id: 5,
      name: "B.A. English",
      stream: "Arts",
      duration: "3 years",
      description: "Literature, language studies, creative writing, and communication skills development.",
      careerOptions: ["Content Writer", "Journalist", "Teacher", "Editor", "Civil Services"],
      eligibility: "12th with any stream",
      averageSalary: "₹3-7 LPA",
      icon: "📚",
      difficulty: "Easy",
      popularity: 70,
    },
    {
      id: 6,
      name: "B.A. Psychology",
      stream: "Arts",
      duration: "3 years",
      description: "Study of human behavior, mental processes, and psychological research methods.",
      careerOptions: ["Psychologist", "Counselor", "HR Specialist", "Research Analyst"],
      eligibility: "12th with any stream",
      averageSalary: "₹3-8 LPA",
      icon: "🧠",
      difficulty: "Medium",
      popularity: 75,
    },
    {
      id: 7,
      name: "B.Sc Physics",
      stream: "Science",
      duration: "3 years",
      description: "Fundamental physics concepts, quantum mechanics, thermodynamics, and research methodology.",
      careerOptions: ["Research Scientist", "Physics Teacher", "Data Analyst", "Technical Writer"],
      eligibility: "12th with PCM",
      averageSalary: "₹4-9 LPA",
      icon: "⚛️",
      difficulty: "Hard",
      popularity: 65,
    },
    {
      id: 8,
      name: "B.Des",
      stream: "Arts",
      duration: "4 years",
      description: "Design thinking, visual communication, user experience, and creative problem-solving.",
      careerOptions: ["UI/UX Designer", "Graphic Designer", "Product Designer", "Creative Director"],
      eligibility: "12th with any stream, Design Aptitude Test",
      averageSalary: "₹4-12 LPA",
      icon: "🎨",
      difficulty: "Medium",
      popularity: 78,
    },
  ]

  const streams = ["All", "Science", "Commerce", "Arts"]

  const filteredCourses = courses.filter((course) => {
    const matchesStream = selectedStream === "All" || course.stream === selectedStream
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.careerOptions.some((career) => career.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStream && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "#10b981"
      case "Medium":
        return "#f59e0b"
      case "Hard":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="courses-page">
      <div className="courses-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Courses & Career Paths</h1>
          <p className="page-subtitle">
            Explore comprehensive course information and discover exciting career opportunities in your field of
            interest.
          </p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search courses, careers, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>

          <div className="stream-filters">
            <label className="filter-label">Filter by Stream:</label>
            <div className="filter-buttons">
              {streams.map((stream) => (
                <button
                  key={stream}
                  onClick={() => setSelectedStream(stream)}
                  className={`filter-btn ${selectedStream === stream ? "active" : ""}`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <span>
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
          </span>
          {searchTerm && <span> for "{searchTerm}"</span>}
          {selectedStream !== "All" && <span> in {selectedStream} stream</span>}
        </div>

        {/* Course Cards */}
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <div className="course-icon">{course.icon}</div>
                <div className="course-meta">
                  <span className="course-stream">{course.stream}</span>
                  <span className="course-duration">{course.duration}</span>
                </div>
              </div>

              <h3 className="course-name">{course.name}</h3>
              <p className="course-description">{course.description}</p>

              <div className="course-details">
                <div className="detail-item">
                  <strong>Eligibility:</strong>
                  <span>{course.eligibility}</span>
                </div>
                <div className="detail-item">
                  <strong>Average Salary:</strong>
                  <span>{course.averageSalary}</span>
                </div>
                <div className="detail-item">
                  <strong>Difficulty:</strong>
                  <span className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(course.difficulty) }}>
                    {course.difficulty}
                  </span>
                </div>
              </div>

              <div className="popularity-section">
                <div className="popularity-label">Popularity</div>
                <div className="popularity-bar">
                  <div className="popularity-fill" style={{ width: `${course.popularity}%` }}></div>
                </div>
                <div className="popularity-score">{course.popularity}%</div>
              </div>

              <div className="career-options">
                <h4>Career Opportunities:</h4>
                <div className="career-tags">
                  {course.careerOptions.map((career, index) => (
                    <span key={index} className="career-tag">
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              <div className="course-actions">
                <button className="btn btn-primary">Learn More</button>
                <button className="btn btn-secondary">Find Colleges</button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No courses found</h3>
            <p>Try adjusting your search terms or filters to find relevant courses.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedStream("All")
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Career Flow Diagram */}
        <div className="career-flow-section">
          <h2 className="section-title">Career Progression Path</h2>
          <div className="flow-diagram">
            <div className="flow-step">
              <div className="step-icon">🎓</div>
              <h4>Education</h4>
              <p>Complete your chosen degree program</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">💼</div>
              <h4>Entry Level</h4>
              <p>Start with internships and junior positions</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">📈</div>
              <h4>Growth</h4>
              <p>Gain experience and develop expertise</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">👑</div>
              <h4>Leadership</h4>
              <p>Take on senior roles and responsibilities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesAndCareers
