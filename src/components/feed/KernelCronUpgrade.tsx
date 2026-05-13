'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FREE_FEATURES = [
  'The Kernel Wire · 1 daily email',
  'Read access · Discord lobby',
  'Replay library · 7-day window',
  'Apprentice rank · earn XP',
];

const CRON_FEATURES = [
  { f: 'The Kernel Wire · with desk annotations', emph: false },
  { f: 'Full Discord access · all channels + DMs', emph: true },
  { f: 'Replay library · full archive, no expiry', emph: false },
  { f: 'Live Tuesday + Thursday talks', emph: true },
  { f: 'Bring-a-guest pass · 2/month', emph: false },
  { f: '15% off Kernel Coffee · ceramic mug included', emph: true },
  { f: 'Vote on roadmap · founders thread access', emph: false },
];

export function KernelCronUpgrade() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-cron-fade]', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cron"
      ref={rootRef}
      className="relative py-28 md:py-36 border-t border-border/50 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.10)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16">
          <span className="h-px w-10 bg-border" />
          <span>§ Upgrade to Cron · the everyday plan</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">
          <h2
            data-cron-fade
            className="lg:col-span-7 font-serif italic tracking-[-0.03em] leading-[1] text-[10vw] md:text-[68px] lg:text-[96px]"
          >
            One plan that <br />
            <span className="text-primary">runs in the background.</span>
          </h2>
          <p data-cron-fade className="lg:col-span-5 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
            Cron is the Kernel paid tier. Same daily Wire, unlocked everything
            else. Coffee in the post, talks in your calendar, full Discord
            access. Cancel any morning.
          </p>
        </div>

        {/* Plan compare */}
        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Free / Apprentice */}
          <div data-cron-fade className="relative rounded-2xl border border-border/60 bg-background/40 p-8 md:p-10">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              Apprentice · the free tier
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif italic text-6xl tracking-tight">€0</span>
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">/ forever</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Everything you need to read the desk and meet the room.
            </p>

            <ul className="mt-8 space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 font-mono text-[12px] text-muted-foreground">
                  <span className="text-muted-foreground/60 mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#subscribe"
              className="mt-10 inline-flex items-center justify-center w-full gap-2 font-mono text-[12px] tracking-[0.22em] uppercase py-4 px-6 rounded-xl border border-foreground/30 hover:border-foreground transition-colors"
            >
              Start free
            </a>
          </div>

          {/* Cron — featured */}
          <div data-cron-fade className="relative rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/[0.06] to-transparent p-8 md:p-10 shadow-[0_24px_80px_-30px_hsl(var(--primary)/0.5)]">
            <div className="absolute -top-3 left-8 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase py-1.5 px-3 rounded-full bg-primary text-primary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              Most chosen
            </div>

            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary">
              Cron · everyday plan
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif italic text-6xl tracking-tight">€8</span>
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">/ month · billed yearly</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The whole desk — feed, talks, Discord, coffee. The way Kernel
              was meant to be read.
            </p>

            <ul className="mt-8 space-y-3">
              {CRON_FEATURES.map((f) => (
                <li
                  key={f.f}
                  className={
                    'flex items-start gap-3 font-mono text-[12px] ' +
                    (f.emph ? 'text-foreground' : 'text-muted-foreground')
                  }
                >
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{f.f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#subscribe"
              className="group mt-10 inline-flex items-center justify-center w-full gap-2 font-mono text-[12px] tracking-[0.22em] uppercase py-4 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Upgrade to Cron
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M1 7h11m0 0L7 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <div className="mt-3 text-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              7-day grace · cancel any morning
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
