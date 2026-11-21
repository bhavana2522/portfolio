import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SKILL_GROUPS, SkillGroup } from '../data/portfolioData';

type SkillFilter = 'All' | SkillGroup['filterKey'];

const SKILL_FILTERS: SkillFilter[] = [
  'All',
  'Languages',
  'Web & UI',
  'Databases',
  'AI & Data',
  'CS Core',
];

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('All');
  const shouldReduceMotion = useReducedMotion();

  const visibleGroups =
    activeFilter === 'All'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((group) => group.filterKey === activeFilter);

  return (
    <section
      id="skills"
      className="py-16 lg:py-24 border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-mono text-[#10B981]">
              Technical Competencies · 06 Domains
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
              style={{ textWrap: 'balance' }}
            >
              Foundations spanning systems programming, web engineering, databases, and BI.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter technical skills"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start md:self-auto"
          >
            {SKILL_FILTERS.map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'text-white'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="skillsFilterThumb"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#10B981]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleGroups.map((group, idx) => (
            <motion.div
              key={group.id}
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0D0D10] p-6 flex flex-col justify-between gap-6 overflow-hidden relative"
            >
              {/* Top chromatic accent rule */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ backgroundColor: group.accentColor }}
              />

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span style={{ color: group.accentColor }} className="font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400">{group.filterKey}</span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {group.category}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {group.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
                  {group.skills.join(' · ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
