"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Login.css"

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "Student",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isLogin) {
        await login(formData.email, formData.password, formData.role)
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          setLoading(false)
          return
        }
        await signup(formData.email, formData.password, formData.role, formData.name)
      }
      navigate("/dashboard")
    } catch (err) {
      setError("Authentication failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    { value: "Student", label: "Student", icon: "🎓" },
    { value: "Parent", label: "Parent", icon: "👨‍👩‍👧‍👦" },
    { value: "Counselor", label: "Counselor", icon: "👨‍🏫" },
    { value: "Admin", label: "Admin", icon: "⚙️" },
  ]

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{isLogin ? "Welcome Back!" : "Join Career Guide"}</h1>
          <p className="auth-subtitle">
            {isLogin ? "Sign in to continue your career journey" : "Start your personalized career guidance today"}
          </p>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={`auth-tab ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="role-selection">
            <label className="form-label">Select Your Role</label>
            <div className="role-grid">
              {roles.map((role) => (
                <label key={role.value} className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleInputChange}
                  />
                  <div className="role-card">
                    <span className="role-icon">{role.icon}</span>
                    <span className="role-label">{role.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="auth-switch" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up here" : "Sign in here"}
            </button>
          </p>
        </div>

        <div className="auth-features">
          <h3>Why Choose Career Guide?</h3>
          <ul>
            <li>🎯 Personalized career recommendations</li>
            <li>🏫 Government college database</li>
            <li>🤖 AI-powered guidance</li>
            <li>📊 Comprehensive aptitude tests</li>
            <li>📅 Academic timeline tracking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
