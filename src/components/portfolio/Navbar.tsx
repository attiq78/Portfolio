import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Globe, Menu, X } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { localeLabels, locales, type Locale } from '../../i18n/translations';
import { site } from '../../portfolio/config';
import { Container } from './ui';

export function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label={site.brand}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 font-display text-lg font-bold text-white shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:rotate-6">
        {site.name.charAt(0)}
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">{site.brand}</span>
    </a>
  );
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const choose = (l: Locale) => {
    setOpen(false);
    if (l !== locale) setLocale(l);
  };

  if (compact) {
    // Segmented control for the mobile menu
    return (
      <div role="group" aria-label={t.nav.language} className="grid grid-cols-5 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => choose(l)}
            aria-pressed={l === locale}
            className={`rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              l === locale ? 'bg-white text-black' : 'text-white/70 hover:bg-white/10'
            }`}
          >
            {localeLabels[l].short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.language}
        className="flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-white/85 transition-colors hover:border-white/20 hover:bg-white/[0.08]"
      >
        <Globe className="h-4 w-4" />
        {localeLabels[locale].short}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="animate-msg absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e16]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={l === locale}
                onClick={() => choose(l)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  l === locale ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 text-xs font-bold tracking-wide text-violet-300">{localeLabels[l].short}</span>
                  {localeLabels[l].name}
                </span>
                {l === locale && <Check className="h-4 w-4 text-cyan-300" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const { t, locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Close the mobile menu after switching language
  useEffect(() => setOpen(false), [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#work', label: t.nav.work },
    { href: '#process', label: t.nav.process },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <Container className="!px-0">
        <nav
          className={`flex items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-4 ${
            scrolled || open
              ? 'border-white/10 bg-[#0a0a12]/75 shadow-2xl shadow-black/30 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <a
              href="#contact"
              className="group hidden h-10 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-semibold text-black transition-all hover:bg-violet-100 sm:inline-flex"
            >
              {t.nav.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="animate-msg mt-2 rounded-2xl border border-white/10 bg-[#0a0a12]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
            <ul className="flex flex-col">
              {[...links, { href: '#contact', label: t.nav.contact }].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-xl font-medium text-white/90 hover:bg-white/[0.05]"
                  >
                    {l.label}
                    <ArrowUpRight className="h-5 w-5 text-white/40" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="mb-2 px-1 text-xs font-medium uppercase tracking-widest text-white/40">{t.nav.language}</p>
              <LanguageSwitcher compact />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
