import React from "react";
import { Calendar, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";

const Professional = () => {
  const professionalData = [
    {
      id: 1,
      type: "work",
      title: "Artificial Intelligence Intern",
      company: "Edunet Foundation",
      location: "Remote",
      duration: "Jan 2025 - Feb 2025",
      description: [
        "TechSaksham Internship, a 4-week program under the All India Council for Technical Education (AICTE)",
        "in collaboration with Microsoft & SAP, implemented by Edunet Foundation.",
        "Had the opportunity to enhance my skills in Natural Language Processing (NLP), AI-driven chatbot development, and full-stack implementation.",
        "Built a Healthcare Chatbot, an AI-powered virtual assistant designed to provide instant responses to general health-related queries.",
      ],
      skills: ["Streamlit", "Transformers", "NLTK", "Hugging Face Transformers", "Python", "Natural Language Processing (NLP)", "AI Chatbot Development", "Full-Stack Development", "Data Preprocessing", "Text Analytics", "REST APIs", "Model Deployment"],
    },
    {
      id: 2,
      type: "work",
      title: "Machine Learning Intern",
      company: "Edunet Foundation in collaboration with IBM Skills Build",
      location: "Virtual",
      duration: "Jun 2025 - Jul 2025",
      description: [
        "Successfully completed a 6-week online internship on an AIML project.", 
        "Employee Salary Prediction.",
        "This enriching experience was made possible through the collaboration of All India Council for Technical Education (AICTE) ,Edunet Foundationn, and IBM SkillsBuild.",
        "Grateful for the valuable learning, hands-on exposure, and guidance throughout this journey 🚀",
      ],
      skills: ["Python", "Machine Learning", "Artificial Intelligence (AI)", "Data Analysis", "Data Visualization", "Pandas", "NumPy", "Scikit-learn", "Regression Models", "Predictive Modeling", "Feature Engineering", "Model Evaluation", "Jupyter Notebooks", "SQL Basics"],
    },
    {
      id: 3,
      type: "education",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      institution: "Institute of Engineering & Management",
      duration: "2022 - 2026",
      cgpa: "8.77/10",
      description: [
        "Currently pursuing B.Tech in Computer Science & Engineering",
        "Maintaining excellent academic performance with CGPA of 8.77/10",
        "Specialized in Software Development and Web Technologies",
        "Focused on Full-Stack Development and Modern Frameworks",
        "Active in coding competitions and technical events",
        "Completed multiple projects in various programming languages",
      ],
      skills: ["Data Structures", "Algorithms", "Software Engineering", "Database Management", "Web Development","Operating Sytems","OOP","Computer Networks","Cyber Security"],
    },
  ];

  const certificateData = [
    {
      id: 1,
      title: "Operations Job Simulation Certificate of Completion",
      issuer: "Forage",
      description: "Completed practical tasks in Foundations of Operations and Facilitating Ultra-High Net Worth Transactions",
      date: "Dec 2024",
      certificateId:"tWRtiEF9Wp7Y2BzrT"
    },

    {
      id: 2,
      title: "AWS Cloud Technology Consultant Professional Certificate",
      issuer: "Amazon Web Services via Coursera",
      description: "Completed a nine-course online program covering AWS Cloud fundamentals, Python application development, DevOps, automation, data analytics, and project management to become a successful AWS Cloud Consultant",
      date: "March 2025",
      certificateId: "M0NCFDVT62BR",
    },
    {
      id: 3,
      title: "🚀 Built an AI-Powered Day Travel Planner! 🌍✨",
      issuer: "Hugging Face",
      
      description: [
        "✅ AI-generated custom itineraries (LLaMA-3.3-70B)",
        "✅ Seamless UI with Gradio",
        "✅ Quick, bullet-point travel plans",
        "🛠️ Tech Stack: Python | LangChain | LangGraph | Gradio | Groq API",
      ],
      date: "Feb 2025",
    },
  ];

  const TimelineItem = ({ item, index }) => {
    const isLeft = index % 2 === 0;

    return (
      <div className="relative w-full md:flex md:items-center mb-12">
        <div
          className={`w-full md:w-5/12 ${
            isLeft ? "md:pr-8 md:ml-auto md:text-right" : "md:pl-8 md:mr-auto md:text-left"
          }`}
        >
          <div className="professional-card bg-gradient-to-br from-[#1e1b4b]/80 to-[#312e81]/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4 md:p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4 justify-start md:justify-between">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                {item.type === "work" ? (
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" />
                ) : (
                  <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {item.title || item.degree}
                </h3>
                <p className="text-purple-300 text-sm md:text-base">{item.company || item.institution}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-xs md:text-sm text-gray-300 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span>{item.duration}</span>
              </div>
              {item.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>

            <ul className="space-y-2 mb-4">
              {(item.description || []).map((desc, idx) => (
                <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            {item.cgpa && (
              <div className="mb-4 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-sm font-medium">CGPA: {item.cgpa}</span>
                </div>
              </div>
            )}

            {item.skills && (
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 h-full items-center z-0">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full z-10"></div>
        </div>
      </div>
    );
  };

  const CertificateCard = ({ cert }) => (
    <div className="professional-card bg-gradient-to-br from-[#1e1b4b]/80 to-[#312e81]/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4 md:p-6 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex-shrink-0">
          <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base md:text-lg font-bold text-white group-hover:text-purple-300 transition-colors break-words">
            {cert.title}
          </h4>
          <p className="text-purple-300 text-xs md:text-sm">{cert.issuer}</p>
        </div>
      </div>
      <p className="text-gray-300 text-xs md:text-sm mb-3">{cert.description}</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="text-blue-400 text-xs md:text-sm">{cert.date}</span>
        {cert.certificateId && (
          <span className="text-purple-400 text-xs font-mono break-all">{`ID: ${cert.certificateId}`}</span>
        )}
      </div>
    </div>
  );

  return (
    <section id="Professional" className="min-h-screen py-12 md:py-20 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Professional Journey
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto">
            Explore my professional experience, education, and achievements. From internships to certifications, here's my journey in the tech industry with a focus on continuous learning and growth.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 opacity-30 z-0"></div>
          {professionalData.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Certificates & Achievements */}
        <div className="mt-16 md:mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8 md:mb-12 px-4">
            Certificates & Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {certificateData.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Professional;
