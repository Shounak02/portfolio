import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Dock, DockIcon } from "../components/Dock";
import { HomeIcon, MailIcon, GithubIcon, LinkedinIcon } from "lucide-react";

import "./index.css";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import WelcomeScreen from "./Pages/WelcomeScreen";
import NotFoundPage from "./Pages/404";
import ProjectDetails from "./components/ProjectDetail";

// Components
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";
import Professional from "./components/Professional";

// ---------- Footer ----------
const Footer = () => (
  <footer>
    <center>
      <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
      <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
        © 2025{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Shounak™
        </a>
        . All Rights Reserved.
      </span>
    </center>
  </footer>
);

// ---------- Global Dock Component ----------
const GlobalDock = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Dock iconSize={50} iconMagnification={80} iconDistance={120}>
        <DockIcon
          onClick={() => {
            const homeSection = document.getElementById("Home");
            if (homeSection) {
              homeSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <HomeIcon className="w-6 h-6 text-white hover:text-blue-500 transition-colors duration-200" />
        </DockIcon>

        <DockIcon
          onClick={() => {
            const contactSection = document.getElementById("Contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <MailIcon className="w-6 h-6 text-white hover:text-red-500 transition-colors duration-200" />
        </DockIcon>

        <DockIcon href="https://github.com/Shounak02">
          <GithubIcon className="w-6 h-6 text-white hover:text-black transition-colors duration-200" />
        </DockIcon>

        <DockIcon href="https://www.linkedin.com/in/shounakmandal/">
          <LinkedinIcon className="w-6 h-6 text-white hover:text-blue-500 transition-colors duration-200" />
        </DockIcon>

      </Dock>
    </div>
  );
};

// ---------- Landing Page ----------
const LandingPage = ({ showWelcome, setShowWelcome }) => (
  <>
    <AnimatePresence mode="wait">
      {showWelcome && (
        <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
      )}
    </AnimatePresence>

    {!showWelcome && (
      <>
        <Navbar />
        <AnimatedBackground />
        <Home />
        <About />
        <Professional />
        <Portofolio />
        <ContactPage />
        <Footer />
      </>
    )}
  </>
);

// ---------- Project Page Layout ----------
const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

// ---------- App ----------
export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        {/* Global Dock is always visible */}
        <GlobalDock />

        {/* Pages */}
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
