"use client"

import type React from "react"
import "./About.css"

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Samyak Nigam",
      role: "Team Leader",
      description: "3rd Year ECE student @ IIIT Bhopal, passionate about DSA & web development",
      image: "/sam.jpg",
      expertise: ["DSA", "Web Development"],
    },
    {
      name: "Ujjwal Soni",
      role: "Frontend Developer",
      description: "Critical thinker and problem solver with a knack for UI/UX design",
      image: "/ujju.jpg",
      expertise: ["FrontEnd Development"],
    },
    {
      name: "Ankur Singh",
      role: "Backend Developer",
      description: "3rd Year CSE student @ IIIT Bhopal, interested in AI/ML and web development",
      image: "/ankur.jpg",
      expertise: ["AI/ML", "Web Development"],
    },
    {
      name: "Aakarshit Khajuria",
      role: "Backend Developer",
      description: "3rd Year ECE student @ IIIT Bhopal, himself from Jammu & Kashmir",
      image: "/akki.jpg",
      expertise: ["DSA", "Web Development", "C++"],
    },
    {
      name: "Shatakshi Chowksey",
      role: "Presenter",
      description: "2nd Year IT student @ IIIT Bhopal",
      image: "/shatakshi.jpg",
    },
    {
      name: "Prachi Patidar",
      role: "Presenter",
      description: "2nd Year CSE student @ IIIT Bhopal",
      image: "/prachi.jpg",
    },
  ]

  const achievements = [
    { number: "50,000+", label: "Students Guided", icon: "🎓" },
    { number: "500+", label: "Partner Colleges", icon: "🏛️" },
    { number: "95%", label: "Success Rate", icon: "📈" },
    { number: "4.8/5", label: "User Rating", icon: "⭐" },
  ]

  const values = [
    {
      title: "Accessibility",
      description:
        "Making quality career guidance accessible to every student, regardless of their background",
      icon: "🌍",
    },
    {
      title: "Innovation",
      description:
        "Leveraging cutting-edge AI technology to provide personalized career recommendations",
      icon: "🚀",
    },
    {
      title: "Integrity",
      description:
        "Providing honest, unbiased guidance focused solely on student success",
      icon: "🤝",
    },
    {
      title: "Excellence",
      description:
        "Maintaining the highest standards in our platform, content, and support services",
      icon: "💎",
    },
  ]

  // ✅ Prevent form reload
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Message sent! (Connect backend/email service here)")
  }

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-subtitle">
            Empowering students with the knowledge and tools to make informed career choices
          </p>
        </section>

        {/* Achievements */}
        <section className="stats-section">
          {achievements.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Our Values */}
        <section className="values-section">
          <div className="section-header">
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="values-grid">
            {values.map((value, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Team Section (your details here) */}
        <section className="team-section">
          <div className="section-header">
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="team-card">
                <img src={member.image} alt={member.name} className="team-image" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
                {member.expertise && (
                  <div className="expertise-tags">
                    {member.expertise.map((exp, i) => (
                      <span key={i} className="tag">
                        {exp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section">
          <div className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">
              We'd love to hear from you and help with your career journey
            </p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email Us</h4>
                  <p>support@careerguide.edu</p>
                  <p>partnerships@careerguide.edu</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h4>Call Us</h4>
                  <p>+91 98765 43210</p>
                  <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Visit Us</h4>
                  <p>123 Education Hub</p>
                  <p>New Delhi, India 110001</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
