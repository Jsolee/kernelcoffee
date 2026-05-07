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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-7">
            <div data-sub-fade className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-8">
              <span className="h-px w-10 bg-border" />
              <span>§ Join the community</span>
            </div>

            <h2
              data-sub-fade
              className="font-serif italic tracking-[-0.03em] leading-[1.02] text-[9vw] md:text-[68px] lg:text-[96px] max-w-[1100px]"
            >
              One email. <br />
              <span className="text-primary">Four posts.</span> <br />
              Zero noise.
            </h2>

            <p data-sub-fade className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
              The Kernel Wire goes out every morning at 07:00 CET. It's the same
              feed you've been tuning, distilled to the four posts our desk
              would actually open.
            </p>

            <ul className="mt-10 grid sm:grid-cols-2 gap-3 max-w-lg">
              {PERKS.map((p) => (
                <li
                  key={p}
                  data-sub-perk
                  data-sub-fade
                  className="flex items-start gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground"
                >
                  <span className="mt-1.5 h-1 w-4 bg-primary shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            data-sub-fade
            onSubmit={onSubmit}
            className="lg:col-span-5"
          >
            <label className="block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
              {submitted ? '> Welcome to the Kernel desk' : 'Subscribe to the Wire'}
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
                {submitted ? 'Confirmed' : 'Subscribe'}
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
                ? '> Confirmation sent · check your inbox at 07:00 CET'
                : 'Free · unsubscribe in one click · 1,247 readers'}
            </p>

            {/* receipt-style confirmation */}
            {submitted && (
              <div className="mt-8 rounded-md border border-border/70 bg-background/40 p-5 font-mono text-[11px] tracking-[0.16em] uppercase text-muted-foreground space-y-1">
                <div className="flex justify-between"><span>Status</span><span className="text-primary">Confirmed</span></div>
                <div className="flex justify-between"><span>Profile</span><span>0xKERNEL · demo</span></div>
                <div className="flex justify-between"><span>Topics</span><span>AI · Frontend · Tech</span></div>
                <div className="flex justify-between"><span>First issue</span><span>Tomorrow · 07:00</span></div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
