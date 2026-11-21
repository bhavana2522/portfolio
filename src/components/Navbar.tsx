import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Menu, X, FileText } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenResume }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-zinc-50/90 dark:bg-[#050505]/90 backdrop-blur-md border-zinc-200 dark:border-zinc-800/80'
          : 'bg-zinc-50/70 dark:bg-[#050505]/70 backdrop-blur-sm border-zinc-200/70 dark:border-zinc-800/50'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#about');
          }}
          className="font-display text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B705]"
        >
          {PROFILE.shortName}
        </a>

        {/* Zone 2: 5 clean single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="relative text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors duration-150 whitespace-nowrap shrink-0 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 hover:after:w-full after:bg-[#F2B705] after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B705]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-tight rounded-lg bg-zinc-950 text-zinc-50 dark:bg-[#F2B705] dark:text-zinc-950 hover:opacity-90 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2B705]"
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Resume PDF</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Scroll-linked colorful progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: shouldReduceMotion ? 0 : scaleX, transformOrigin: '0% 50%' }}
        className="h-[2.5px] w-full bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#F59E0B]"
      />

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] px-4 py-4 space-y-2">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <span>{item.label}</span>
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenResume();
            }}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-zinc-950 text-zinc-50 dark:bg-[#F2B705] dark:text-zinc-950 cursor-pointer"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>View Resume PDF</span>
          </button>
        </div>
      )}
    </header>
  );
}
