import React, { useState } from 'react';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { planPrices, site } from '../../portfolio/config';
import { Container, Reveal, SectionHeading } from './ui';

const intlLocale: Record<string, string> = { en: 'en-IE', it: 'it-IT', nl: 'nl-NL', fr: 'fr-FR', de: 'de-DE' };

export function Pricing() {
  const { t, locale } = useI18n();
  const fmt = new Intl.NumberFormat(intlLocale[locale], {
    style: 'currency',
    currency: site.currency,
    maximumFractionDigits: 0,
  });

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.title} subtitle={t.pricing.subtitle} />

        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {t.pricing.plans.map((plan, i) => {
            const featured = i === 1;
            const price = planPrices[i];
            return (
              <Reveal key={plan.name} delay={i * 90}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 ${
                    featured
                      ? 'gradient-border bg-gradient-to-b from-violet-600/20 via-[#0e0e18] to-[#0e0e18] shadow-2xl shadow-violet-900/30'
                      : 'border border-white/[0.08] bg-white/[0.025]'
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      {t.pricing.popular}
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-semibold text-white">{plan.name}</h3>
                  <p className="mt-2 min-h-[3rem] text-muted">{plan.desc}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    {price != null ? (
                      <>
                        <span className="text-sm text-muted">{t.pricing.from}</span>
                        <span className="font-display text-5xl font-semibold tracking-tight text-white">{fmt.format(price)}</span>
                      </>
                    ) : (
                      <span className="font-display text-3xl font-semibold leading-[3rem] tracking-tight text-white">{t.pricing.custom}</span>
                    )}
                  </div>

                  <ul className="mt-8 space-y-3.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-white/80">
                        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${featured ? 'bg-gradient-to-br from-violet-500 to-cyan-400' : 'bg-white/10'}`}>
                          <Check className="h-3 w-3 text-white" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`group mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-full font-semibold transition-colors ${
                      featured ? 'bg-white text-black hover:bg-violet-100' : 'border border-white/15 text-white hover:bg-white/[0.07]'
                    }`}
                  >
                    {t.pricing.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-white/45">{t.pricing.note}</p>
      </Container>
    </section>
  );
}

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} center={false} />
        </div>
        <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium text-white transition-colors hover:text-violet-200"
                  >
                    {item.q}
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen ? 'rotate-180 border-violet-400/60 bg-violet-500/20' : 'border-white/15'
                      }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
