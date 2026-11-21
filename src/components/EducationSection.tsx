import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Award, BookOpen, Users } from 'lucide-react';
import { EDUCATION, CERTIFICATIONS, LEADERSHIP_ACTIVITIES } from '../data/portfolioData';

const EDU_COLORS = ['#3B82F6', '#10B981'];

export function EducationSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });

  const spineScale = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
  });

  return (
    <section
      id="education"
      className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 max-w-2xl pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <p className="text-xs font-mono text-[#8B5CF6]">
            Academic Background &amp; Credentials
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
            style={{ textWrap: 'balance' }}
          >
            Continuous academic progression paired with verified analytics and Python training.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Scroll-animated Education Timeline */}
          <div ref={timelineRef} className="lg:col-span-7 relative pl-7 sm:pl-8 space-y-8">
            <div
              aria-hidden="true"
              className="absolute left-2 top-2 bottom-2 w-[1px] bg-zinc-200 dark:bg-zinc-800"
            />
            <motion.div
              aria-hidden="true"
              style={{
                scaleY: shouldReduceMotion ? 1 : spineScale,
                transformOrigin: '50% 0%',
              }}
              className="absolute left-2 top-2 bottom-2 w-[2.5px] -ml-[0.75px] bg-gradient-to-b from-[#3B82F6] via-[#10B981] to-[#F59E0B]"
            />

            {EDUCATION.map((edu, index) => {
              const accent = EDU_COLORS[index % EDU_COLORS.length];
              return (
                <motion.div
                  key={edu.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0D0D10] p-6 space-y-3"
                >
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: accent }}
                    className="absolute -left-[25px] sm:-left-[29px] top-7 w-2.5 h-2.5 rounded-full ring-4 ring-zinc-50 dark:ring-[#050505]"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span style={{ color: accent }} className="font-medium">
                      {edu.status} · {edu.timeframe}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">{edu.location}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                      <BookOpen
                        className="w-4 h-4 shrink-0"
                        style={{ color: accent }}
                        aria-hidden="true"
                      />
                      <span>{edu.institution}</span>
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {edu.focus}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Certifications & Leadership */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0D0D10] p-6 space-y-5 relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F2B705] to-[#F43F5E]"
              />
              <div className="flex items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-1">
                <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#F2B705]" aria-hidden="true" />
                  <span>Certifications</span>
                </h3>
                <span className="font-mono text-xs tabular-nums text-[#F2B705] font-medium">
                  2026
                </span>
              </div>

              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                        {cert.title}
                      </p>
                      <span className="text-xs font-mono tabular-nums text-zinc-500 dark:text-zinc-400 shrink-0">
                        {cert.issuer} · {cert.year}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {cert.focus}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0D0D10] p-6 space-y-4 relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]"
              />
              <div className="flex items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3 pt-1">
                <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                  <span>Leadership &amp; Activities</span>
                </h3>
              </div>

              <ul className="space-y-3">
                {LEADERSHIP_ACTIVITIES.map((activity, idx) => (
                  <li
                    key={activity}
                    className="flex items-start gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="font-mono text-xs tabular-nums text-[#8B5CF6] font-medium mt-0.5 shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
