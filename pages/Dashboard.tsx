"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Dashboard.css"

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const quickLinks = [
    {
      title: "Start Aptitude Quiz",
      description: "Discover your strengths and interests",
      icon: "🧠",
      link: "/quiz",
      color: "primary",
    },
    {
      title: "View Courses",
      description: "Explore available courses and careers",
      icon: "📚",
      link: "/courses",
      color: "accent",
    },
    {
      title: "Find Colleges",
      description: "Search for nearby government colleges",
      icon: "🏛️",
      link: "/colleges",
      color: "secondary",
    },
    {
      title: "AI Chatbot",
      description: "Get instant career guidance",
      icon: "🤖",
      link: "/chatbot",
      color: "primary",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "New Scholarship Available",
      message: "Merit-based scholarship for engineering students. Apply before March 31st.",
      time: "2 hours ago",
      type: "info",
      icon: "💰",
    },
    {
      id: 2,
      title: "Admission Deadline Reminder",
      message: "IIT JEE Advanced registration closes in 5 days. Don't miss out!",
      time: "1 day ago",
      type: "warning",
      icon: "⏰",
    },
    {
      id: 3,
      title: "Career Fair Announcement",
      message: "Virtual career fair for science students on April 15th. Register now!",
      time: "3 days ago",
      type: "success",
      icon: "🎯",
    },
  ]

  const progressData = [
    { label: "Aptitude Quiz", completed: 1, total: 3, percentage: 33 },
    { label: "Profile Setup", completed: 3, total: 4, percentage: 75 },
    { label: "College Applications", completed: 0, total: 5, percentage: 0 },
    { label: "Career Exploration", completed: 2, total: 6, percentage: 33 },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1 className="dashboard-title">
              {getGreeting()}, {user?.name}! 👋
            </h1>
            <p className="dashboard-subtitle">Ready to continue your career journey? Here's what's waiting for you.</p>
          </div>
          <div className="profile-summary">
            <div className="profile-card">
              <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
              <div className="profile-info">
                <h3>{user?.name}</h3>
                <p>{user?.role}</p>
                {user?.class && <span className="profile-class">{user.class}</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Quick Links Section */}
          <section className="dashboard-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="quick-links-grid">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.link} className={`quick-link-card ${link.color}`}>
                  <div className="quick-link-icon">{link.icon}</div>
                  <div className="quick-link-content">
                    <h3>{link.title}</h3>
                    <p>{link.description}</p>
                  </div>
                  <div className="quick-link-arrow">→</div>
                </Link>
              ))}
            </div>
          </section>

          {/* Progress Tracker */}
          <section className="dashboard-section">
            <h2 className="section-title">Your Progress</h2>
            <div className="progress-list">
              {progressData.map((item, index) => (
                <div key={index} className="progress-item">
                  <div className="progress-info">
                    <h4>{item.label}</h4>
                    <span className="progress-text">
                      {item.completed}/{item.total} completed
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="progress-percentage">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications Panel */}
          <section className="dashboard-section">
            <h2 className="section-title">Recent Notifications</h2>
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div key={notification.id} className={`notification-card ${notification.type}`}>
                  <div className="notification-icon">{notification.icon}</div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/timeline" className="view-all-link">
              View All Notifications →
            </Link>
          </section>

          {/* Interests Section (for students) */}
          {user?.role === "Student" && user?.interests && (
            <section className="dashboard-section">
              <h2 className="section-title">Your Interests</h2>
              <div className="interests-tags">
                {user.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
              <Link to="/courses" className="btn btn-secondary mt-4">
                Explore Related Courses
              </Link>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
