import React from 'react';
import { Clock3, Euro, ShieldCheck, Target } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { Container, Reveal, SectionHeading, SpotlightCard } from './ui';

export function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/10 blur-[120px]" />
      <Container className="relative">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} subtitle={t.process.subtitle} />

        <div className="relative">
        {/* connecting line */}
        <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative">
              <SpotlightCard className="h-full p-7">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#0d0d15] font-display text-lg font-semibold">
                  <span className="text-gradient">0{i + 1}</span>
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ol>
        </div>
      </Container>
    </section>
  );
}

const whyIcons = [Target, Euro, Clock3, ShieldCheck];

export function WhyMe() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 sm:py-28">
      <Container>
        <div className="gradient-border relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">{t.why.eyebrow}</span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                {t.why.title}
              </h2>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              {t.why.items.map((item, i) => {
                const Icon = whyIcons[i % whyIcons.length];
                return (
                  <Reveal key={item.title} delay={i * 80}>
                    <Icon className="h-6 w-6 text-violet-300" />
                    <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
