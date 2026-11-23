import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { defaultLocale, dictionaries, isLocale, type Locale } from './translations';

const SCROLL_KEY = 'locale-switch-scroll';

/**
 * Locale comes from Next.js built-in i18n routing (/, /it, /nl, /fr, /de),
 * so every language has its own SEO-friendly URL.
 */
export function useI18n() {
  const router = useRouter();
  const locale: Locale = isLocale(router.locale) ? router.locale : defaultLocale;

  const setLocale = useCallback(
    (next: Locale) => {
      const y = window.scrollY;
      // Remember the choice so Next's auto-detection respects it next visit
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`;
      // Keep the reading position even if the page fully reloads (e.g. dev server)
      try {
        sessionStorage.setItem(SCROLL_KEY, String(y));
      } catch {}
      // Drop any "#section" from the URL, otherwise the browser jumps to that section
      const path = router.asPath.split('#')[0];
      if (window.location.hash) history.replaceState(history.state, '', window.location.pathname + window.location.search);

      router
        .push({ pathname: router.pathname, query: router.query }, path, { locale: next, scroll: false })
        .then(() => {
          window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
          try {
            sessionStorage.removeItem(SCROLL_KEY);
          } catch {}
        });
    },
    [router]
  );

  return { locale, t: dictionaries[locale], setLocale };
}

/** Call once on the page: restores the position after a language switch that caused a full reload. */
export function useRestoreScrollAfterLocaleSwitch() {
  useEffect(() => {
    let y: string | null = null;
    try {
      y = sessionStorage.getItem(SCROLL_KEY);
      sessionStorage.removeItem(SCROLL_KEY);
    } catch {}
    if (y !== null) window.scrollTo({ top: Number(y), behavior: 'instant' as ScrollBehavior });
  }, []);
}
