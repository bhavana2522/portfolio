import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, X, Check } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { ProjectVisual } from './ProjectVisual';

type FilterCategory = 'All' | 'Full-Stack' | 'AI & EdTech' | 'Web Design';

const FILTER_OPTIONS: FilterCategory[] = ['All', 'Full-Stack', 'AI & EdTech', 'Web Design'];

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((project) => project.category === filter);

  const activeProject =
    filteredProjects.find((p) => p.id === activeId) ?? filteredProjects[0] ?? PROJECTS[0];

  useEffect(() => {
    if (!filteredProjects.some((p) => p.id === activeId) && filteredProjects[0]) {
      setActiveId(filteredProjects[0].id);
    }
  }, [filter, filteredProjects, activeId]);

  useEffect(() => {
    if (!modalProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalProject]);

  return (
    <section
      id="projects"
      className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Spring Animated Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-mono text-[#3B82F6]">
              Selected Projects · 03 Builds
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
              style={{ textWrap: 'balance' }}
            >
              Collaborative applications across commerce, AI learning, and web design.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start md:self-auto"
          >
            {FILTER_OPTIONS.map((option) => {
              const isSelected = filter === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFilter(option)}
                  className={`relative px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'text-zinc-950 dark:text-zinc-950'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="projectsFilterThumb"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-[#F2B705]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Scroll-Storytelling Showcase */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Scroll Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            {filteredProjects.map((project) => {
              const isActive = project.id === activeProject.id;

              return (
                <motion.article
                  key={project.id}
                  onViewportEnter={() => setActiveId(project.id)}
                  viewport={{ amount: 0.55 }}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveId(project.id)}
                  style={{
                    borderColor: isActive ? project.accentColor : undefined,
                  }}
                  className={`rounded-2xl border p-6 sm:p-7 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-[#0D0D10]'
                      : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-[#08080A] hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2 font-mono tabular-nums">
                      <span
                        className="font-semibold"
                        style={{ color: isActive ? project.accentColor : undefined }}
                      >
                        {project.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.category}</span>
                    </div>
                    <span style={{ color: isActive ? project.accentColor : undefined }}>
                      {project.label}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.summary}
                  </p>

                  <p className="mt-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {project.stack.join(' · ')}
                  </p>

                  <div className="mt-5 lg:hidden">
                    <ProjectVisual project={project} compact />
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalProject(project);
                      }}
                      style={{ color: project.accentColor }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Read Contributions</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <span className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                      {project.contributions.length} Key Deliverables
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Right Sticky Interactive Preview Column (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0D0D10] p-6 space-y-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p
                      className="text-xs font-mono font-medium"
                      style={{ color: activeProject.accentColor }}
                    >
                      {activeProject.index} · {activeProject.label}
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {activeProject.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalProject(activeProject)}
                    style={{ backgroundColor: activeProject.accentColor }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Case Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                <ProjectVisual project={activeProject} />

                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                    Key Contributions
                  </p>
                  <ul className="space-y-2">
                    {activeProject.contributions.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                      >
                        <Check
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: activeProject.accentColor }}
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Project Case Study Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0E] p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="space-y-1">
                  <p
                    className="text-xs font-mono font-medium"
                    style={{ color: modalProject.accentColor }}
                  >
                    {modalProject.index} · {modalProject.category} · {modalProject.label}
                  </p>
                  <h3
                    id="project-modal-title"
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
                  >
                    {modalProject.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {modalProject.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalProject(null)}
                  aria-label="Close project details"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <ProjectVisual project={modalProject} />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                  Overview
                </h4>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {modalProject.summary}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                  Role &amp; Engineering Contributions
                </h4>
                <ul className="space-y-2.5">
                  {modalProject.contributions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                    >
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: modalProject.accentColor }}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {modalProject.stack.join(' · ')}
                </p>
                <button
                  type="button"
                  onClick={() => setModalProject(null)}
                  className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
