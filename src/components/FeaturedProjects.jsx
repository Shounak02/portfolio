import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

// ✅ Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("category", "featured")
        .order("id", { ascending: true });
      if (!error) setProjects(data || []);
      else console.error("Supabase fetch error:", error);
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-300">Loading Featured Projects…</div>
    );
  }

  return (
    <div className="py-16">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Featured Projects</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-indigo-600/50 to-purple-600/50" />
      </div>

      {/* Grid of projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group relative rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative p-5 z-10">
              <div className="overflow-hidden rounded-lg aspect-video">
                <img
                  src={p.Img}
                  alt={p.Title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  {p.Title}
                </h4>
                <p className="text-gray-300/80 text-sm line-clamp-2">
                  {p.Description}
                </p>
                <div className="pt-3 flex justify-between items-center">
                  {p.Link && (
                    <a
                      href={p.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Live Demo
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                    </a>
                  )}
                  <Link
                    to={`/project/${p.id}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 text-sm transition-all duration-200 hover:scale-105"
                  >
                    Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Learning Projects button */}
      <div className="mt-12 text-center">
        <Link
          to="/learning-projects"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-2xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 relative group-hover:rotate-12 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
            <path d="M7 16.5l5-3m0 0 5 3m-5-3v-5.5" />
          </svg>
          <span className="relative font-medium text-base">
            More Learning Projects
          </span>
        </Link>
      </div>
    </div>
  );
}
