import React, { useEffect, useState } from 'react';
import { ArrowRight, Bot, MoreHorizontal, Send, Sparkles } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { Container } from './ui';

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words]);
  return (
    <span className="relative inline-block">
      <span key={`${words[i]}-${i}`} className="animate-word text-gradient inline-block pb-1">
        {words[i]}
      </span>
    </span>
  );
}

function ChatDemo() {
  const { t, locale } = useI18n();
  const msgs = t.chatDemo.messages;
  // shown = number of visible messages; typing = bot is "typing"
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(setTimeout(res, ms));
      });

    async function run() {
      while (!cancelled) {
        setShown(0);
        setTyping(false);
        await wait(700);
        for (let k = 0; k < msgs.length && !cancelled; k++) {
          if (msgs[k].from === 'bot') {
            setTyping(true);
            await wait(1300);
            if (cancelled) return;
            setTyping(false);
          }
          setShown(k + 1);
          await wait(msgs[k].from === 'bot' ? 1600 : 900);
        }
        await wait(3500);
      }
    }
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [locale, msgs]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-violet-600/30 via-fuchsia-500/10 to-cyan-400/30 blur-3xl" />
      <div className="gradient-border overflow-hidden rounded-[1.75rem] bg-[#0c0c14]/90 shadow-2xl shadow-black/60 backdrop-blur-xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400">
              <Bot className="h-5 w-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0c0c14] bg-lime-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{t.chatDemo.name}</p>
              <p className="text-xs text-lime-300/90">{t.chatDemo.status}</p>
            </div>
          </div>
          <MoreHorizontal className="h-5 w-5 text-white/40" />
        </div>

        {/* messages */}
        <div className="flex h-[320px] flex-col justify-end gap-3 px-4 py-5 sm:h-[340px]">
          {msgs.slice(0, shown).map((m, idx) => (
            <div
              key={`${locale}-${idx}`}
              className={`animate-msg max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.from === 'user'
                  ? 'self-end rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 text-white'
                  : 'self-start rounded-bl-md border border-white/[0.07] bg-white/[0.05] text-white/90'
              }`}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="animate-msg flex items-center gap-1.5 self-start rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.05] px-4 py-3.5">
              {[0, 1, 2].map((d) => (
                <span key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </div>
          )}
        </div>

        {/* input */}
        <div className="border-t border-white/[0.07] p-3">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-4 pr-1.5">
            <span className="flex-1 truncate text-sm text-white/35">{t.chatDemo.input}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black">
              <Send className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* floating chip */}
      <div className="animate-float absolute -left-4 -top-5 hidden items-center gap-2 rounded-full border border-white/10 bg-[#0e0e16]/90 px-3.5 py-2 text-xs font-medium text-white/85 shadow-xl backdrop-blur sm:flex">
        <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
        {t.chatDemo.caption}
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="noise relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
      {/* Background */}
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="animate-blob pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-violet-600/25 blur-[120px]" />
      <div
        className="animate-blob pointer-events-none absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 text-sm text-white/80 backdrop-blur transition-colors hover:border-lime-300/30"
          >
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="animate-ping-soft absolute h-full w-full rounded-full bg-lime-400" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-lime-400" />
            </span>
            {t.hero.badge}
            <ArrowRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.6rem]">
            {t.hero.titleA} <RotatingWord words={t.hero.titleRotate} />
            <br />
            <span className="text-white/90">{t.hero.titleB}</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t.hero.subtitle}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 bg-[length:200%_auto] px-8 font-semibold text-white shadow-xl shadow-violet-600/30 transition-all duration-500 hover:bg-right hover:shadow-violet-500/50"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-8 font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/[0.07]"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4">
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold text-white">{s.value}</dt>
                <dd className="mt-1 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ChatDemo />
      </Container>
    </section>
  );
}
