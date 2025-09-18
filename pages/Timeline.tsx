"use client"

import type React from "react"
import { useState } from "react"
import "./Timeline.css"

interface TimelineEvent {
  id: number
  title: string
  description: string
  date: string
  type: "deadline" | "exam" | "scholarship" | "admission" | "result"
  priority: "high" | "medium" | "low"
  status: "upcoming" | "ongoing" | "completed"
  category: string
}

interface Notification {
  id: number
  title: string
  message: string
  date: string
  type: "info" | "warning" | "success" | "urgent"
  read: boolean
  category: string
}

const Timeline: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [filterType, setFilterType] = useState("all")
  const [showNotifications, setShowNotifications] = useState(true)

  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      title: "JEE Main Registration",
      description: "Online registration for JEE Main 2024 opens. Complete your application before the deadline.",
      date: "2024-03-15",
      type: "deadline",
      priority: "high",
      status: "upcoming",
      category: "Engineering",
    },
    {
      id: 2,
      title: "NEET Application Deadline",
      description: "Last date to submit NEET 2024 application form with late fee.",
      date: "2024-03-20",
      type: "deadline",
      priority: "high",
      status: "upcoming",
      category: "Medical",
    },
    {
      id: 3,
      title: "Merit Scholarship Applications",
      description: "Apply for government merit scholarships for undergraduate programs.",
      date: "2024-03-25",
      type: "scholarship",
      priority: "medium",
      status: "upcoming",
      category: "General",
    },
    {
      id: 4,
      title: "CUET Registration",
      description: "Common University Entrance Test registration for central universities.",
      date: "2024-04-01",
      type: "exam",
      priority: "high",
      status: "upcoming",
      category: "Arts & Commerce",
    },
    {
      id: 5,
      title: "JEE Advanced Exam",
      description: "JEE Advanced examination for IIT admissions.",
      date: "2024-05-26",
      type: "exam",
      priority: "high",
      status: "upcoming",
      category: "Engineering",
    },
    {
      id: 6,
      title: "NEET Exam",
      description: "National Eligibility cum Entrance Test for medical colleges.",
      date: "2024-05-05",
      type: "exam",
      priority: "high",
      status: "upcoming",
      category: "Medical",
    },
  ]

  const notifications: Notification[] = [
    {
      id: 1,
      title: "New Scholarship Announced",
      message: "Government of India announces new scholarship program for SC/ST students pursuing engineering.",
      date: "2024-03-10",
      type: "info",
      read: false,
      category: "Scholarship",
    },
    {
      id: 2,
      title: "Admission Deadline Alert",
      message: "Only 5 days left for JEE Main registration. Don't miss the opportunity!",
      date: "2024-03-10",
      type: "warning",
      read: false,
      category: "Deadline",
    },
    {
      id: 3,
      title: "Career Fair Registration Open",
      message: "Virtual career fair for engineering students. Register now for free participation.",
      date: "2024-03-09",
      type: "success",
      read: true,
      category: "Event",
    },
    {
      id: 4,
      title: "Document Verification Required",
      message: "Complete your document verification for scholarship application before March 20th.",
      date: "2024-03-08",
      type: "urgent",
      read: false,
      category: "Action Required",
    },
    {
      id: 5,
      title: "New College Added",
      message: "IIT Goa has been added to our college database with updated course information.",
      date: "2024-03-07",
      type: "info",
      read: true,
      category: "Update",
    },
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const eventTypes = ["all", "deadline", "exam", "scholarship", "admission", "result"]

  const filteredEvents = timelineEvents.filter((event) => {
    const eventDate = new Date(event.date)
    const matchesMonth = eventDate.getMonth() === selectedMonth
    const matchesYear = eventDate.getFullYear() === selectedYear
    const matchesType = filterType === "all" || event.type === filterType

    return matchesMonth && matchesYear && matchesType
  })

  const getEventIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return "⏰"
      case "exam":
        return "📝"
      case "scholarship":
        return "💰"
      case "admission":
        return "🎓"
      case "result":
        return "📊"
      default:
        return "📅"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#f59e0b"
      case "low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return "ℹ️"
      case "warning":
        return "⚠️"
      case "success":
        return "✅"
      case "urgent":
        return "🚨"
      default:
        return "📢"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const unreadNotifications = notifications.filter((n) => !n.read).length

  return (
    <div className="timeline-page">
      <div className="timeline-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Academic Timeline & Notifications</h1>
          <p className="page-subtitle">
            Stay updated with important dates, deadlines, and notifications for your academic journey.
          </p>
        </div>

        {/* Controls */}
        <div className="timeline-controls">
          <div className="date-selectors">
            <div className="selector-group">
              <label>Month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number.parseInt(e.target.value))}
                className="date-select"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="selector-group">
              <label>Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
                className="date-select"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
              </select>
            </div>

            <div className="selector-group">
              <label>Filter:</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="date-select">
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="view-toggles">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`toggle-btn ${showNotifications ? "active" : ""}`}
            >
              Notifications{" "}
              {unreadNotifications > 0 && <span className="notification-badge">{unreadNotifications}</span>}
            </button>
          </div>
        </div>

        <div className="timeline-content">
          {/* Calendar Placeholder */}
          <div className="calendar-section">
            <h2 className="section-title">
              {months[selectedMonth]} {selectedYear} Calendar
            </h2>
            <div className="calendar-placeholder">
              <div className="calendar-icon">📅</div>
              <h3>Interactive Calendar Coming Soon</h3>
              <p>View all important dates in a visual calendar format</p>
              <div className="calendar-features">
                <div className="feature">📍 Mark important dates</div>
                <div className="feature">🔔 Set reminders</div>
                <div className="feature">📱 Sync with your device</div>
                <div className="feature">📊 Track your progress</div>
              </div>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="events-section">
            <h2 className="section-title">Upcoming Events ({filteredEvents.length})</h2>
            <div className="timeline-events">
              {filteredEvents.map((event) => (
                <div key={event.id} className={`timeline-event ${event.priority}`}>
                  <div className="event-marker">
                    <div className="event-icon">{getEventIcon(event.type)}</div>
                    <div
                      className="priority-indicator"
                      style={{ backgroundColor: getPriorityColor(event.priority) }}
                    ></div>
                  </div>

                  <div className="event-content">
                    <div className="event-header">
                      <h3 className="event-title">{event.title}</h3>
                      <div className="event-meta">
                        <span className="event-category">{event.category}</span>
                        <span className="event-date">{formatDate(event.date)}</span>
                      </div>
                    </div>
                    <p className="event-description">{event.description}</p>
                    <div className="event-actions">
                      <button className="btn btn-primary btn-sm">Add Reminder</button>
                      <button className="btn btn-secondary btn-sm">Learn More</button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredEvents.length === 0 && (
                <div className="no-events">
                  <div className="no-events-icon">📅</div>
                  <h3>No events found</h3>
                  <p>
                    No events scheduled for {months[selectedMonth]} {selectedYear}
                    {filterType !== "all" && ` in ${filterType} category`}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="notifications-section">
              <h2 className="section-title">
                Recent Notifications
                {unreadNotifications > 0 && <span className="unread-count">({unreadNotifications} unread)</span>}
              </h2>
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.type} ${notification.read ? "read" : "unread"}`}
                  >
                    <div className="notification-icon">{getNotificationIcon(notification.type)}</div>
                    <div className="notification-content">
                      <div className="notification-header">
                        <h4 className="notification-title">{notification.title}</h4>
                        <div className="notification-meta">
                          <span className="notification-category">{notification.category}</span>
                          <span className="notification-date">{notification.date}</span>
                        </div>
                      </div>
                      <p className="notification-message">{notification.message}</p>
                    </div>
                    {!notification.read && <div className="unread-indicator"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Timeline
