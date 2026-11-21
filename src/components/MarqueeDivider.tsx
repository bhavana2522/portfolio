const MARQUEE_ITEMS = [
  { label: 'Selected Works', color: '#F2B705' },
  { label: 'Full-Stack Development', color: '#3B82F6' },
  { label: 'Python & Java', color: '#10B981' },
  { label: 'React.js & Node.js', color: '#06B6D4' },
  { label: 'AI-Assisted Applications', color: '#8B5CF6' },
  { label: 'SQL & MongoDB', color: '#F59E0B' },
  { label: 'Power BI & Tableau', color: '#F43F5E' },
];

export function MarqueeDivider() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      aria-hidden="true"
      className="border-b border-zinc-200 dark:border-zinc-800/80 bg-gradient-to-r from-blue-500/5 via-emerald-500/5 to-amber-500/5 dark:from-blue-500/10 dark:via-emerald-500/10 dark:to-amber-500/10 py-3.5 overflow-hidden select-none"
    >
      <div className="animate-marquee items-center gap-6">
        {repeated.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center gap-6 shrink-0">
            <span
              className="text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap"
              style={{ color: item.color }}
            >
              {item.label}
            </span>
            <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
