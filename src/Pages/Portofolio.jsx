import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore
            ? "group-hover:-translate-y-0.5"
            : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline
          points={
            isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"
          }
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/express.svg", language: "Express" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "docker.svg", language: "Docker" },
  { icon: "aws-svgrepo-com.svg", language: "AWS" },
  { icon: "netlify-svgrepo-com.svg", language: "Netlify" },
  { icon: "github-color-svgrepo-com.svg", language: "GitHub" }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: true }),
        supabase.from("certificates").select("*").order("id", { ascending: true }),
      ]);

      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      setProjects(projectsResponse.data || []);
      setCertificates(certificatesResponse.data || []);

      localStorage.setItem("projects", JSON.stringify(projectsResponse.data));
      localStorage.setItem("certificates", JSON.stringify(certificatesResponse.data));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);

  useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedCertificates = localStorage.getItem("certificates");

    if (cachedProjects && cachedCertificates) {
      setProjects(JSON.parse(cachedProjects));
      setCertificates(JSON.parse(cachedCertificates));
    }

    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => setValue(newValue);

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") setShowAllProjects((prev) => !prev);
    else setShowAllCertificates((prev) => !prev);
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden relative" id="Portofolio">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="text-center pb-10 relative z-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }} className="relative z-10">
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px" }} className="md:px-4">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": { color: "#fff", backgroundColor: "rgba(139, 92, 246, 0.1)" },
                "&.Mui-selected": { color: "#fff", background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))" },
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        {/* Tab Panels */}
        <TabPanel value={value} index={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
            {displayedProjects.map((project, index) => (
              <CardProject key={project.id || index} {...project} />
            ))}
          </div>
          {projects.length > initialItems && (
            <div className="mt-6 flex justify-center">
              <button onClick={() => toggleShowMore("projects")} className="px-6 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-white">
                {showAllProjects ? "See Less" : "More Learning Projects"}
              </button>
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayedCertificates.map((cert, index) => (
              <Certificate key={cert.id || index} ImgSertif={cert.Img} />
            ))}
          </div>
          {certificates.length > initialItems && (
            <div className="mt-6 flex justify-start">
              <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {techStacks.map((stack, index) => (
              <TechStackIcon key={index} TechStackIcon={stack.icon} Language={stack.language} />
            ))}
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
