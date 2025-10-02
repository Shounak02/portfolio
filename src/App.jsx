// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Dock, DockIcon } from "../components/Dock";
import { HomeIcon, MailIcon, GithubIcon, LinkedinIcon, FileTextIcon } from "lucide-react";

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

// ---------- Glassy CV Modal ----------
const CVModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl w-[90%] max-w-4xl h-[90%] shadow-2xl p-6 flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition-colors"
      >
        ×
      </button>
      <div className="text-white text-xl sm:text-2xl font-semibold mb-4">
        Shounak Mandal - CV Preview
      </div>
      <div className="border-b border-white/30 mb-4"></div>
      <iframe
        src="/Shounak_Mandal.pdf"
        title="CV Preview"
        className="w-full h-full rounded-xl border border-white/20 shadow-inner"
        style={{ backdropFilter: "blur(10px)" }}
      />
    </div>
  </div>
);

// ---------- Global Dock ----------
const GlobalDock = ({ onShowCV }) => (
  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
    <Dock iconSize={50} iconMagnification={80} iconDistance={120}>
      <DockIcon
        onClick={() => {
          const homeSection = document.getElementById("Home");
          if (homeSection) homeSection.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <HomeIcon className="w-6 h-6 text-white hover:text-blue-500 transition-colors duration-200" />
      </DockIcon>

      <DockIcon
        onClick={() => {
          const contactSection = document.getElementById("Contact");
          if (contactSection)
            contactSection.scrollIntoView({ behavior: "smooth" });
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

      <DockIcon onClick={onShowCV}>
        <FileTextIcon className="w-6 h-6 text-white hover:text-green-400 transition-colors duration-200" />
      </DockIcon>
    </Dock>
  </div>
);

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
  const [showCV, setShowCV] = useState(false);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        {/* CV Modal */}
        {showCV && <CVModal onClose={() => setShowCV(false)} />}

        {/* Navbar & Dock only after welcome */}
        {!showWelcome && (
          <>
            <Navbar onShowCV={() => setShowCV(true)} />
            <GlobalDock onShowCV={() => setShowCV(true)} />
          </>
        )}

        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  key="landing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <LandingPage
                    showWelcome={showWelcome}
                    setShowWelcome={setShowWelcome}
                  />
                </motion.div>
              }
            />
            <Route
              path="/project/:id"
              element={
                <motion.div
                  key="project"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <ProjectPageLayout />
                </motion.div>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}
