"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Home.css"

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: "🏛️",
      title: "Why Government Colleges?",
      description:
        "Government colleges offer quality education at affordable fees, excellent faculty, and strong industry connections. They provide the best value for your investment in education.",
      benefits: ["Low fees", "Quality education", "Strong alumni network", "Government backing"],
    },
    {
      icon: "🎯",
      title: "How This Platform Helps?",
      description:
        "Our AI-powered platform provides personalized career guidance, college recommendations, and aptitude assessments to help you make informed decisions about your future.",
      benefits: ["Personalized guidance", "AI recommendations", "Comprehensive database", "Expert insights"],
    },
    {
      icon: "🚀",
      title: "Benefits of Career Guidance",
      description:
        "Professional career guidance helps you discover your strengths, explore opportunities, and create a roadmap to success in your chosen field.",
      benefits: ["Discover strengths", "Explore opportunities", "Clear roadmap", "Informed decisions"],
    },
  ]

  const stats = [
    { number: "500+", label: "Government Colleges" },
    { number: "50+", label: "Career Paths" },
    { number: "10,000+", label: "Students Guided" },
    { number: "95%", label: "Success Rate" },
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Your Personalized Career & College Guide</h1>
          <p className="hero-subtitle">
            Discover your potential, explore career paths, and find the perfect government college for your future with
            our AI-powered guidance platform.
          </p>
          <div className="hero-actions">
            <Link to="/quiz" className="btn btn-primary hero-btn">
              Take Aptitude Quiz
            </Link>
            <Link to="/courses" className="btn btn-secondary hero-btn">
              Explore Courses
            </Link>
            <Link to="/colleges" className="btn btn-secondary hero-btn">
              Find Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Platform?</h2>
            <p className="section-subtitle">
              We provide comprehensive guidance to help you make the best decisions for your academic and career
              journey.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <ul className="feature-benefits">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx}>✓ {benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-subtitle">
              Join thousands of students who have found their perfect career path with our guidance.
            </p>
            <div className="cta-actions">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary cta-btn">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary cta-btn">
                  Get Started Today
                </Link>
              )}
              <Link to="/about" className="btn btn-secondary cta-btn">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
