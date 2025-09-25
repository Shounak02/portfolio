import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const navigate = useNavigate();

  const handleLiveDemo = (e) => {
    e.stopPropagation();
    if (!ProjectLink) {
      alert("Live demo link is not available");
      return;
    }
    window.open(ProjectLink, "_blank", "noopener,noreferrer");
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    if (!id) {
      alert("Project details are not available");
      return;
    }
    navigate(`/project/${id}`);
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">

        {/* Overlay for gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"></div>

        {/* Optional grid/line overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Main content (buttons clickable) */}
        <div className="relative p-5 z-10 pointer-events-auto">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg h-52 md:h-60 lg:h-64">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Title & Description */}
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {Title}
            </h3>
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={handleLiveDemo}
                className={`inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 ${
                  !ProjectLink ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!ProjectLink}
              >
                <span className="text-sm font-medium">Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <button
                onClick={handleDetails}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  !id ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!id}
              >
                <span className="text-sm font-medium">Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Border overlay */}
          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
