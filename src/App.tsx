import { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeDivider } from './components/MarqueeDivider';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { PROFILE } from './data/portfolioData';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#050505] dark:text-zinc-100 transition-colors duration-200">
        <Navbar onOpenResume={() => setResumeOpen(true)} />

        <main>
          <HeroSection
            onOpenResume={() => setResumeOpen(true)}
            isDark={isDark}
            onToggleTheme={() => setIsDark((prev) => !prev)}
          />
          <MarqueeDivider />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection onOpenResume={() => setResumeOpen(true)} />
        </main>

        <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {PROFILE.name}
              </span>
              <span aria-hidden="true">·</span>
              <span>{PROFILE.location}</span>
              <span aria-hidden="true">·</span>
              <span>© 2026</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
              >
                {PROFILE.email}
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-[#F2B705] transition-colors cursor-pointer"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </footer>

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </MotionConfig>
  );
}
