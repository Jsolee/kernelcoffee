'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TALKS = [
  {
    date: 'Tue · May 21',
    speaker: 'Lior Avrahami',
    role: 'Staff · Vercel',
    title: 'Server actions in the wild — three patterns I regret',
    duration: '38m',
    status: 'upcoming',
  },
  {
    date: 'Thu · May 16',
    speaker: 'Noa Bergman',
    role: 'Maintainer · Anthropic',
    title: 'How Claude\'s memory tool actually decides what to keep',
    duration: '52m',
    status: 'replay',
  },
  {
    date: 'Tue · May 14',
    speaker: 'Sven Karlsson',
    role: 'Founder · Plain',
    title: 'Inbox zero is a lie — what we built instead',
    duration: '41m',
    status: 'replay',
  },
  {
    date: 'Thu · May 09',
    speaker: 'Maya Reyes',
    role: 'Staff · Kernel desk',
    title: 'Killing the cron job — why we moved to durable workflows',
    duration: '47m',
    status: 'replay',
  },
];

export function KernelKnowledge() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-talk-fade]', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
      });

      gsap.from('[data-talk-row]', {
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-talk-list]', start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="knowledge"
      ref={rootRef}
      className="relative py-28 md:py-36 border-t border-border/50 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08)_0%,transparent_55%)]" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16">
          <span className="h-px w-10 bg-border" />
          <span>§ Kernel Knowledge · members-only talks</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">
          <h2
            data-talk-fade
            className="lg:col-span-7 font-serif italic tracking-[-0.03em] leading-[1.05] text-[10vw] md:text-[68px] lg:text-[96px] pb-[0.05em]"
          >
            Talks the desk <br />
            <span className="text-primary">hosts on Tuesdays.</span>
          </h2>
          <p data-talk-fade className="lg:col-span-5 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
            Every Tuesday and Thursday, 19:00 CET. One operator, one deep
            problem, one hour. Replays land in the members-only library —
            free with any Kernel subscription.
          </p>
        </div>

        {/* Talks list */}
        <ol data-talk-list className="border-t border-border/60">
          {TALKS.map((t) => (
            <li
              key={t.title}
              data-talk-row
              className="group grid grid-cols-12 gap-4 md:gap-6 border-b border-border/60 py-6 md:py-8 hover:bg-foreground/[0.02] transition-colors"
            >
              <div className="col-span-12 md:col-span-2 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                {t.date}
              </div>
              <div className="col-span-12 md:col-span-3">
                <div className="font-mono text-[12px] text-foreground">{t.speaker}</div>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">{t.role}</div>
              </div>
              <div className="col-span-9 md:col-span-5">
                <div className="font-serif italic text-xl md:text-2xl tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {t.title}
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 flex items-start md:items-center justify-end gap-3">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{t.duration}</span>
                <span
                  className={
                    'font-mono text-[10px] tracking-[0.22em] uppercase px-2 py-1 rounded-full border ' +
                    (t.status === 'upcoming'
                      ? 'border-primary/50 text-primary bg-primary/5'
                      : 'border-border text-muted-foreground')
                  }
                >
                  {t.status === 'upcoming' ? '● Live' : '▶ Replay'}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div data-talk-fade className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="max-w-md text-sm text-muted-foreground">
            Members get the live link 30 min before each talk plus the replay
            library — 84 talks and counting.
          </p>
          <a
            href="#subscribe"
            className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.22em] uppercase py-4 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Unlock the library
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M1 7h11m0 0L7 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
