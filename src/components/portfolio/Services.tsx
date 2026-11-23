import React from 'react';
import { Bot, Check, Code2, Palette, ShoppingBag, Smartphone, Workflow, type LucideIcon } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { techStack } from '../../portfolio/config';
import { Container, Reveal, SectionHeading, SpotlightCard } from './ui';

type ServiceKey = 'chatbots' | 'web' | 'mobile' | 'design' | 'automation' | 'ecommerce';

const meta: Record<ServiceKey, { icon: LucideIcon; tint: string }> = {
  chatbots: { icon: Bot, tint: 'from-violet-500 to-cyan-400' },
  web: { icon: Code2, tint: 'from-sky-500 to-indigo-500' },
  mobile: { icon: Smartphone, tint: 'from-emerald-400 to-teal-500' },
  design: { icon: Palette, tint: 'from-pink-500 to-orange-400' },
  automation: { icon: Workflow, tint: 'from-amber-400 to-rose-500' },
  ecommerce: { icon: ShoppingBag, tint: 'from-fuchsia-500 to-violet-500' },
};

function IconBadge({ k, large = false }: { k: ServiceKey; large?: boolean }) {
  const Icon = meta[k].icon;
  return (
    <span
      className={`grid place-items-center rounded-2xl bg-gradient-to-br ${meta[k].tint} shadow-lg shadow-black/30 ${
        large ? 'h-14 w-14' : 'h-12 w-12'
      }`}
    >
      <Icon className={large ? 'h-7 w-7 text-white' : 'h-6 w-6 text-white'} />
    </span>
  );
}

export function TechMarquee() {
  const { t } = useI18n();
  const items = [...techStack, ...techStack];
  return (
    <section aria-label={t.marquee.label} className="border-y border-white/[0.06] bg-white/[0.015] py-8">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.25em] text-white/40">{t.marquee.label}</p>
      <div className="marquee-mask overflow-hidden">
        <ul className="animate-marquee flex w-max gap-3">
          {items.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= techStack.length}
              className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-sm font-medium text-white/70"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Services() {
  const { t } = useI18n();
  const s = t.services.items;
  const small: ServiceKey[] = ['web', 'mobile', 'design', 'automation', 'ecommerce'];

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured: AI chatbots */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <SpotlightCard className="relative h-full overflow-hidden p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 right-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <IconBadge k="chatbots" large />
                  <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-3 py-1 text-xs font-semibold text-lime-200">
                    {t.services.popular}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {s.chatbots.title}
                </h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{s.chatbots.desc}</p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {s.chatbots.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-white/85">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                {/* Decorative "conversations" activity chart */}
                <div aria-hidden className="mt-auto hidden items-end gap-1.5 pt-10 lg:flex" style={{ height: '9rem' }}>
                  {[38, 52, 44, 66, 58, 74, 62, 81, 70, 88, 79, 95, 84, 100].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600/30 to-cyan-300/70 transition-all duration-700 group-hover:opacity-100"
                      style={{ height: `${h}%`, opacity: 0.35 + (i / 14) * 0.65 }}
                    />
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-6 lg:mt-0">
                  {['Website', 'WhatsApp', 'Instagram', 'Messenger', 'Telegram'].map((c) => (
                    <span key={c} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/60">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {small.map((k, i) => (
            <Reveal key={k} delay={(i + 1) * 70}>
              <SpotlightCard className="group h-full p-7">
                <IconBadge k={k} />
                <h3 className="mt-6 font-display text-xl font-semibold text-white">{s[k].title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s[k].desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s[k].points.map((p) => (
                    <li key={p} className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-white/65">
                      {p}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
