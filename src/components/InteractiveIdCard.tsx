import { useState, MouseEvent, KeyboardEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { RotateCw, Mail, Phone, MapPin, FileText, GraduationCap } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface InteractiveIdCardProps {
  onOpenResume: () => void;
}

export function InteractiveIdCard({ onOpenResume }: InteractiveIdCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingTrigger, setSwingTrigger] = useState(0);
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 22,
  });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 180,
    damping: 22,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
    setSwingTrigger((c) => c + 1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleFlip();
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none">
      {/* Woven Lanyard Strap & Metal Clasp */}
      <div className="relative z-10 flex flex-col items-center -mb-3">
        {/* Lanyard band with name woven on the strap */}
        <div className="w-10 h-14 rounded-t-sm bg-gradient-to-b from-[#1D4ED8] via-[#2563EB] to-[#0D9488] shadow-md flex flex-col items-center justify-center overflow-hidden border-x border-white/15">
          <span className="text-[7px] font-mono font-semibold tracking-widest text-white/95 uppercase [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
            BHAVANA MASARE
          </span>
        </div>
        {/* Brushed metal clasp & ring */}
        <div className="w-8 h-3.5 rounded-sm bg-gradient-to-b from-zinc-200 to-zinc-400 dark:from-zinc-400 dark:to-zinc-600 border border-zinc-400 dark:border-zinc-500 shadow-sm flex items-center justify-center">
          <div className="w-3 h-1 rounded-full bg-zinc-700 dark:bg-zinc-900" />
        </div>
        <div className="w-3 h-4 rounded-b-full border-2 border-zinc-400 dark:border-zinc-500 -mt-0.5" />
      </div>

      {/* Swinging & 3D-Flipping ID Card Container */}
      <div
        className="w-full max-w-[350px]"
        style={{ perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          aria-label={`Interactive ID card for ${PROFILE.name}. Click to flip between front photo and back credentials.`}
          onClick={handleToggleFlip}
          onKeyDown={handleKeyDown}
          key={swingTrigger}
          initial={
            shouldReduceMotion
              ? false
              : {
                  rotateZ: swingTrigger === 0 ? -1.5 : isFlipped ? 4 : -4,
                }
          }
          animate={
            shouldReduceMotion
              ? { rotateZ: 0 }
              : {
                  rotateZ: 0,
                  rotateY: isFlipped ? 180 : 0,
                }
          }
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          transition={{
            rotateZ: { type: 'spring', stiffness: 140, damping: 12 },
            rotateY: { type: 'spring', stiffness: 190, damping: 22 },
            y: { duration: 0.2 },
          }}
          style={{
            rotateX: shouldReduceMotion ? 0 : tiltX,
            rotateY: shouldReduceMotion ? 0 : isFlipped ? 180 : tiltY,
            transformStyle: 'preserve-3d',
            transformOrigin: 'top center',
          }}
          className="relative w-full min-h-[455px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2B705]"
        >
          {/* ================= FRONT FACE OF ID CARD ================= */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-[#3B82F6] via-[#10B981] to-[#F59E0B] shadow-2xl"
          >
            <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#0D0D10] overflow-hidden flex flex-col justify-between">
              {/* Top ID Card Band + Punch Slot */}
              <div className="relative bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#10B981] px-5 pt-4 pb-3.5 text-white">
                {/* Punched badge slot */}
                <div
                  aria-hidden="true"
                  className="mx-auto mb-2.5 w-12 h-2 rounded-full bg-zinc-950/35 border border-white/30"
                />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono tracking-wide text-white/90">
                    DEVELOPER PASS
                  </span>
                  <span className="text-[11px] font-mono text-[#FEF08A] tabular-nums">
                    M.TECH · 2028
                  </span>
                </div>
              </div>

              {/* Portrait Photo Frame */}
              <div className="px-5 pt-4 flex-1 flex flex-col items-center justify-center">
                <div className="w-44 h-48 sm:w-48 sm:h-52 rounded-xl overflow-hidden bg-white border-2 border-zinc-200 dark:border-zinc-700 shadow-md">
                  {!imgError ? (
                    <img
                      src={PROFILE.photoUrl}
                      alt="Bhavana N Masare"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/15 via-emerald-500/15 to-amber-500/15">
                      <span className="font-display text-4xl font-bold text-zinc-900">BM</span>
                    </div>
                  )}
                </div>

                {/* Bold Signature Name Band */}
                <div className="w-full mt-4 rounded-xl bg-gradient-to-r from-[#F2B705] via-[#F59E0B] to-[#FB923C] px-4 py-2.5 text-center shadow-sm">
                  <p className="font-display text-lg font-bold tracking-tight text-zinc-950">
                    {PROFILE.name}
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-900/85">
                    IT Graduate · M.Tech Computer Science
                  </p>
                </div>
              </div>

              {/* Card Bottom Footer Band */}
              <div className="px-5 py-3.5 mt-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 flex items-center justify-between gap-2 text-xs">
                <span className="text-zinc-600 dark:text-zinc-400 truncate">
                  {PROFILE.location}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-[#2563EB] dark:text-[#3B82F6] shrink-0">
                  <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Click to flip</span>
                </span>
              </div>
            </div>
          </div>

          {/* ================= BACK FACE OF ID CARD ================= */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-[#F59E0B] via-[#F43F5E] to-[#3B82F6] shadow-2xl"
          >
            <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#0D0D10] overflow-hidden flex flex-col justify-between">
              {/* Top Magnetic/Header Band */}
              <div className="bg-zinc-950 dark:bg-zinc-900 px-5 pt-4 pb-3.5 text-white border-b border-zinc-800">
                <div
                  aria-hidden="true"
                  className="mx-auto mb-2.5 w-12 h-2 rounded-full bg-zinc-800 border border-zinc-700"
                />
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-[#F2B705]">
                    {PROFILE.name}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400">CREDENTIALS</span>
                </div>
              </div>

              {/* Back Content: Education, Stack & Contact */}
              <div className="px-5 py-4 space-y-3.5 flex-1 text-left">
                <div className="space-y-1.5">
                  <p className="text-[11px] font-mono text-[#3B82F6] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>EDUCATION</span>
                  </p>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    M.Tech CS — Raisoni SkillTech University (2028)
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    B.Tech IT — Sinhgad College of Engineering, Pune
                  </p>
                </div>

                <div className="pt-2.5 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
                  <p className="text-[11px] font-mono text-[#10B981]">CORE STACK</p>
                  <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Python · C · C++ · Java · React.js · Node.js · SQL · MySQL · MongoDB · Power BI
                  </p>
                </div>

                <div className="pt-2.5 border-t border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Mail className="w-3.5 h-3.5 text-[#F43F5E] shrink-0" aria-hidden="true" />
                    <span className="truncate">{PROFILE.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <Phone className="w-3.5 h-3.5 text-[#10B981] shrink-0" aria-hidden="true" />
                    <span className="tabular-nums">{PROFILE.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                    <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" aria-hidden="true" />
                    <span>{PROFILE.location}</span>
                  </div>
                </div>
              </div>

              {/* Back Bottom Actions */}
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenResume();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2B705] text-zinc-950 text-xs font-semibold hover:brightness-105 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Resume PDF</span>
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Flip front</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
