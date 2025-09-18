"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import "./AIChatbot.css"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "suggestion" | "action"
}

interface QuickAction {
  id: string
  label: string
  icon: string
  prompt: string
}

const AIChatbot: React.FC = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickActions: QuickAction[] = [
    {
      id: "career-guidance",
      label: "Career Guidance",
      icon: "🎯",
      prompt: "I need help choosing the right career path based on my interests and skills.",
    },
    {
      id: "college-selection",
      label: "College Selection",
      icon: "🏛️",
      prompt: "Help me find the best government colleges for my preferred course.",
    },
    {
      id: "exam-preparation",
      label: "Exam Preparation",
      icon: "📚",
      prompt: "What's the best strategy to prepare for entrance exams?",
    },
    {
      id: "scholarship-info",
      label: "Scholarships",
      icon: "💰",
      prompt: "Tell me about available scholarships for my academic level.",
    },
    {
      id: "course-comparison",
      label: "Course Comparison",
      icon: "⚖️",
      prompt: "Compare different courses and their career prospects.",
    },
    {
      id: "admission-process",
      label: "Admission Process",
      icon: "📝",
      prompt: "Explain the admission process for government colleges.",
    },
  ]

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 1,
      text: `Hello ${user?.name || "there"}! 👋 I'm your AI Career Guidance Assistant. I'm here to help you with career advice, college selection, exam preparation, and more. How can I assist you today?`,
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    }
    setMessages([welcomeMessage])
  }, [user?.name])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Career guidance responses
    if (lowerMessage.includes("career") || lowerMessage.includes("job") || lowerMessage.includes("profession")) {
      return "Great question about career guidance! 🎯 Based on your interests and the quiz results, I can help you explore various career paths. Consider factors like your strengths, market demand, and personal interests. Would you like me to suggest some specific careers based on your profile, or do you have a particular field in mind?"
    }

    // College selection responses
    if (lowerMessage.includes("college") || lowerMessage.includes("university") || lowerMessage.includes("admission")) {
      return "I'd be happy to help you with college selection! 🏛️ Government colleges offer excellent education at affordable fees. To give you the best recommendations, could you tell me: 1) What course/stream are you interested in? 2) Which state/region do you prefer? 3) Your academic performance level? This will help me suggest the most suitable colleges for you."
    }

    // Exam preparation responses
    if (lowerMessage.includes("exam") || lowerMessage.includes("preparation") || lowerMessage.includes("study")) {
      return "Excellent! Proper exam preparation is key to success. 📚 Here are some proven strategies: 1) Create a structured study schedule 2) Focus on understanding concepts, not just memorizing 3) Practice with previous year papers 4) Take regular mock tests 5) Maintain a healthy study-life balance. Which specific exam are you preparing for? I can provide more targeted advice!"
    }

    // Scholarship responses
    if (lowerMessage.includes("scholarship") || lowerMessage.includes("financial") || lowerMessage.includes("fee")) {
      return "There are many scholarship opportunities available! 💰 Government scholarships include: 1) Merit-based scholarships for top performers 2) Need-based scholarships for economically weaker sections 3) Category-specific scholarships (SC/ST/OBC) 4) State government scholarships 5) Central government schemes. Would you like me to help you find scholarships specific to your category and academic level?"
    }

    // Course comparison responses
    if (lowerMessage.includes("course") || lowerMessage.includes("compare") || lowerMessage.includes("stream")) {
      return "Course comparison is crucial for making informed decisions! ⚖️ I can help you compare courses based on: 1) Career prospects and job opportunities 2) Average salary ranges 3) Industry growth potential 4) Required skills and aptitude 5) Duration and difficulty level. Which specific courses would you like me to compare? For example, Engineering vs Medical, or Commerce vs Arts?"
    }

    // Default responses for common greetings and general queries
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! 👋 I'm here to help you with all your career and education questions. Feel free to ask me about career guidance, college selection, exam preparation, scholarships, or anything else related to your academic journey!"
    }

    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're very welcome! 😊 I'm glad I could help. If you have any more questions about your career or education, don't hesitate to ask. Good luck with your academic journey!"
    }

    // Generic helpful response
    return "That's an interesting question! 🤔 I'm here to help you with career guidance, college selection, exam preparation, scholarships, and course comparisons. Could you provide a bit more detail about what specific aspect you'd like to know more about? This will help me give you more targeted and useful advice."
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText.trim()
    if (!textToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)
    setShowQuickActions(false)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: generateAIResponse(textToSend),
          sender: "ai",
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    ) // Random delay between 1.5-2.5 seconds
  }

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    const welcomeMessage: Message = {
      id: Date.now(),
      text: `Chat cleared! 🧹 I'm still here to help you with career guidance, college selection, and more. What would you like to know?`,
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    }
    setMessages([welcomeMessage])
    setShowQuickActions(true)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        {/* Header */}
        <div className="chatbot-header">
          <div className="ai-avatar">🤖</div>
          <div className="header-info">
            <h1 className="chatbot-title">AI Career Assistant</h1>
            <p className="chatbot-subtitle">Get personalized guidance for your academic and career journey</p>
          </div>
          <div className="header-actions">
            <button onClick={clearChat} className="btn btn-secondary btn-sm">
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === "ai" ? "🤖" : user?.name?.charAt(0).toUpperCase() || "👤"}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <p>{message.text}</p>
                </div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message ai">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-bubble typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {showQuickActions && messages.length <= 1 && (
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action)}
                  className="quick-action-btn"
                  disabled={isTyping}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-label">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="chat-input-container">
          <div className="chat-input">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about careers, colleges, exams..."
              disabled={isTyping}
              className="message-input"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="send-button"
            >
              {isTyping ? "⏳" : "📤"}
            </button>
          </div>
          <div className="input-help">
            <span>Press Enter to send • Shift + Enter for new line</span>
          </div>
        </div>

        {/* Features Info */}
        <div className="chatbot-features">
          <h3>What I can help you with:</h3>
          <div className="features-list">
            <div className="feature-item">🎯 Personalized career recommendations</div>
            <div className="feature-item">🏛️ Government college suggestions</div>
            <div className="feature-item">📚 Exam preparation strategies</div>
            <div className="feature-item">💰 Scholarship opportunities</div>
            <div className="feature-item">⚖️ Course comparisons</div>
            <div className="feature-item">📝 Admission guidance</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChatbot
