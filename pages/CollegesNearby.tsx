"use client"

import type React from "react"
import { useState } from "react"
import "./CollegesNearby.css"

interface College {
  id: number
  name: string
  location: string
  state: string
  type: "Government" | "Private" | "Deemed"
  courses: string[]
  facilities: string[]
  ranking: number
  fees: string
  admissionProcess: string
  established: number
  rating: number
  image: string
}

const CollegesNearby: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStream, setSelectedStream] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [sortBy, setSortBy] = useState("ranking")

  const colleges: College[] = [
    {
      id: 1,
      name: "Indian Institute of Technology Delhi",
      location: "New Delhi",
      state: "Delhi",
      type: "Government",
      courses: ["B.Tech Computer Science", "B.Tech Mechanical", "B.Tech Electrical", "M.Tech", "PhD"],
      facilities: ["Library", "Hostels", "Sports Complex", "Research Labs", "Cafeteria", "Medical Center"],
      ranking: 2,
      fees: "₹2.5 LPA",
      admissionProcess: "JEE Advanced",
      established: 1961,
      rating: 4.8,
      image: "/download.jpg",
    },
    {
      id: 2,
      name: "All India Institute of Medical Sciences",
      location: "New Delhi",
      state: "Delhi",
      type: "Government",
      courses: ["MBBS", "MD", "MS", "DM", "MCh", "PhD"],
      facilities: ["Hospital", "Research Centers", "Library", "Hostels", "Sports Facilities"],
      ranking: 1,
      fees: "₹1.5 LPA",
      admissionProcess: "NEET",
      established: 1956,
      rating: 4.9,
      image: "/aims.jpg",
    },
    {
      id: 3,
      name: "Delhi University - St. Stephens College",
      location: "New Delhi",
      state: "Delhi",
      type: "Government",
      courses: ["B.A. English", "B.A. Economics", "B.Sc Physics", "B.Sc Chemistry", "M.A.", "M.Sc"],
      facilities: ["Library", "Hostels", "Sports Ground", "Auditorium", "Computer Lab"],
      ranking: 5,
      fees: "₹0.5 LPA",
      admissionProcess: "CUET",
      established: 1881,
      rating: 4.7,
      image: "/st.jpg",
    },
    {
      id: 4,
      name: "Indian Institute of Management Ahmedabad",
      location: "Ahmedabad",
      state: "Gujarat",
      type: "Government",
      courses: ["MBA", "PGDM", "Executive MBA", "PhD", "Fellow Program"],
      facilities: ["Library", "Hostels", "Sports Complex", "Dining Halls", "Computer Center"],
      ranking: 3,
      fees: "₹25 LPA",
      admissionProcess: "CAT",
      established: 1961,
      rating: 4.8,
      image: "/iim.jpg",
    },
    {
      id: 5,
      name: "Jawaharlal Nehru University",
      location: "New Delhi",
      state: "Delhi",
      type: "Government",
      courses: ["B.A.", "M.A.", "M.Phil", "PhD", "M.Sc", "MCA"],
      facilities: ["Central Library", "Hostels", "Health Center", "Sports Facilities", "Cultural Centers"],
      ranking: 8,
      fees: "₹0.3 LPA",
      admissionProcess: "CUET PG",
      established: 1969,
      rating: 4.6,
      image: "/jnu.jpg",
    },
    {
      id: 6,
      name: "Indian Statistical Institute",
      location: "Kolkata",
      state: "West Bengal",
      type: "Government",
      courses: ["B.Stat", "B.Math", "M.Stat", "M.Math", "M.Tech", "PhD"],
      facilities: ["Library", "Computer Labs", "Research Centers", "Hostels", "Seminar Halls"],
      ranking: 12,
      fees: "₹1 LPA",
      admissionProcess: "ISI Admission Test",
      established: 1931,
      rating: 4.5,
      image: "/indian.jpg",
    },
  ]

  const streams = ["All", "Engineering", "Medical", "Arts", "Commerce", "Management"]
  const locations = ["All", "Delhi", "Gujarat", "West Bengal", "Maharashtra", "Karnataka"]

  const getStreamFromCourses = (courses: string[]): string[] => {
    const streams: string[] = []
    courses.forEach((course) => {
      if (course.includes("B.Tech") || course.includes("Engineering")) streams.push("Engineering")
      if (course.includes("MBBS") || course.includes("Medical")) streams.push("Medical")
      if (course.includes("B.A.") || course.includes("Arts")) streams.push("Arts")
      if (course.includes("B.Com") || course.includes("Commerce")) streams.push("Commerce")
      if (course.includes("MBA") || course.includes("Management")) streams.push("Management")
    })
    return [...new Set(streams)]
  }

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStream = selectedStream === "All" || getStreamFromCourses(college.courses).includes(selectedStream)

    const matchesLocation = selectedLocation === "All" || college.state === selectedLocation

    return matchesSearch && matchesStream && matchesLocation
  })

  const sortedColleges = [...filteredColleges].sort((a, b) => {
    switch (sortBy) {
      case "ranking":
        return a.ranking - b.ranking
      case "rating":
        return b.rating - a.rating
      case "fees":
        return Number.parseFloat(a.fees.replace(/[₹,LPA]/g, "")) - Number.parseFloat(b.fees.replace(/[₹,LPA]/g, ""))
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="colleges-page">
      <div className="colleges-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Government Colleges Near You</h1>
          <p className="page-subtitle">
            Discover top government colleges offering quality education at affordable fees. Find the perfect institution
            for your academic journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search colleges, locations, or courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label>Stream:</label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="filter-select"
              >
                {streams.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Location:</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-select"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                <option value="ranking">Ranking</option>
                <option value="rating">Rating</option>
                <option value="fees">Fees</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <span>
            Found {sortedColleges.length} college{sortedColleges.length !== 1 ? "s" : ""}
          </span>
          {searchTerm && <span> matching "{searchTerm}"</span>}
        </div>

        {/* College Cards */}
        <div className="colleges-grid">
          {sortedColleges.map((college) => (
            <div key={college.id} className="college-card">
              <div className="college-image">
                <img src={college.image || "/placeholder.svg"} alt={college.name} />
                <div className="college-type">{college.type}</div>
                <div className="college-ranking">#{college.ranking}</div>
              </div>

              <div className="college-content">
                <div className="college-header">
                  <h3 className="college-name">{college.name}</h3>
                  <div className="college-rating">
                    <span className="rating-stars">⭐</span>
                    <span className="rating-value">{college.rating}</span>
                  </div>
                </div>

                <div className="college-location">
                  📍 {college.location}, {college.state}
                </div>

                <div className="college-info">
                  <div className="info-item">
                    <strong>Established:</strong> {college.established}
                  </div>
                  <div className="info-item">
                    <strong>Fees:</strong> {college.fees}
                  </div>
                  <div className="info-item">
                    <strong>Admission:</strong> {college.admissionProcess}
                  </div>
                </div>

                <div className="courses-section">
                  <h4>Popular Courses:</h4>
                  <div className="course-tags">
                    {college.courses.slice(0, 3).map((course, index) => (
                      <span key={index} className="course-tag">
                        {course}
                      </span>
                    ))}
                    {college.courses.length > 3 && (
                      <span className="course-tag more">+{college.courses.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="facilities-section">
                  <h4>Key Facilities:</h4>
                  <div className="facilities-list">
                    {college.facilities.slice(0, 4).map((facility, index) => (
                      <span key={index} className="facility-item">
                        ✓ {facility}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="college-actions">
                  <button className="btn btn-primary">View Details</button>
                  <button className="btn btn-secondary">Compare</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedColleges.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🏛️</div>
            <h3>No colleges found</h3>
            <p>Try adjusting your search criteria or filters to find relevant colleges.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedStream("All")
                setSelectedLocation("All")
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Map Placeholder */}
        <div className="map-section">
          <h2 className="section-title">College Locations</h2>
          <div className="map-placeholder">
            <div className="map-icon">🗺️</div>
            <h3>Interactive Map Coming Soon</h3>
            <p>Explore college locations on an interactive map to find institutions near you.</p>
            <div className="map-features">
              <div className="feature-item">📍 Precise locations</div>
              <div className="feature-item">🚌 Transportation info</div>
              <div className="feature-item">🏠 Nearby amenities</div>
              <div className="feature-item">📊 Distance calculator</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegesNearby
