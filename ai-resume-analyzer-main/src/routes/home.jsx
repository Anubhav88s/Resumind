// import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { useAuthStore } from "~/lib/api";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta() {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

/**
 * Home component.
 * The main landing page of the application.
 * Displays a list of analyzed resumes and allows users to upload new ones.
 *
 * @returns {JSX.Element} The rendered Home page.
 */
export default function Home() {
  const { auth, kv } = useAuthStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = await kv.list('resume:*', true);

      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value)
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return <main className="relative z-10">
    <Navbar />

    <section className="page-container flex flex-col items-center min-h-[calc(100vh-100px)] justify-center">
      <div className="py-10 md:py-20 text-center max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-4 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          AI-Powered Resume Analysis
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
          Get the Job You  <br /> <span className="text-gradient">Actually Deserve</span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Stop guessing with your applications. Our AI analyzes your resume against industry standards and gives you actionable feedback to land more interviews.
        </p>

        {!loadingResumes && resumes?.length === 0 ? (
          <div className="pt-8 flex flex-col items-center gap-4">
            <Link to="/upload" className="btn-primary text-lg px-12 py-4 rounded-full shadow-glow hover:scale-105 transition-transform group">
              Analyze My Resume
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
            <p className="text-sm text-text-tertiary">No credit card required • Instant results</p>
          </div>
        ) : (
          <div className="pt-8">
            <h2 className="text-2xl font-medium text-white mb-8">Your Recent Analyses</h2>
          </div>
        )}
      </div>

      {loadingResumes && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-indigo-300 mt-4 animate-pulse">Loading your dashboard...</p>
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl pb-20 px-4">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
          {/* Add New Card */}
          <Link to="/upload" className="border border-dashed border-gray-700 bg-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-white/10 transition-all group min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-dark-bg border border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <span className="text-gray-400 font-medium group-hover:text-white transition-colors">Analyze New Resume</span>
          </Link>
        </div>
      )}
    </section>
  </main>
}
