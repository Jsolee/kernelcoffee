'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Subscribe() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-cta-word]', {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-cta-title]',
          start: 'top 85%',
        },
      });

      gsap.from('[data-cta-fade]', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-cta-form]',
          start: 'top 85%',
        },
      });

      // slow drift on the backdrop glyph
      gsap.to('[data-cta-glyph]', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['Start', 'your', 'cron', 'job.'];

  return (
    <section
      id="subscribe"
      ref={rootRef}
      className="relative py-32 md:py-52 border-t border-border/50 overflow-hidden"
    >
      {/* backdrop glyph */}
      <div
        data-cta-glyph
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 md:-top-20 flex justify-center select-none"
      >
        <span className="font-serif italic text-[42vw] md:text-[28vw] leading-none text-primary/[0.05] tracking-[-0.05em]">
          ☕
        </span>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16">
          <span className="h-px w-10 bg-border" />
          <span>§ Early access</span>
        </div>

        <h2
          data-cta-title
          className="font-serif italic tracking-[-0.04em] leading-[0.92] text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[172px]"
        >
          {titleWords.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-baseline pb-[0.18em] -mb-[0.10em]">
              <span
                data-cta-word
                className={
                  'inline-block will-change-transform mr-[0.1em] ' +
                  (i === 2 ? 'text-primary' : '')
                }
              >
                {w}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-10 items-end">
          <p
            data-cta-fade
            className="md:col-span-5 text-lg leading-relaxed text-muted-foreground max-w-md"
          >
            First 500 shipments at –25%. Your launch bag arrives with a
            hand-numbered card, a roast profile, and a link to the cognitive
            spec sheet.
          </p>

          <form
            data-cta-form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="md:col-span-6 md:col-start-7 w-full"
          >
            <div data-cta-fade>
              <label className="block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-4">
                Enter email · receive access
              </label>
              <div className="relative flex items-center border-b border-border focus-within:border-primary transition-colors">
                <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-primary mr-3">
                  ➜
                </span>
                <input
                  type="email"
                  required
                  disabled={submitted}
                  placeholder="you@domain.work"
                  className="flex-1 bg-transparent py-5 pr-4 text-xl md:text-2xl font-serif italic placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={submitted}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-mono text-[12px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background transition-colors disabled:opacity-60"
                >
                  {submitted ? 'Confirmed' : 'Reserve'}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h11m0 0L7 2m5 5l-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              data-cta-fade
              className="mt-6 grid grid-cols-3 gap-4 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                –25% launch
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Free ship EU
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Cancel anytime
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
