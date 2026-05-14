'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROOF_POINTS = [
  { k: '01', label: 'Roast profile', value: 'Cognitive' },
  { k: '02', label: 'Traceability', value: 'Single Origin' },
  { k: '03', label: 'Pipeline', value: 'Order → Roast' },
  { k: '04', label: 'Latency', value: '<48h to cup' },
];

function Line({ children }: { children: ReactNode }) {
  return (
    <span data-manifesto-line className="block overflow-hidden pb-[0.18em] -mb-[0.10em]">
      <span data-word className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}

export function Manifesto() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-manifesto-line]');
      lines.forEach((line) => {
        gsap.from(line.querySelectorAll('[data-word]'), {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.from('[data-proof-item]', {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '[data-proof-grid]',
          start: 'top 82%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={rootRef}
      className="relative py-32 md:py-48 border-t border-border/50"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-14 md:mb-20">
          <span className="h-px w-10 bg-border" />
          <span>§ Manifesto</span>
        </div>

        <div className="font-serif italic tracking-[-0.03em] leading-[1.05] text-[8vw] md:text-[60px] lg:text-[76px] max-w-[1180px]">
          <Line>Coffee is not a beverage.</Line>
          <Line>It is the interface</Line>
          <Line>
            between a quiet mind and{' '}
            <span className="text-primary not-italic font-sans font-semibold tracking-tight">
              deep_work()
            </span>
            .
          </Line>
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-12 gap-10 items-start">
          <div data-manifesto-line className="md:col-span-5 overflow-hidden">
            <p
              data-word
              className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-md will-change-transform"
            >
              We build specialty roasts the way engineers ship software —
              traceable, reproducible, documented, and optimized for a precise
              cognitive state. Every stack solves a different problem in your
              day.
            </p>
          </div>

          <div
            data-proof-grid
            className="md:col-span-7 md:col-start-6 grid grid-cols-2 gap-x-6 gap-y-8"
          >
            {PROOF_POINTS.map((p) => (
              <div
                key={p.k}
                data-proof-item
                className="group border-t border-border pt-4"
              >
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground flex items-center justify-between">
                  <span>{p.k}</span>
                  <span className="h-1 w-1 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                </div>
                <div className="mt-4 font-serif italic text-3xl md:text-4xl tracking-tight">
                  {p.value}
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
