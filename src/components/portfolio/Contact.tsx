import React, { useState } from 'react';
import { ArrowUp, CalendarDays, CheckCircle2, ChevronDown, Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { site } from '../../portfolio/config';
import { Container, Reveal, SectionHeading } from './ui';
import { Logo } from './Navbar';

const field =
  'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/70 focus:bg-white/[0.05] focus:ring-4 focus:ring-violet-500/15';

export function Contact() {
  const { t, locale } = useI18n();
  const c = t.contact;
  const services = [
    t.services.items.chatbots.title,
    t.services.items.web.title,
    t.services.items.mobile.title,
    t.services.items.design.title,
    t.services.items.automation.title,
    t.services.items.ecommerce.title,
    c.other,
  ];

  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '', botcheck: false });
  // 'sent' = delivered by /api/contact; 'failed' = could not be sent (visitor sees your email instead).
  const [status, setStatus] = useState<'idle' | 'error' | 'sending' | 'sent' | 'failed'>('idle');

  type TextField = 'name' | 'email' | 'service' | 'budget' | 'message';
  const update = (k: TextField) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.error || `HTTP ${res.status}`);
      setForm({ name: '', email: '', service: '', budget: '', message: '', botcheck: false });
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const whatsappHref = `https://wa.me/${site.whatsapp}`;
  // Opens a new Gmail message in the browser with your address already in "To".
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`;

  // Not every visitor uses Gmail, so the address is also copied for pasting into another mail app.
  const [emailCopied, setEmailCopied] = useState(false);
  const showCopied = () => {
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 4000);
  };
  const onEmailClick = () => {
    // Synchronous copy first: works inside the click even where the Clipboard API is blocked.
    const ta = document.createElement('textarea');
    ta.value = site.email;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    }
    document.body.removeChild(ta);
    if (copied) {
      showCopied();
      return;
    }
    navigator.clipboard?.writeText(site.email).then(showCopied, () => {});
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-700/25 via-fuchsia-600/10 to-cyan-500/20 blur-[130px]" />
      <Container className="relative">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <form
              onSubmit={onSubmit}
              noValidate
              className="gradient-border h-full rounded-[2rem] bg-[#0c0c14]/80 p-6 backdrop-blur-xl sm:p-9"
            >
              {/* Honeypot: a hidden checkbox. Browser autofill never ticks it; bots often do, and /api/contact ignores those. */}
              <input
                type="checkbox"
                name="botcheck"
                checked={form.botcheck}
                onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked }))}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/70">{c.name} *</span>
                  <input className={field} value={form.name} onChange={update('name')} autoComplete="name" required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/70">{c.email} *</span>
                  <input className={field} type="email" value={form.email} onChange={update('email')} autoComplete="email" required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/70">{c.service}</span>
                  <span className="relative block">
                    <select className={`${field} appearance-none pr-10`} value={form.service} onChange={update('service')}>
                      <option value="" className="bg-[#0c0c14]">{c.select}</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-[#0c0c14]">
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/70">{c.budget}</span>
                  <span className="relative block">
                    <select className={`${field} appearance-none pr-10`} value={form.budget} onChange={update('budget')}>
                      <option value="" className="bg-[#0c0c14]">{c.select}</option>
                      {c.budgets.map((b) => (
                        <option key={b} value={b} className="bg-[#0c0c14]">
                          {b}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </span>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-white/70">{c.message} *</span>
                  <textarea
                    className={`${field} min-h-[150px] resize-y`}
                    value={form.message}
                    onChange={update('message')}
                    placeholder={c.messagePlaceholder}
                    required
                  />
                </label>
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-4 text-sm text-rose-300">
                  {c.required}
                </p>
              )}
              {status === 'sent' && (
                <p role="status" className="mt-4 flex items-start gap-2 text-sm text-lime-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  {c.sent}
                </p>
              )}
              {status === 'failed' && (
                <p role="alert" className="mt-4 text-sm text-rose-300">
                  {c.sendError}{' '}
                  <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                    {site.email}
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_auto] font-semibold text-white shadow-xl shadow-violet-600/30 transition-all duration-500 hover:bg-right disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-10"
              >
                {status === 'sending' ? c.sending : c.send}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-4">
            <p className="px-1 text-sm uppercase tracking-[0.18em] text-white/40">{c.or}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/[0.06]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500">
                <MessageCircle className="h-6 w-6 text-white" />
              </span>
              <span>
                <span className="block font-semibold text-white">{c.whatsapp}</span>
                <span className="text-sm text-muted">+{site.whatsapp}</span>
              </span>
            </a>
            <a
              href={gmailHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onEmailClick}
              className="group flex items-center gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-violet-400/40 hover:bg-violet-400/[0.06]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500">
                <Mail className="h-6 w-6 text-white" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-white">{c.emailMe}</span>
                <span className="block truncate text-sm text-muted">{site.email}</span>
              </span>
            </a>
            {emailCopied && (
              <p role="status" className="-mt-2 flex items-start gap-2 px-1 text-sm text-lime-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                {c.emailCopied}
              </p>
            )}
            {site.booking && (
              <a
                href={site.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500">
                  <CalendarDays className="h-6 w-6 text-white" />
                </span>
                <span className="block font-semibold text-white">{c.booking}</span>
              </a>
            )}
            <div className="mt-auto flex gap-3 pt-2">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 text-white/70 transition-colors hover:bg-white hover:text-black">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 text-white/70 transition-colors hover:bg-white hover:text-black">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#work', label: t.nav.work },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] pt-16">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 leading-relaxed text-muted">{t.footer.tagline}</p>
            <p className="mt-3 text-sm text-white/40">{t.footer.location}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-white/60 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Giant brand wordmark */}
        <p
          aria-hidden
          className="pointer-events-none mt-12 select-none bg-gradient-to-b from-white/[0.14] to-white/[0.01] bg-clip-text pb-4 text-center font-display text-[18vw] font-bold leading-none tracking-tighter text-transparent lg:text-[13rem]"
        >
          {site.name}
        </p>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-8 text-sm text-white/40 sm:flex-row">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            {t.footer.backToTop}
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
