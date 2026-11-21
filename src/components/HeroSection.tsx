import { useRef, useState, MouseEvent } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Sun, Moon, Layers, Code2, Database, Sparkles } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const FOCUS_TABS = [
  {
    id: 'web',
    label: 'Full-Stack Web',
    color: '#3B82F6',
    detail: 'React.js, Node.js, Express.js & responsive interfaces applied in SolivaGuard.',
    icon: Code2,
  },
  {
    id: 'ai',
    label: 'AI & Python',
    color: '#10B981',
    detail: 'Python, AI/ML fundamentals & API integration powering EDVIKO learning flows.',
    icon: Sparkles,
  },
  {
    id: 'data',
    label: 'Databases',
    color: '#F2B705',
    detail: 'SQL, MySQL & MongoDB data modeling certified for data analytics (2026).',
    icon: Database,
  },
  {
    id: 'cs',
    label: 'CS & BI',
    color: '#F43F5E',
    detail: 'C, C++, Java, DSA, OOP alongside Power BI & Tableau visual reporting.',
    icon: Layers,
  },
];

const HIGHLIGHT_ACCENTS = ['#F2B705', '#3B82F6', '#10B981', '#F43F5E'];

export function HeroSection({ onOpenResume, isDark, onToggleTheme }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeTabId, setActiveTabId] = useState<string>('web');
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const portraitScrollY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 48]);
  const copyScrollY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -20]);

  // Interactive 3D tilt for the portrait card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 180,
    damping: 24,
  });

  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeTab = FOCUS_TABS.find((t) => t.id === activeTabId) ?? FOCUS_TABS[0];

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800/80"
    >
      {/* Colorful ambient atmospheric washes behind the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-ambient absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/12 dark:bg-blue-500/15 blur-3xl" />
        <div className="animate-ambient absolute top-16 right-0 w-[28rem] h-[28rem] rounded-full bg-amber-400/14 dark:bg-amber-400/12 blur-3xl" />
        <div className="animate-ambient absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-emerald-500/10 dark:bg-emerald-500/12 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left column: Typographic hierarchy & interactive stack tabs */}
          <motion.div
            style={{ y: copyScrollY }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between gap-7"
          >
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <span>{PROFILE.location}</span>
                  <span aria-hidden="true" className="mx-2 text-zinc-400 dark:text-zinc-600">
                    ·
                  </span>
                  <span>{PROFILE.role}</span>
                </p>

                <button
                  type="button"
                  onClick={onToggleTheme}
                  aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#F2B705]" aria-hidden="true" />
                      <span>Light Paper</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-zinc-700" aria-hidden="true" />
                      <span>Dark Canvas</span>
                    </>
                  )}
                </button>
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[3.45rem] font-bold tracking-tight leading-[1.06] text-zinc-950 dark:text-zinc-50 max-w-2xl"
                style={{ textWrap: 'balance' }}
              >
                Engineering Practical{' '}
                <span className="bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#F59E0B] bg-clip-text text-transparent">
                  Web, AI &amp; Database
                </span>{' '}
                Systems.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-[65ch]">
                {PROFILE.summary}
              </p>
            </div>

            {/* Interactive focus switcher */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-[#0D0D10]/90 backdrop-blur-sm p-4 space-y-3">
              <div
                role="tablist"
                aria-label="Engineering focus areas"
                className="flex flex-wrap items-center gap-1.5"
              >
                {FOCUS_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'text-zinc-950 dark:text-zinc-950'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="heroFocusHighlight"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                          style={{ backgroundColor: tab.color }}
                          className="absolute inset-0 rounded-lg"
                          aria-hidden="true"
                        />
                      )}
                      <Icon className="relative z-10 w-3.5 h-3.5" aria-hidden="true" />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <motion.p
                key={activeTab.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-zinc-700 dark:text-zinc-300"
              >
                {activeTab.detail}
              </motion.p>
            </div>

            {/* Primary action row */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector('#projects')
                      ?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#10B981] text-white text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:border-[#F2B705] dark:hover:border-[#F2B705] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Inspect Resume</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                  {PROFILE.availability}
                </span>
                <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
                  ·
                </span>
                <span>{PROFILE.careerInterests.join(' · ')}</span>
              </div>
            </div>
          </motion.div>

          {/* Right column: Interactive 3D Tilt Portrait Card */}
          <motion.div
            style={{ y: portraitScrollY, perspective: 1000 }}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <motion.div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                rotateX: shouldReduceMotion ? 0 : rotateX,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full rounded-2xl p-[1.5px] bg-gradient-to-br from-[#3B82F6] via-[#10B981] to-[#F59E0B] flex"
            >
              <div className="w-full rounded-[15px] bg-white dark:bg-[#0D0D10] p-4 sm:p-5 flex flex-col justify-between gap-4">
                {/* Portrait photograph container */}
                <div className="relative flex-1 min-h-[300px] sm:min-h-[340px] rounded-xl overflow-hidden bg-white border border-zinc-200 dark:border-zinc-800">
                  {!imgError ? (
                    <img
                      src={PROFILE.photoUrl}
                      alt="Bhavana N Masare portrait"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/15 via-emerald-500/15 to-amber-500/15 p-6 text-center">
                      <span className="font-display text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                        BM
                      </span>
                      <span className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                        {PROFILE.name}
                      </span>
                    </div>
                  )}

                  {/* Subtle bottom gradient scrim for legible caption over studio edge */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-3 text-white">
                    <div>
                      <p className="font-display text-lg font-bold leading-tight">
                        {PROFILE.name}
                      </p>
                      <p className="text-xs text-zinc-200">
                        M.Tech CS · B.Tech IT
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-[#F2B705] shrink-0">
                      India
                    </span>
                  </div>
                </div>

                {/* Chromatic discipline strip inside the frame */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 px-2.5 py-2">
                    <p className="font-mono text-[11px] text-[#3B82F6] font-medium">Web</p>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 truncate">
                      React · Node
                    </p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 px-2.5 py-2">
                    <p className="font-mono text-[11px] text-[#10B981] font-medium">AI &amp; Code</p>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 truncate">
                      Python · Java
                    </p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 px-2.5 py-2">
                    <p className="font-mono text-[11px] text-[#F59E0B] font-medium">Data</p>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 truncate">
                      SQL · Power BI
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Full-width 4-column Highlights strip below the split */}
        <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PROFILE.highlights.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="space-y-1"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</p>
              <p
                className="font-display text-2xl font-bold tracking-tight tabular-nums"
                style={{ color: HIGHLIGHT_ACCENTS[idx % HIGHLIGHT_ACCENTS.length] }}
              >
                {item.value}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
