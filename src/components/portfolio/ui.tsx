import React, { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/** Fades + slides children in when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return React.createElement(
    Tag,
    {
      ref,
      className: `reveal ${className}`,
      style: { '--delay': `${delay}ms` } as CSSProperties,
    },
    children
  );
}

/** Card with a light that follows the cursor. */
export function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className={`spotlight rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.16] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-14 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium uppercase tracking-[0.18em] text-violet-200">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </Reveal>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
