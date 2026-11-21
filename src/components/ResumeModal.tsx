import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-[86vh] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0E] flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4 shrink-0">
              <div>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  Curriculum Vitae
                </p>
                <h3
                  id="resume-modal-title"
                  className="font-display text-lg font-bold text-zinc-950 dark:text-zinc-50"
                >
                  {PROFILE.name} — Resume
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open Tab</span>
                </a>
                <a
                  href={PROFILE.resumeUrl}
                  download="Bhavana_N_Masare_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-950 text-zinc-50 dark:bg-[#F2B705] dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume modal"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-zinc-100 dark:bg-zinc-950">
              <iframe
                src={PROFILE.resumeUrl}
                title="Bhavana N Masare Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
