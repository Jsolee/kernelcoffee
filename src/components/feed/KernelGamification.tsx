'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const RANKS = [
  { no: '01', name: 'Apprentice', xp: '0 — 250 XP', perk: 'Read access · feed + 1 weekly talk' },
  { no: '02', name: 'Maintainer', xp: '250 — 1,500 XP', perk: 'Post threads · vote on roadmap items' },
  { no: '03', name: 'Architect', xp: '1,500 — 6,000 XP', perk: 'Host a talk · publish on the Wire' },
  { no: '04', name: 'Lead', xp: '6,000+ XP', perk: 'Vouch a new dev · founders board seat' },
];

const XP_RULES = [
  { delta: '+5', source: 'Land a code review in #frontend-desk' },
  { delta: '+12', source: 'Publish a post the desk distills into the Wire' },
  { delta: '+25', source: 'Host a Kernel Knowledge talk' },
  { delta: '+40', source: 'Vouch a dev who reaches Maintainer' },
];

export function KernelGamification() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const xpCounterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-gam-fade]', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
      });

      gsap.from('[data-gam-rank]', {
        opacity: 0,
        y: 26,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-gam-ladder]', start: 'top 78%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // progress bar fill + xp counter
  useEffect(() => {
    if (!progressRef.current) return;
    const obj = { v: 0 };
    const xpObj = { v: 0 };
    const a1 = animate(progressRef.current, {
      width: ['0%', '64%'],
      duration: 2000,
      delay: 600,
      ease: 'outExpo',
    });
    const a2 = animate(xpObj, {
      v: 960,
      duration: 1800,
      delay: 700,
      ease: 'outExpo',
      onUpdate: () => {
        if (xpCounterRef.current) {
          xpCounterRef.current.textContent = String(Math.round(xpObj.v));
        }
      },
    });
    void obj;
    return () => {
      a1.pause();
      a2.pause();
    };
  }, []);

  return (
    <section
      id="gamification"
      ref={rootRef}
      className="relative py-28 md:py-36 border-t border-border/50 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16">
          <span className="h-px w-10 bg-border" />
          <span>§ Junior → Lead · stay long enough to make it</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          <h2
            data-gam-fade
            className="lg:col-span-7 font-serif italic tracking-[-0.03em] leading-[1] text-[10vw] md:text-[68px] lg:text-[96px]"
          >
            Earn the room <br />
            <span className="text-primary">one ship at a time.</span>
          </h2>
          <p data-gam-fade className="lg:col-span-5 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
            Every contribution — a review, a thread, a talk — adds XP and
            moves you up the ladder. No grinding, no daily quests. The signal
            is real work, the reward is more room to do it.
          </p>
        </div>

        {/* Progress preview card */}
        <div data-gam-fade className="rounded-2xl border border-foreground/15 bg-background/60 backdrop-blur-md p-6 md:p-8 mb-12 md:mb-16">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-4">
            <span>@you · Maintainer · Tier 02</span>
            <span><span ref={xpCounterRef}>0</span> / 1,500 XP</span>
          </div>
          <div className="relative h-2 rounded-full bg-foreground/10 overflow-hidden">
            <div ref={progressRef} className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-amber-400 rounded-full" style={{ width: '0%' }} />
          </div>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {XP_RULES.map((r) => (
              <div key={r.source} className="rounded-lg border border-border/60 p-3 flex items-start gap-3">
                <span className="font-serif italic text-primary text-xl shrink-0">{r.delta}</span>
                <span className="font-mono text-[11px] leading-snug text-muted-foreground">{r.source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rank ladder */}
        <div data-gam-ladder className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
          {RANKS.map((r, i) => (
            <div
              key={r.no}
              data-gam-rank
              className={
                'relative rounded-xl border p-6 transition-colors group ' +
                (i === 1
                  ? 'border-primary/60 bg-primary/[0.04]'
                  : 'border-border/60 bg-background/40 hover:border-foreground/40')
              }
            >
              <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase">
                <span className={i === 1 ? 'text-primary' : 'text-muted-foreground'}>{r.no}</span>
                {i === 1 && <span className="text-primary">● You</span>}
              </div>
              <div className="mt-3 font-serif italic text-2xl md:text-3xl tracking-tight">
                {r.name}
              </div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                {r.xp}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {r.perk}
              </p>
            </div>
          ))}
        </div>

        <div data-gam-fade className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="max-w-md text-sm text-muted-foreground">
            Start at Apprentice the day you join the Wire. Reach Lead and you
            help decide what we ship next.
          </p>
          <a
            href="#subscribe"
            className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.22em] uppercase py-4 px-6 rounded-xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Start at Apprentice
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M1 7h11m0 0L7 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
