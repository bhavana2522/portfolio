import { motion, useReducedMotion } from 'motion/react';
import { ShoppingBag, GraduationCap, LayoutTemplate, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectVisualProps {
  project: ProjectItem;
  compact?: boolean;
}

export function ProjectVisual({ project, compact = false }: ProjectVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  if (project.previewTheme === 'commerce') {
    return (
      <div
        className={`w-full rounded-xl border border-blue-500/25 dark:border-blue-500/30 bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/50 dark:from-[#09101D] dark:via-[#0A0A0D] dark:to-[#091318] overflow-hidden flex flex-col justify-between ${
          compact ? 'p-4' : 'p-5 sm:p-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-blue-500/15 dark:border-blue-500/20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#3B82F6]" aria-hidden="true" />
            <span className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              SolivaGuard Commerce &amp; Admin
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#3B82F6]">MERN · Razorpay</span>
        </div>

        {/* Animated data-flow schematic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 relative">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.15 }}
            className="rounded-lg border border-blue-500/20 bg-white/90 dark:bg-zinc-900/80 p-3.5 space-y-2.5"
          >
            <p className="text-[11px] font-mono text-[#3B82F6]">Customer Storefront</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-800 dark:text-zinc-200">
                <span>Product Catalog</span>
                <span className="font-mono text-zinc-500">React.js</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-800 dark:text-zinc-200">
                <span>Cart &amp; Checkout</span>
                <span className="font-mono text-zinc-500">Razorpay</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-800 dark:text-zinc-200">
                <span>User Accounts</span>
                <span className="font-mono text-zinc-500">Auth</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.15 }}
            className="rounded-lg border border-cyan-500/20 bg-white/90 dark:bg-zinc-900/80 p-3.5 space-y-2.5"
          >
            <p className="text-[11px] font-mono text-[#06B6D4]">Admin Operations</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-800 dark:text-zinc-200">
                <span>Order Pipeline</span>
                <span className="font-mono text-zinc-500">Express API</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-800 dark:text-zinc-200">
                <span>Inventory CRUD</span>
                <span className="font-mono text-zinc-500">MongoDB</span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-800 dark:text-zinc-200">
                <span>Payment Sync</span>
                <span className="font-mono text-[#10B981]">Verified</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated transfer track */}
        <div className="py-1">
          <div className="h-1 w-full rounded-full bg-blue-500/15 overflow-hidden">
            <motion.div
              animate={shouldReduceMotion ? undefined : { x: ['-100%', '200%'] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
            />
          </div>
        </div>

        <div className="pt-2.5 border-t border-blue-500/15 dark:border-blue-500/20 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
          <span>Unified storefront &amp; centralized dashboard</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#3B82F6]" aria-hidden="true" />
        </div>
      </div>
    );
  }

  if (project.previewTheme === 'edtech') {
    return (
      <div
        className={`w-full rounded-xl border border-emerald-500/25 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 dark:from-[#071510] dark:via-[#0A0A0D] dark:to-[#071514] overflow-hidden flex flex-col justify-between ${
          compact ? 'p-4' : 'p-5 sm:p-6'
        }`}
      >
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-emerald-500/15 dark:border-emerald-500/20">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#10B981]" aria-hidden="true" />
            <span className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              EDVIKO Learning Workspace
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#10B981]">AI · EdTech</span>
        </div>

        <div className="my-4 space-y-2.5">
          {project.architectureModules.map((mod, idx) => (
            <motion.div
              key={mod.layer}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.07 }}
              whileHover={shouldReduceMotion ? undefined : { x: 4 }}
              className="rounded-lg border border-emerald-500/20 bg-white/90 dark:bg-zinc-900/80 px-4 py-3 flex items-start justify-between gap-3"
            >
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {mod.layer}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{mod.detail}</p>
              </div>
              <span className="font-mono text-[11px] tabular-nums text-[#10B981] shrink-0">
                0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="pt-3 border-t border-emerald-500/15 dark:border-emerald-500/20 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
          <span>Interactive AI-assisted educational workflows</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-xl border border-rose-500/25 dark:border-rose-500/30 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/50 dark:from-[#17090E] dark:via-[#0A0A0D] dark:to-[#141008] overflow-hidden flex flex-col justify-between ${
        compact ? 'p-4' : 'p-5 sm:p-6'
      }`}
    >
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-rose-500/15 dark:border-rose-500/20">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-[#F43F5E]" aria-hidden="true" />
          <span className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Responsive Profile Architecture
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#F43F5E]">HTML · CSS · JS</span>
      </div>

      <div className="my-4 grid grid-cols-3 gap-2.5">
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          className="col-span-2 rounded-lg border border-rose-500/20 bg-white/90 dark:bg-zinc-900/80 p-3.5 space-y-2"
        >
          <p className="text-[11px] font-mono text-[#F43F5E]">Desktop Grid</p>
          <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            Qualifications, Competencies &amp; Project Archive
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Structured semantic hierarchy for rapid scanning.
          </p>
        </motion.div>
        <motion.div
          whileHover={shouldReduceMotion ? undefined : { y: -2 }}
          className="rounded-lg border border-amber-500/20 bg-white/90 dark:bg-zinc-900/80 p-3.5 space-y-2"
        >
          <p className="text-[11px] font-mono text-[#F59E0B]">Mobile</p>
          <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Fluid Breakpoints</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Zero overflow</p>
        </motion.div>
      </div>

      <div className="pt-3 border-t border-rose-500/15 dark:border-rose-500/20 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
        <span>Centralized digital academic &amp; developer profile</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#F43F5E]" aria-hidden="true" />
      </div>
    </div>
  );
}
