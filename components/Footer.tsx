"use client"

import type React from "react"
import { Link } from "react-router-dom"
import "./Footer.css"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Digital Career Guidance</h3>
            <p className="footer-description">
              Empowering students to make informed decisions about their career and college choices. Your personalized
              guide to government colleges and career opportunities.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/courses">Courses & Careers</Link>
              </li>
              <li>
                <Link to="/colleges">Find Colleges</Link>
              </li>
              <li>
                <Link to="/quiz">Aptitude Quiz</Link>
              </li>
              <li>
                <Link to="/chatbot">AI Assistant</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Resources</h4>
            <ul className="footer-links">
              <li>
                <Link to="/timeline">Academic Timeline</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <p>📧 support@careerguide.edu</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 New Delhi, India</p>
              <div className="social-links">
                <a href="#facebook" aria-label="Facebook">
                  📘
                </a>
                <a href="#twitter" aria-label="Twitter">
                  🐦
                </a>
                <a href="#linkedin" aria-label="LinkedIn">
                  💼
                </a>
                <a href="#instagram" aria-label="Instagram">
                  📷
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Digital Career Guidance Platform. All rights reserved.</p>
          <p>Helping students achieve their dreams through informed choices.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
