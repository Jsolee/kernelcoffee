'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const PERKS = [
  'Daily distilled email · 4 posts max',
  'Members-only Kernel desk threads',
  'No tracking, no ads, no syndication',
  'Discount on Kernel Coffee · 15%',
];

export function FeedSubscribe() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-sub-fade]', {
        opacity: 0,
        y: 32,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // anime.js: pulsing concentric rings
  useEffect(() => {
    if (!ringsRef.current) return;
    const rings = ringsRef.current.querySelectorAll<SVGCircleElement>('[data-ring]');
    const anims = Array.from(rings).map((ring, i) =>
      animate(ring, {
        scale: [1, 1.18],
        opacity: [0.6, 0],
        duration: 3200,
        delay: i * 700,
        ease: 'outExpo',
        loop: true,
      }),
    );
    return () => {
      anims.forEach((a) => a.pause());
    };
  }, []);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(true);

    // anime.js confetti-ish stagger
    animate('[data-sub-perk]', {
      scale: [1, 1.04, 1],
      delay: stagger(70),
      duration: 500,
      ease: 'outExpo',
    });
  };

  return (
    <section
      id="subscribe"
      ref={rootRef}
      className="relative py-28 md:py-44 border-t border-border/50 overflow-hidden"
    >
      {/* Backdrop rings */}
      <div
        ref={ringsRef}
        className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="-200 -200 400 400" className="h-[140vmin] w-[140vmin] opacity-40">
          {[60, 100, 140, 180].map((r) => (
            <circle
              key={r}
              data-ring
              cx="0"
              cy="0"
              r={r}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
            />
          ))}
        </svg>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Top urgency banner */}
        <div
          data-sub-fade
          className="mx-auto max-w-fit flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-primary border border-primary/40 bg-primary/5 rounded-full px-4 py-2 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Next issue ships in · 07:00 CET tomorrow
        </div>

        {/* Centered, louder headline */}
        <div className="text-center max-w-[1180px] mx-auto">
          <div data-sub-fade className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-6">
            <span className="h-px w-10 bg-border" />
            <span>§ Subscribe to the Kernel Wire</span>
            <span className="h-px w-10 bg-border" />
          </div>

          <h2
            data-sub-fade
            className="font-serif italic tracking-[-0.03em] leading-[1.02] text-[11vw] md:text-[88px] lg:text-[120px]"
          >
            One email. <br />
            <span className="text-primary">Four posts.</span> <br />
            Zero noise.
          </h2>

          <p data-sub-fade className="mt-8 max-w-xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
            The Kernel Wire ships every morning at 07:00 CET — the same feed
            you've been tuning, distilled to the four posts our desk would
            actually open. <strong className="text-foreground">Join 1,247 developers</strong> already reading.
          </p>
        </div>

        {/* The big form */}
        <form
          data-sub-fade
          onSubmit={onSubmit}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="relative rounded-2xl border border-foreground/20 bg-background/70 backdrop-blur-md p-2 shadow-[0_24px_80px_-30px_hsl(var(--primary)/0.4)] focus-within:border-foreground transition-colors">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="email"
                required
                disabled={submitted}
                placeholder="you@domain.work"
                className="flex-1 bg-transparent px-5 py-4 text-lg md:text-xl font-serif italic placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={submitted}
                className="group/btn inline-flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.22em] uppercase py-4 px-7 rounded-xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {submitted ? '✓ Confirmed' : 'Subscribe free →'}
              </button>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground/80">
            {submitted
              ? '> Confirmation sent · check your inbox at 07:00 CET'
              : '100% free · unsubscribe in one click · no spam ever'}
          </p>

          {/* receipt-style confirmation */}
          {submitted && (
            <div className="mt-8 max-w-md mx-auto rounded-md border border-border/70 bg-background/40 p-5 font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground space-y-1">
              <div className="flex justify-between"><span>Status</span><span className="text-primary">Confirmed</span></div>
              <div className="flex justify-between"><span>Profile</span><span>0xKERNEL · demo</span></div>
              <div className="flex justify-between"><span>Topics</span><span>AI · Frontend · Tech</span></div>
              <div className="flex justify-between"><span>First issue</span><span>Tomorrow · 07:00</span></div>
            </div>
          )}
        </form>

        {/* Perks grid */}
        <ul className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {PERKS.map((p) => (
            <li
              key={p}
              data-sub-perk
              data-sub-fade
              className="rounded-xl border border-border/60 bg-background/40 p-5 flex items-start gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:border-foreground/40 transition-colors"
            >
              <span className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        {/* Social proof */}
        <div data-sub-fade className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['bg-primary', 'bg-foreground', 'bg-amber-400/80', 'bg-rose-400/80', 'bg-sky-400/80'].map((c) => (
                <span key={c} className={`h-7 w-7 rounded-full ring-2 ring-background ${c}`} />
              ))}
            </div>
            <span>1,247 devs reading</span>
          </div>
          <span className="hidden sm:inline text-border">|</span>
          <div className="flex items-center gap-2">
            <span className="text-primary">★★★★★</span>
            <span>4.9 · 312 ratings</span>
          </div>
          <span className="hidden sm:inline text-border">|</span>
          <div className="flex items-center gap-2">
            <span className="text-primary">●</span>
            <span>Open rate · 76%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
