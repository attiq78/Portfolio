import React from 'react';
import Head from 'next/head';
import { useI18n, useRestoreScrollAfterLocaleSwitch } from '../i18n/useI18n';
import { locales, defaultLocale } from '../i18n/translations';
import { site } from '../portfolio/config';
import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import Services, { TechMarquee } from '../components/portfolio/Services';
import Work from '../components/portfolio/Work';
import { Process, WhyMe } from '../components/portfolio/Process';
import { Faq, Pricing } from '../components/portfolio/Pricing';
import { Contact, Footer } from '../components/portfolio/Contact';

const ogLocale = { en: 'en_GB', it: 'it_IT', nl: 'nl_NL', fr: 'fr_FR', de: 'de_DE' } as const;

export default function Portfolio() {
  const { t, locale } = useI18n();
  useRestoreScrollAfterLocaleSwitch();
  const url = (l: string) => `${site.url}${l === defaultLocale ? '' : `/${l}`}`;

  // Structured data so Google understands who you are, what you offer and where (Florence).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${site.brand} — ${site.fullName}`,
    description: t.meta.description,
    url: url(locale),
    email: site.email,
    founder: { '@type': 'Person', name: site.fullName, jobTitle: site.jobTitle, sameAs: [site.linkedin, site.github] },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: ['Florence', 'Italy', 'Europe'],
    knowsLanguage: ['en', 'it'],
    serviceType: Object.values(t.services.items).map((s) => s.title),
  };

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#06060a" />
        <link rel="canonical" href={url(locale)} />
        {locales.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={url(l)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={url(defaultLocale)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:url" content={url(locale)} />
        <meta property="og:locale" content={ogLocale[locale]} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="geo.region" content={`${site.country}-FI`} />
        <meta name="geo.placename" content={site.city} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <Services />
          <Work />
          <Process />
          <WhyMe />
          <Pricing />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
