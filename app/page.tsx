"use client"

import { useState } from "react"
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
} from "lucide-react"

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-gray-900 dark:text-white">Aayush Thakkar</div>
            <div className="hidden md:flex space-x-8 items-center">
              {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
                AT
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">Aayush Thakkar</h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
                Tech enthusiast | Python Developer | FastAPI & Java Backend | ML + Automation Explorer
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
              href="mailto:aayusht2004@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              <Mail size={20} />
              aayusht2004@gmail.com
            </a>

              <a
                href="tel:+917874480170"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                <Phone size={20} />
                +91 78744 80170
              </a>
              <a
                href="https://github.com/aayush-thakkar2914"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                <Github size={20} />
                @aayush-thakkar2914
              </a>
              <a
                href="https://www.linkedin.com/in/aayush-thakkar-b7a80225a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin size={20} />
                aayush-thakkar
              </a>
            </div>

            <button 
              onClick={handleResumeDownload}
              disabled={isDownloading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:opacity-50 inline-flex items-center transition-colors duration-200"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="mr-2" size={20} />
                  Download Resume
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center">
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

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Programming",
                icon: <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />,
                skills: ["Python", "Java", "C/C++", "PHP"],
                color: "bg-blue-100 text-blue-800"
              },
              {
                title: "Web Technologies", 
                icon: <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />,
                skills: ["HTML", "CSS", "JavaScript", "JSP", "Servlets", "Flask", "Django", "FastAPI"],
                color: "bg-green-100 text-green-800"
              },
              {
                title: "Databases",
                icon: <Database className="w-12 h-12 text-purple-600 mx-auto mb-4" />,
                skills: ["Oracle SQL", "MySQL", "OpenSearch"],
                color: "bg-purple-100 text-purple-800"
              },
              {
                title: "Other Skills",
                icon: <Brain className="w-12 h-12 text-orange-600 mx-auto mb-4" />,
                skills: ["Machine Learning", "Prompt Engineering", "Sales & Marketing", "Workflow Automation", "AI Integration", "Google APIs", "Neo4j"],
                color: "bg-orange-100 text-orange-800"
              }
            ].map((category, index) => (
              <div key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-700 dark:border-gray-600 rounded-lg bg-white p-6">
                <div className="text-center">
                  {category.icon}
                  <h3 className="text-xl dark:text-white font-semibold">{category.title}</h3>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${category.color}`}>
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

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Experience</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Python Developer Intern",
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
                className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white border-l-4 border-l-blue-600 shadow-lg"
              >
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-2xl font-semibold leading-none tracking-tight text-xl text-gray-900 dark:text-white">{exp.title}</div>
                      <div className="text-sm text-muted-foreground text-lg font-medium text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                      <Calendar size={16} className="mr-2" />
                      {exp.period}
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-foreground border-blue-200 text-blue-700 dark:border-blue-400 dark:text-blue-300 dark:bg-blue-900/20 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Resume Screening Automation",
                description:
                  "Built an AI-powered resume screening system using N8N workflow automation that processes PDF resumes, analyzes them with Google Gemini AI, and delivers results via email in under 30 seconds. Achieved 95% time reduction in HR screening process.",
                technologies: ["N8N", "Google Gemini AI", "Workflow Automation", "Google APIs", "HTML/CSS/JS"],
                icon: <Brain className="w-8 h-8 text-indigo-600" />,
              },
              {
                title: "Akshar Lights E-Commerce Site",
                description:
                  "Designed and developed a fully functional e-commerce platform with product listing, shopping cart, user authentication, and order management. Focused on responsive design and secure backend integration.",
                technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS"],
                icon: <Globe className="w-8 h-8 text-blue-600" />,
              },
              {
                title: "Diamond Price Predictor",
                description:
                  "Built a machine learning system to predict diamond prices based on cut, color, clarity, and carat. Complete pipeline for data preprocessing, model training, and deployment with real-time predictions.",
                technologies: ["Python", "Flask", "scikit-learn", "ML"],
                icon: <Brain className="w-8 h-8 text-purple-600" />,
              },
              {
                title: "Credit Card Fraud Detection",
                description:
                  "Developed a fraud detection system using machine learning algorithms with Flask backend. Real-time prediction interface that alerts users of potentially fraudulent transactions.",
                technologies: ["Flask", "ML", "Python", "Real-time alerts"],
                icon: <Code className="w-8 h-8 text-red-600" />,
              },
              {
                title: "Sentiment Analysis Tool",
                description:
                  "Created a sentiment analysis tool using Python and machine learning with Streamlit. Classifies text as positive, negative, or neutral with an interactive web app for real-time detection.",
                technologies: ["Streamlit", "ML", "Python", "NLP"],
                icon: <Brain className="w-8 h-8 text-green-600" />,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-700 dark:border-gray-600 rounded-lg border bg-white text-gray-900 shadow-sm p-6"
              >
                <div className="flex flex-col space-y-1.5 p-6 pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    {project.icon}
                    <div className="text-2xl font-semibold leading-none tracking-tight text-xl">{project.title}</div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-gray-100 text-gray-700 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white border-l-4 border-l-green-600">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="text-lg dark:text-white font-semibold leading-none tracking-tight">B.Tech in Computer Science</div>
                        <div className="text-sm text-muted-foreground">Charusat University</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 dark:text-gray-300">CGPA: 9.08</span>
                      <span className="text-gray-800 dark:text-gray-300">2025</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white border-l-4 border-l-blue-600">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="text-lg dark:text-white font-semibold leading-none tracking-tight">HSC (XII)</div>
                        <div className="text-sm text-muted-foreground">H.B. Kapadia New High School</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">91%</span>
                      <span className="text-gray-500 dark:text-gray-400">2021</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Certifications</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white border-l-4 border-l-purple-600">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="text-lg dark:text-white font-semibold leading-none tracking-tight">Data Science Masters</div>
                        <div className="text-sm text-muted-foreground">PW Skills</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white border-l-4 border-l-orange-600">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-orange-600" />
                      <div>
                        <div className="text-lg dark:text-white font-semibold leading-none tracking-tight">Microsoft Power BI</div>
                        <div className="text-sm text-muted-foreground">Udemy</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white border-l-4 border-l-teal-600">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-teal-600" />
                      <div>
                        <div className="text-lg dark:text-white font-semibold leading-none tracking-tight">Neo4j Certified Professional</div>
                        <div className="text-sm text-muted-foreground">Neo4j GraphAcademy</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">May 30, 2025</span>
                      <span className="bg-teal-100 text-teal-800 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">Graph Database</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about
              technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
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
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${contact.bg} rounded-lg flex items-center justify-center`}>
                      {contact.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{contact.label}</p>
                      <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-blue-600 hover:underline transition-colors">
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
              
              {submitMessage && (
                <div className={`mb-4 p-3 rounded-lg ${
                  submitMessage.startsWith('✅') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Your Name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Your message..."
                    disabled={isSubmitting}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none h-10 px-4 py-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">© 2025 Aayush Thakkar. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="mailto:aayusht2004@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/aayush-thakkar2914"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/aayush-thakkar-b7a80225a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}