"use client"

import { useState, useEffect } from "react"
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Download,
  Calendar,
  GraduationCap,
  Award,
  Code,
  Database,
  Globe,
  Brain,
  Send,
  Loader2,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from "lucide-react"

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navigationItems = ["About", "Skills", "Experience", "Projects", "Contact"]

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleNavClick = (item: string) => {
    scrollToSection(item.toLowerCase())
    setIsMobileMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitMessage("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage("✅ " + result.message)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitMessage("❌ " + (result.message || "Failed to send message"))
      }
    } catch (error) {
      setSubmitMessage("❌ Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResumeDownload = async () => {
    if (isDownloading) return

    setIsDownloading(true)

    try {
      const response = await fetch('/api/resume')
      
      if (!response.ok) {
        const errorData = await response.json()
        alert('❌ ' + (errorData.message || 'Failed to download resume'))
        return
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Aayush_Thakkar_Resume.pdf'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      alert('✅ Resume download started!')
      
    } catch (error) {
      alert('❌ Failed to download resume. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Enhanced Navigation with scroll effect */}
      <nav className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-700 shadow-lg' 
          : 'bg-white/80 dark:bg-gray-900/80 border-gray-100 dark:border-gray-800'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo with hover effect */}
            <div className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Aayush Thakkar
            </div>

            {/* Desktop Navigation with enhanced hover effects */}
            <div className="hidden md:flex space-x-8 items-center">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              
              {/* Enhanced Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-200 hover:rotate-12" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 transition-transform duration-200 hover:-rotate-12" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button with enhanced animation */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                aria-label="Toggle mobile menu"
              >
                <div className="relative w-6 h-6">
                  <Menu className={`w-6 h-6 text-gray-600 dark:text-gray-300 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                  <X className={`w-6 h-6 text-gray-600 dark:text-gray-300 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar with enhanced animations */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Navigation
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex-1 py-6">
            <nav className="space-y-2 px-6">
              {navigationItems.map((item, index) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium flex items-center space-x-3 group hover:translate-x-1"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold transition-transform duration-200 group-hover:scale-110">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Get in touch</p>
              <div className="flex justify-center space-x-4">
                {[
                  { href: "mailto:aayusht2004@gmail.com", text: "Email" },
                  { href: "https://github.com/aayush-thakkar2914", text: "GitHub" },
                  { href: "https://www.linkedin.com/in/aayush-thakkar-b7a80225a/", text: "LinkedIn" }
                ].map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    target={link.href.startsWith('http') ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              {/* Enhanced Avatar with hover effects */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer group">
                <span className="transition-transform duration-300 group-hover:rotate-12">AT</span>
              </div>
              
              {/* Animated text with stagger effect */}
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
                Aayush Thakkar
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto animate-fade-in-up" style={{animationDelay: '200ms'}}>
                Python Backend Developer | FastAPI • Java • Oracle SQL | AI, ML & Workflow Automation
              </p>
            </div>

            {/* Enhanced contact links with hover animations */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              {[
                { href: "mailto:aayusht2004@gmail.com", icon: Mail, text: "aayusht2004@gmail.com", short: "Email" },
                { href: "tel:+917874480170", icon: Phone, text: "+91 78744 80170", short: "Call" },
                { href: "https://github.com/aayush-thakkar2914", icon: Github, text: "@aayush-thakkar2914", short: "GitHub" },
                { href: "https://www.linkedin.com/in/aayush-thakkar-b7a80225a/", icon: Linkedin, text: "aayush-thakkar", short: "LinkedIn" }
              ].map((contact, index) => (
                <a
                  key={contact.short}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 group"
                  style={{animationDelay: `${500 + index * 100}ms`}}
                >
                  <contact.icon size={20} className="transition-transform duration-200 group-hover:rotate-12" />
                  <span className="hidden sm:inline">{contact.text}</span>
                  <span className="sm:hidden">{contact.short}</span>
                </a>
              ))}
            </div>

            {/* Enhanced download button */}
            <button 
              onClick={handleResumeDownload}
              disabled={isDownloading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg disabled:opacity-50 inline-flex items-center text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 animate-fade-in-up"
              style={{animationDelay: '900ms'}}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2 transition-transform duration-200 group-hover:translate-y-0.5" size={20} />
                  Download Resume
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* About Section with fade-in animation */}
      <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto transition-all duration-300 hover:w-32"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-100">
              I'm a passionate Computer Science graduate with extensive experience in backend development, machine
              learning, and web development. My journey spans across various technologies including Python, Java,
              FastAPI, and Django. I have a deep curiosity for automation, AI workflows, and prompt engineering,
              constantly exploring innovative solutions to complex problems. Through multiple internships and projects,
              I've developed a strong foundation in building scalable applications and implementing cutting-edge AI
              solutions with expertise in graph databases and workflow automation.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto transition-all duration-300 hover:w-32"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: "Programming",
                icon: <Code className="w-12 h-12 text-blue-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />,
                skills: ["Python", "Java", "C/C++", "PHP"],
                color: "bg-blue-100 text-blue-800",
                hoverColor: "hover:bg-blue-200"
              },
              {
                title: "Web Technologies", 
                icon: <Globe className="w-12 h-12 text-green-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />,
                skills: ["HTML", "CSS", "JavaScript", "JSP", "Servlets", "Flask", "Django", "FastAPI"],
                color: "bg-green-100 text-green-800",
                hoverColor: "hover:bg-green-200"
              },
              {
                title: "Databases",
                icon: <Database className="w-12 h-12 text-purple-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />,
                skills: ["Oracle SQL", "MySQL", "OpenSearch"],
                color: "bg-purple-100 text-purple-800",
                hoverColor: "hover:bg-purple-200"
              },
              {
                title: "Other Skills",
                icon: <Brain className="w-12 h-12 text-orange-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />,
                skills: ["Machine Learning", "Prompt Engineering", "Sales & Marketing", "Workflow Automation", "AI Integration", "Google APIs", "Neo4j"],
                color: "bg-orange-100 text-orange-800",
                hoverColor: "hover:bg-orange-200"
              }
            ].map((category, index) => (
              <div key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg bg-white p-6 hover:-translate-y-2 group cursor-pointer">
                <div className="text-center">
                  {category.icon}
                  <h3 className="text-xl dark:text-white font-semibold transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{category.title}</h3>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span 
                        key={skill} 
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${category.color} ${category.hoverColor} transition-all duration-200 hover:scale-105 cursor-pointer`}
                        style={{animationDelay: `${skillIndex * 50}ms`}}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto transition-all duration-300 hover:w-32"></div>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "AI/ML Engineer Trainee",
                company: "Inferenz, Ahmedabad",
                period: "March 2025 – Present",
                description:
                  "Working on backend development using FastAPI and contributing to Django-based Ecommerce site. Currently building Vakeel LLM, an AI-powered legal assistant involving chunking legal documents, storing in OpenSearch (Vector DB), and integrating with Groq model for context-aware answers.",
                technologies: ["FastAPI", "OpenSearch", "Docker", "Django", "AI/ML"],
              },
              {
                title: "Tech ERP Intern",
                company: "MASTEK PVT. LTD.",
                period: "Jan – Mar 2025",
                description:
                  "Trained in Oracle SQL, Core Java, and Advanced Java. Worked on Learning Management System (LMS) project, contributing to building important features using Java Servlets, JSP, and Oracle SQL.",
                technologies: ["Oracle SQL", "Java", "JSP", "Servlets"],
              },
              {
                title: "ML Engineer Intern",
                company: "iNeuron.ai, Bengaluru",
                period: "May – July 2024",
                description:
                  "Worked on Shipping Price Prediction project utilizing advanced machine learning algorithms. Leveraged Python, scikit-learn, and TensorFlow to enhance accuracy in logistics cost forecasting.",
                technologies: ["Python", "scikit-learn", "TensorFlow", "ML"],
              },
              {
                title: "Python Developer Intern",
                company: "Inferenz, Ahmedabad",
                period: "May – June 2023",
                description:
                  "Created Python-based web and image scraping tools, specializing in extracting Flipkart reviews. Deployed on Azure technologies for efficient data extraction and analysis.",
                technologies: ["Python", "Web Scraping", "Azure"],
              },
            ].map((exp, index) => (
              <div
                key={index}
                className="border-l-4 border-l-blue-600 shadow-lg dark:bg-gray-700 dark:border-gray-600 rounded-lg bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl text-gray-900 dark:text-white font-semibold transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{exp.title}</h3>
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400">{exp.company}</p>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                    <Calendar size={16} className="mr-2 transition-transform duration-200 group-hover:rotate-12" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-blue-200 text-blue-700 dark:border-blue-400 dark:text-blue-300 dark:bg-blue-900/20 transition-all duration-200 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/40"
                      style={{animationDelay: `${techIndex * 50}ms`}}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto transition-all duration-300 hover:w-32"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "Resume Screening Automation",
                description:
                  "Built an AI-powered resume screening system using N8N workflow automation that processes PDF resumes, analyzes them with Google Gemini AI, and delivers results via email in under 30 seconds. Achieved 95% time reduction in HR screening process.",
                technologies: ["N8N", "Google Gemini AI", "Workflow Automation", "Google APIs", "HTML/CSS/JS"],
                icon: <Brain className="w-8 h-8 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />,
              },
              {
                title: "Akshar Lights E-Commerce Site",
                description:
                  "Designed and developed a fully functional e-commerce platform with product listing, shopping cart, user authentication, and order management. Focused on responsive design and secure backend integration.",
                technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS"],
                icon: <Globe className="w-8 h-8 text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
              },
              {
                title: "Diamond Price Predictor",
                description:
                  "Built a machine learning system to predict diamond prices based on cut, color, clarity, and carat. Complete pipeline for data preprocessing, model training, and deployment with real-time predictions.",
                technologies: ["Python", "Flask", "scikit-learn", "ML"],
                icon: <Brain className="w-8 h-8 text-purple-600 transition-transform duration-300 group-hover:scale-110" />,
              },
              {
                title: "Credit Card Fraud Detection",
                description:
                  "Developed a fraud detection system using machine learning algorithms with Flask backend. Real-time prediction interface that alerts users of potentially fraudulent transactions.",
                technologies: ["Flask", "ML", "Python", "Real-time alerts"],
                icon: <Code className="w-8 h-8 text-red-600 transition-transform duration-300 group-hover:scale-110" />,
              },
              {
                title: "Sentiment Analysis Tool",
                description:
                  "Created a sentiment analysis tool using Python and machine learning with Streamlit. Classifies text as positive, negative, or neutral with an interactive web app for real-time detection.",
                technologies: ["Streamlit", "ML", "Python", "NLP"],
                icon: <Brain className="w-8 h-8 text-green-600 transition-transform duration-300 group-hover:scale-110" />,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 rounded-lg bg-white p-6 hover:-translate-y-2 group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  {project.icon}
                  <h3 className="text-xl font-semibold dark:text-white transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">{project.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={tech} 
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
                      style={{animationDelay: `${techIndex * 50}ms`}}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Education & Certifications */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto transition-all duration-300 hover:w-32"></div>
              </div>

              <div className="space-y-6">
                <Card className="border-l-4 border-l-green-600 dark:bg-gray-700 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-green-600 transition-transform duration-200 group-hover:rotate-12" />
                      <div>
                        <CardTitle className="text-lg dark:text-white transition-colors duration-200 group-hover:text-green-600">B.Tech in Computer Science</CardTitle>
                        <CardDescription>Charusat University</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 dark:text-gray-300">CGPA: 9.08</span>
                      <span className="text-gray-800 dark:text-gray-300">2025</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-600 dark:bg-gray-700 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-blue-600 transition-transform duration-200 group-hover:rotate-12" />
                      <div>
                        <CardTitle className="text-lg dark:text-white transition-colors duration-200 group-hover:text-blue-600">HSC (XII)</CardTitle>
                        <CardDescription>H.B. Kapadia New High School</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">91%</span>
                      <span className="text-gray-500 dark:text-gray-400">2021</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto transition-all duration-300 hover:w-32"></div>
              </div>

              <div className="space-y-6">
                <Card className="border-l-4 border-l-purple-600 dark:bg-gray-700 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-600 transition-transform duration-200 group-hover:rotate-12" />
                      <div>
                        <CardTitle className="text-lg dark:text-white transition-colors duration-200 group-hover:text-purple-600">Data Science Masters</CardTitle>
                        <CardDescription>PW Skills</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-l-4 border-l-orange-600 dark:bg-gray-700 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-orange-600 transition-transform duration-200 group-hover:rotate-12" />
                      <div>
                        <CardTitle className="text-lg dark:text-white transition-colors duration-200 group-hover:text-orange-600">Microsoft Power BI</CardTitle>
                        <CardDescription>Udemy</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                
                <Card className="border-l-4 border-l-teal-600 dark:bg-gray-700 dark:border-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-teal-600 transition-transform duration-200 group-hover:rotate-12" />
                      <div>
                        <CardTitle className="text-lg dark:text-white transition-colors duration-200 group-hover:text-teal-600">Neo4j Certified Professional</CardTitle>
                        <CardDescription>Neo4j GraphAcademy</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">May 30, 2025</span>
                      <Badge className="bg-teal-100 text-teal-800">Graph Database</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto transition-all duration-300 hover:w-32"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about
              technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: <Mail className="w-6 h-6 text-blue-600" />, label: "Email", value: "aayusht2004@gmail.com", href: "mailto:aayusht2004@gmail.com", bg: "bg-blue-100" },
                  { icon: <Phone className="w-6 h-6 text-green-600" />, label: "Phone", value: "+91 78744 80170", href: "tel:+917874480170", bg: "bg-green-100" },
                  { icon: <Github className="w-6 h-6 text-gray-600" />, label: "GitHub", value: "@aayush-thakkar2914", href: "https://github.com/aayush-thakkar2914", bg: "bg-gray-100" },
                  { icon: <Linkedin className="w-6 h-6 text-blue-600" />, label: "LinkedIn", value: "aayush-thakkar", href: "https://www.linkedin.com/in/aayush-thakkar-b7a80225a/", bg: "bg-blue-100" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 group cursor-pointer">
                    <div className={`w-12 h-12 ${contact.bg} rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      {contact.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white transition-colors duration-200 group-hover:text-blue-600">{contact.label}</p>
                      <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-blue-600 hover:underline break-all transition-all duration-200 hover:text-blue-700">
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
              
              {submitMessage && (
                <div className={`mb-4 p-3 rounded-lg transition-all duration-300 ${
                  submitMessage.startsWith('✅') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-blue-600">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-blue-400"
                    placeholder="Your Name"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-blue-600">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-blue-400"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200 group-focus-within:text-blue-600">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full min-h-[120px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all duration-200 hover:border-blue-400"
                    placeholder="Your message..."
                    disabled={isSubmitting}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none h-10 px-4 py-2 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 transition-transform duration-200 group-hover:translate-x-1" size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">© 2025 Aayush Thakkar. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              {[
                { href: "mailto:aayusht2004@gmail.com", icon: Mail },
                { href: "https://github.com/aayush-thakkar2914", icon: Github },
                { href: "https://www.linkedin.com/in/aayush-thakkar-b7a80225a/", icon: Linkedin }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}