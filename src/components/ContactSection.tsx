import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Copy, Check, Mail, Phone, MapPin, FileText, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export function ContactSection({ onOpenResume }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [avatarError, setAvatarError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setErrorText('Please complete your name, email address, and message before sending.');
      return;
    }
    setErrorText('');
    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName.trim()}`);
    const body = encodeURIComponent(
      `Name: ${senderName.trim()}\nEmail: ${senderEmail.trim()}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-ambient absolute bottom-0 right-0 w-96 h-96 rounded-full bg-rose-500/8 dark:bg-rose-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Direct Contact Details + Portrait Badge */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl p-[1.5px] bg-gradient-to-br from-[#3B82F6] via-[#10B981] to-[#F59E0B] shrink-0">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-white">
                  {!avatarError ? (
                    <img
                      src={PROFILE.photoUrl}
                      alt="Bhavana N Masare"
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white font-display font-bold text-lg">
                      BM
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-[#F43F5E]">Contact &amp; Availability</p>
                <p className="font-display text-lg font-bold text-zinc-950 dark:text-zinc-50">
                  {PROFILE.name}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s connect on software, Python, AI, or database roles.
              </h2>
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-lg">
                Currently pursuing an M.Tech in Computer Science and open to entry-level software
                development and IT opportunities across India.
              </p>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
              <div className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Email</p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm font-medium text-zinc-950 dark:text-zinc-100 hover:underline truncate block"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="py-4 flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Phone</p>
                  <a
                    href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                    className="text-sm font-medium tabular-nums text-zinc-950 dark:text-zinc-100 hover:underline"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
              </div>

              <div className="py-4 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Location</p>
                  <p className="text-sm font-medium text-zinc-950 dark:text-zinc-100">
                    {PROFILE.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white text-xs font-semibold hover:brightness-110 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>View Resume PDF</span>
              </button>
              <a
                href={PROFILE.resumeUrl}
                download="Bhavana_N_Masare_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Download PDF</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Direct Email Composer Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0D0D10] p-6 sm:p-8"
          >
            <h3 className="font-display text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Send a Direct Message
            </h3>
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              Compose an inquiry that opens directly in your email client addressed to{' '}
              <span className="font-mono text-xs text-zinc-800 dark:text-zinc-200">
                {PROFILE.email}
              </span>
              .
            </p>

            <form onSubmit={handleComposeSubmit} noValidate className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Recruiter or colleague name"
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-[#050505] px-3.5 py-2.5 text-sm text-zinc-950 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-[#050505] px-3.5 py-2.5 text-sm text-zinc-950 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, project questions, or interview scheduling..."
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-[#050505] px-3.5 py-2.5 text-sm text-zinc-950 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#3B82F6] resize-none"
                />
              </div>

              {errorText && (
                <p role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
                  {errorText}
                </p>
              )}

              {submitted && !errorText && (
                <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Email draft prepared for {PROFILE.email}. You can also copy the email address
                  directly on the left.
                </p>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#F2B705] text-zinc-950 text-sm font-semibold hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Open Email Draft</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
