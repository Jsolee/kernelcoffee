'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MidSubscribeCTA() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-mid-fade]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative py-20 md:py-28 border-t border-border/50"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.10)_0%,transparent_60%)]" />

      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="rounded-3xl border border-foreground/15 bg-background/60 backdrop-blur-md p-8 md:p-14 relative overflow-hidden">
          {/* corner accent */}
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div data-mid-fade className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-primary mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Liked what you read?
              </div>
              <h3
                data-mid-fade
                className="font-serif italic tracking-[-0.03em] leading-[1] text-4xl md:text-5xl lg:text-6xl"
              >
                Get the next 4 posts <br />
                <span className="text-primary">delivered at 07:00</span>.
              </h3>
              <p data-mid-fade className="mt-5 max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
                Skip the doomscroll. The Kernel Wire lands in your inbox once a
                day — distilled, ranked, ad-free.
              </p>
            </div>

            <div data-mid-fade className="lg:col-span-5 flex flex-col items-stretch gap-3">
              <a
                href="#subscribe"
                className="group inline-flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.22em] uppercase py-4 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Subscribe — it's free
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M1 7h11m0 0L7 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
              <div className="text-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                1,247 devs · unsubscribe anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
