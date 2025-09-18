"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import AptitudeQuiz from "../pages/AptitudeQuiz"
import QuizResults from "../pages/QuizResults"
import CoursesAndCareers from "../pages/CoursesAndCareers"
import CollegesNearby from "../pages/CollegesNearby"
import Timeline from "../pages/Timeline"
import AIChatbot from "../pages/AIChatbot"
import About from "../pages/About"
import { AuthProvider } from "../context/AuthContext"
import { ThemeProvider } from "../context/ThemeContext"

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/quiz" element={<AptitudeQuiz />} />
                <Route path="/quiz-results" element={<QuizResults />} />
                <Route path="/courses" element={<CoursesAndCareers />} />
                <Route path="/colleges" element={<CollegesNearby />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/chatbot" element={<AIChatbot />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
