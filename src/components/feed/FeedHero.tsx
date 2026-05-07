'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { animate } from 'animejs';

const WORDS_LINE_1 = ['Your', 'feed.'];
const WORDS_LINE_2 = ['Engineered', 'for'];
const WORDS_LINE_3 = ['your', 'mind.'];

const META_TICKERS = [
  { label: 'Posts curated this week', target: 1247 },
  { label: 'Voices in rotation', target: 312 },
  { label: 'Avg. read time', target: 4, suffix: 'm' },
  { label: 'Signal-to-noise ratio', target: 98, suffix: '%' },
];

export function FeedHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-h-word]', { yPercent: 110, opacity: 0 });
      gsap.set('[data-h-fade]', { opacity: 0, y: 24 });
      gsap.set('[data-h-line]', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('[data-h-meta]', { opacity: 0 });
      gsap.set('[data-h-ticker-row]', { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to('[data-h-meta]', { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.15)
        .to('[data-h-line]', { scaleX: 1, duration: 1.1 }, 0.2)
        .to('[data-h-word]', { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.06 }, 0.3)
        .to('[data-h-fade]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.85)
        .to('[data-h-ticker-row]', { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 }, 1.1);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // anime.js: counter ticking up
  useEffect(() => {
    const obj = META_TICKERS.map(() => ({ v: 0 }));
    const anims = META_TICKERS.map((t, i) => {
      const el = counterRefs.current[i];
      if (!el) return null;
      return animate(obj[i], {
        v: t.target,
        duration: 1800,
        delay: 1100 + i * 120,
        ease: 'outExpo',
        onUpdate: () => {
          el.textContent = String(Math.round(obj[i].v));
        },
      });
    });
    return () => {
      anims.forEach((a) => a && a.pause());
    };
  }, []);

  // anime.js: marquee ticker (separate chars, infinite)
  useEffect(() => {
    if (!tickerRef.current) return;
    const a = animate(tickerRef.current, {
      translateX: ['0%', '-50%'],
      duration: 38000,
      ease: 'linear',
      loop: true,
    });
    return () => {
      a.pause();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12)_0%,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          }}
        />
      </div>

      <div className="flex-1 mx-auto max-w-[1400px] w-full px-6 md:px-10 pt-32 md:pt-36 pb-16 flex flex-col">
        {/* Meta row */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <div className="flex items-center gap-3" data-h-meta>
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Kernel · Community Feed
          </div>
          <div data-h-meta className="hidden sm:flex items-center gap-3">
            <span>BCN · {time}</span>
            <span className="text-primary">●</span>
            <span>Live</span>
          </div>
        </div>

        <div data-h-line className="mt-6 h-px w-full bg-gradient-to-r from-border via-border/40 to-transparent" />

        {/* Headline */}
        <div className="mt-12 md:mt-16 max-w-[1180px]">
          <h1 className="font-serif italic tracking-[-0.04em] leading-[0.92] text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[148px]">
            <span className="block overflow-hidden">
              {WORDS_LINE_1.map((w, i) => (
                <span key={i} data-h-word className="inline-block mr-[0.10em] will-change-transform">
                  {w}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {WORDS_LINE_2.map((w, i) => (
                <span key={i} data-h-word className="inline-block mr-[0.10em] will-change-transform">
                  {w}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {WORDS_LINE_3.map((w, i) => (
                <span
                  key={i}
                  data-h-word
                  className={
                    'inline-block mr-[0.10em] will-change-transform ' +
                    (w === 'mind.' ? 'text-primary' : '')
                  }
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Sub + tickers */}
        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <p
            data-h-fade
            className="md:col-span-5 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-md"
          >
            A blog distilled from the Kernel Community. Tech news, deep reads,
            and signal from devs you'd want to share an espresso with —
            re-ranked daily for the way <em>you</em> read.
          </p>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
            {META_TICKERS.map((t, i) => (
              <div key={t.label} data-h-ticker-row className="border-t border-border pt-3">
                <div className="font-serif italic text-3xl md:text-4xl tracking-tight">
                  <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>
                  {t.suffix && <span className="text-primary not-italic font-sans">{t.suffix}</span>}
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom marquee — what's trending */}
      <div className="relative border-y border-border/40 py-5 overflow-hidden bg-background/40 backdrop-blur-[2px]">
        <div
          ref={tickerRef}
          className="flex whitespace-nowrap will-change-transform font-mono text-[12px] tracking-[0.28em] uppercase text-muted-foreground"
        >
          {Array.from({ length: 2 }).map((_, g) => (
            <div key={g} className="flex items-center gap-10 pr-10">
              <span className="text-primary">↳ Trending</span>
              <span>React 20 server actions</span>
              <span className="text-primary">◆</span>
              <span>Anthropic ships memory tool</span>
              <span className="text-primary">◆</span>
              <span>Bun 2.0 release notes</span>
              <span className="text-primary">◆</span>
              <span>Why I left Vercel</span>
              <span className="text-primary">◆</span>
              <span>The end of the SPA</span>
              <span className="text-primary">◆</span>
              <span>Tailwind v5 alpha</span>
              <span className="text-primary">◆</span>
              <span>Astro 6 islands</span>
              <span className="text-primary">◆</span>
              <span>typescript 6.0 perf</span>
              <span className="text-primary">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
