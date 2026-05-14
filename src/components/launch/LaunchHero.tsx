'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const WORDS_LINE_1 = ['Fuel', 'for'];
const WORDS_LINE_2 = ['deep', 'work.'];

export function LaunchHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-word]', { yPercent: 110, opacity: 0 });
      gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
      gsap.set('[data-hero-line]', { scaleX: 0, transformOrigin: 'left' });
      gsap.set('[data-hero-meta]', { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.to('[data-hero-meta]', { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.15)
        .to('[data-hero-line]', { scaleX: 1, duration: 1.1 }, 0.2)
        .to(
          '[data-hero-word]',
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.07,
          },
          0.3,
        )
        .to(
          '[data-hero-fade]',
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
          0.85,
        );

      const marquee = document.querySelector('[data-hero-marquee]');
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -50,
          repeat: -1,
          duration: 40,
          ease: 'none',
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col"
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08)_0%,transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage:
              'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }}
        />
      </div>

      <div className="flex-1 mx-auto max-w-[1400px] w-full px-6 md:px-10 pt-32 md:pt-40 pb-20 flex flex-col">
        {/* Meta row */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <div className="flex items-center gap-3" data-hero-meta>
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Campaign 01 · Launch
          </div>
          <div data-hero-meta className="hidden sm:block">
            Q2 · 2026
          </div>
        </div>

        {/* dividing line */}
        <div
          data-hero-line
          className="mt-6 h-px w-full bg-gradient-to-r from-border via-border/40 to-transparent"
        />

        {/* Headline */}
        <div className="mt-14 md:mt-24 max-w-[1100px]">
          <h1 className="font-serif italic tracking-[-0.04em] leading-[0.92] text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[172px]">
            <span className="block overflow-hidden pb-[0.18em] -mb-[0.10em]">
              {WORDS_LINE_1.map((w, i) => (
                <span
                  key={i}
                  data-hero-word
                  className="inline-block mr-[0.12em] will-change-transform"
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-[0.18em] -mb-[0.10em]">
              {WORDS_LINE_2.map((w, i) => (
                <span
                  key={i}
                  data-hero-word
                  className="inline-block mr-[0.12em] will-change-transform text-primary"
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Sub + CTA */}
        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <p
            data-hero-fade
            className="md:col-span-5 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-md"
          >
            Specialty coffee engineered as a cognitive tool. Roasts classified by
            the kind of work you're about to do — not by the hour of the day.
          </p>

          <form
            data-hero-fade
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="md:col-span-6 md:col-start-7 w-full"
          >
            <label className="block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
              Join the launch list
            </label>
            <div className="group relative flex items-center border-b border-border focus-within:border-foreground transition-colors">
              <input
                type="email"
                required
                disabled={submitted}
                placeholder="you@domain.work"
                className="flex-1 bg-transparent py-4 pr-4 text-lg md:text-xl font-serif italic placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={submitted}
                className="group/btn inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase py-3 px-5 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-60"
              >
                {submitted ? 'Queued' : 'Request'}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform group-hover/btn:translate-x-0.5"
                >
                  <path
                    d="M1 7h11m0 0L7 2m5 5l-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground/80">
              {submitted
                ? '> Access request received · check your inbox'
                : 'Early access · first 500 shipments at –25%'}
            </p>
          </form>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative border-y border-border/40 py-5 overflow-hidden bg-background/40 backdrop-blur-[2px]">
        <div
          data-hero-marquee
          className="flex whitespace-nowrap will-change-transform font-mono text-[12px] tracking-[0.28em] uppercase text-muted-foreground"
        >
          {Array.from({ length: 2 }).map((_, g) => (
            <div key={g} className="flex items-center gap-10 pr-10">
              <span>↳ productivity</span>
              <span className="text-primary">◆</span>
              <span>single origin</span>
              <span className="text-primary">◆</span>
              <span>cognitive performance</span>
              <span className="text-primary">◆</span>
              <span>roasted to order</span>
              <span className="text-primary">◆</span>
              <span>flow state</span>
              <span className="text-primary">◆</span>
              <span>deep work</span>
              <span className="text-primary">◆</span>
              <span>ritual, not routine</span>
              <span className="text-primary">◆</span>
              <span>v1.0.0 — april 2026</span>
              <span className="text-primary">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
