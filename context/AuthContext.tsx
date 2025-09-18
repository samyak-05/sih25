"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "Student" | "Parent" | "Counselor" | "Admin"
  class?: string
  interests?: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<void>
  signup: (email: string, password: string, role: string, name: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string, role: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email,
      role: role as User["role"],
      class: role === "Student" ? "12th Grade" : undefined,
      interests: role === "Student" ? ["Science", "Technology"] : undefined,
    }

    setUser(mockUser)
  }

  const signup = async (email: string, password: string, role: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name,
      email,
      role: role as User["role"],
      class: role === "Student" ? "12th Grade" : undefined,
      interests: role === "Student" ? ["Science", "Technology"] : undefined,
    }

    setUser(mockUser)
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>{children}</AuthContext.Provider>
  )
}
