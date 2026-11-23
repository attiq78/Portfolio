import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bot, CalendarCheck, ShoppingCart, Star } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { projects, type Project } from '../../portfolio/config';
import { Container, Reveal, SectionHeading } from './ui';

const accents: Record<Project['accent'], { bg: string; glow: string; chip: string }> = {
  violet: { bg: 'from-violet-600/40 via-fuchsia-600/20 to-transparent', glow: 'bg-violet-500/40', chip: 'bg-violet-500' },
  cyan: { bg: 'from-cyan-500/35 via-sky-600/20 to-transparent', glow: 'bg-cyan-400/40', chip: 'bg-cyan-500' },
  amber: { bg: 'from-amber-500/35 via-orange-600/20 to-transparent', glow: 'bg-amber-400/40', chip: 'bg-amber-500' },
  rose: { bg: 'from-rose-500/35 via-pink-600/20 to-transparent', glow: 'bg-rose-400/40', chip: 'bg-rose-500' },
};

/** Lightweight illustrated preview so the section looks great without screenshots. */
function Preview({ p }: { p: Project }) {
  const a = accents[p.accent];
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br ${a.bg} bg-[#0d0d15]`}>
      <div className={`absolute -right-10 -top-10 h-48 w-48 rounded-full ${a.glow} blur-3xl`} />
      <div className="bg-grid absolute inset-0 opacity-60" />

      {p.id === 'flock' && (
        <div className="absolute inset-x-6 top-6 bottom-0 rounded-t-xl border border-white/10 bg-[#0b0b12]/90 p-4 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
          <div className="mb-4 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
            <span className="h-2 w-2 rounded-full bg-green-400/80" />
            <span className="ml-3 h-3 w-32 rounded-full bg-white/10" />
            <ShoppingCart className="ml-auto h-4 w-4 text-white/50" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-2">
                <div className={`mb-2 aspect-square rounded-md bg-gradient-to-br ${i === 1 ? 'from-cyan-400/50 to-violet-500/40' : 'from-violet-500/50 to-pink-500/40'}`} />
                <div className="h-1.5 w-3/4 rounded bg-white/25" />
                <div className="mt-1.5 flex items-center justify-between">
                  <div className="h-1.5 w-1/3 rounded bg-white/15" />
                  <Star className="h-2.5 w-2.5 fill-yellow-300 text-yellow-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {p.id === 'assistant' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-xs space-y-2.5 transition-transform duration-700 group-hover:-translate-y-2">
            <div className="ml-auto w-2/3 rounded-2xl rounded-br-md bg-cyan-500/80 px-3 py-2">
              <div className="h-1.5 w-full rounded bg-white/70" />
            </div>
            <div className="flex items-end gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500">
                <Bot className="h-3.5 w-3.5 text-white" />
              </span>
              <div className="w-4/5 space-y-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.07] px-3 py-2.5">
                <div className="h-1.5 w-full rounded bg-white/40" />
                <div className="h-1.5 w-4/5 rounded bg-white/30" />
                <div className="h-1.5 w-2/5 rounded bg-white/20" />
              </div>
            </div>
            <div className="ml-auto w-1/2 rounded-2xl rounded-br-md bg-cyan-500/80 px-3 py-2">
              <div className="h-1.5 w-full rounded bg-white/70" />
            </div>
          </div>
        </div>
      )}

      {p.id === 'booking' && (
        <div className="absolute inset-0 flex items-end justify-center gap-4">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`w-[30%] rounded-t-[1.4rem] border border-b-0 border-white/15 bg-[#0b0b12] p-2.5 pb-0 shadow-2xl transition-transform duration-700 ${
                i === 0 ? 'h-[80%] group-hover:-translate-y-2' : 'h-[68%] group-hover:-translate-y-4'
              }`}
            >
              <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/20" />
              <div className="mb-2 aspect-[4/3] rounded-lg bg-gradient-to-br from-amber-400/60 to-rose-500/50" />
              <div className="space-y-1.5">
                <div className="h-1.5 w-3/4 rounded bg-white/30" />
                <div className="h-1.5 w-1/2 rounded bg-white/15" />
              </div>
              <div className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-amber-500/90 py-1.5">
                <CalendarCheck className="h-3 w-3 text-white" />
                <div className="h-1 w-8 rounded bg-white/80" />
              </div>
            </div>
          ))}
        </div>
      )}

      {p.id === 'brand' && (
        <div className="absolute inset-0 grid grid-cols-[1.2fr_1fr] gap-3 p-6 transition-transform duration-700 group-hover:scale-[1.03]">
          <div className="grid place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-rose-500 to-fuchsia-600">
            <span className="font-display text-4xl font-bold italic text-white">Aa</span>
          </div>
          <div className="grid grid-rows-3 gap-3">
            <div className="grid grid-cols-4 gap-1.5 rounded-xl border border-white/10 bg-white/[0.05] p-2">
              {['bg-rose-500', 'bg-fuchsia-500', 'bg-orange-300', 'bg-white'].map((c) => (
                <span key={c} className={`rounded-md ${c}`} />
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3">
              <span className="h-5 w-12 rounded-full bg-rose-500" />
              <span className="h-5 w-12 rounded-full border border-white/30" />
            </div>
            <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/[0.05] p-3">
              <div className="h-1.5 w-full rounded bg-white/30" />
              <div className="h-1.5 w-2/3 rounded bg-white/15" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const { t } = useI18n();

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.work.eyebrow} title={t.work.title} subtitle={t.work.subtitle} />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => {
            const text = t.work.projects[p.id];
            const isLive = p.status === 'live';
            const isInternal = p.href.startsWith('/');
            const body = (
              <>
                <Preview p={p} />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted">{text.category}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isLive ? 'bg-lime-300/15 text-lime-200' : 'bg-white/[0.07] text-white/60'
                      }`}
                    >
                      {isLive ? t.work.live : t.work.concept}
                    </span>
                  </div>
                  <h3 className="mt-3 flex items-start justify-between gap-4 font-display text-2xl font-semibold text-white">
                    {text.title}
                    {p.href && (
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{text.desc}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {p.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            );
            const cls =
              'group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-2 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]';

            return (
              <Reveal key={p.id} delay={(i % 2) * 100}>
                {p.href ? (
                  isInternal ? (
                    <Link href={p.href} className={cls} aria-label={`${t.work.view}: ${text.title}`}>
                      {body}
                    </Link>
                  ) : (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${t.work.view}: ${text.title}`}>
                      {body}
                    </a>
                  )
                ) : (
                  <article className={cls}>{body}</article>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
