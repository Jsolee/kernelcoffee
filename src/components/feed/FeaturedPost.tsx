'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedPost() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word reveal in title
      const lines = gsap.utils.toArray<HTMLElement>('[data-fp-line]');
      lines.forEach((line) => {
        gsap.from(line.querySelectorAll('[data-fp-word]'), {
          yPercent: 110,
          opacity: 0,
          duration: 1.05,
          ease: 'expo.out',
          stagger: 0.04,
          scrollTrigger: { trigger: line, start: 'top 88%' },
        });
      });

      // Image parallax + scale
      gsap.from(imgRef.current, {
        scale: 1.18,
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
      });
      gsap.to(imgRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // Sidebar fade
      gsap.from('[data-fp-side]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // anime.js: numbers (read time, comments, claps) tick-up when in view
  useEffect(() => {
    if (!numbersRef.current) return;
    const targets = numbersRef.current.querySelectorAll<HTMLElement>('[data-fp-num]');
    let played = false;
    const trigger = ScrollTrigger.create({
      trigger: numbersRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (played) return;
        played = true;
        targets.forEach((el) => {
          const target = parseFloat(el.dataset.target || '0');
          const obj = { v: 0 };
          animate(obj, {
            v: target,
            duration: 1500,
            ease: 'outExpo',
            onUpdate: () => {
              if (target % 1 === 0) {
                el.textContent = String(Math.round(obj.v));
              } else {
                el.textContent = obj.v.toFixed(1);
              }
            },
          });
        });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative py-28 md:py-40 border-t border-border/50"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center justify-between gap-4 mb-12 md:mb-16 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-border" />
            <span>§ Editor's pick · #001</span>
          </div>
          <span className="hidden md:inline">Hand-picked · 04 May 2026</span>
        </div>

        <article className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Image */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-xl md:rounded-2xl bg-card border border-border/60 aspect-[4/3] lg:aspect-auto lg:min-h-[640px]">
            <div ref={imgRef} className="absolute inset-0 will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3a2417] via-[#1a1414] to-[#0f0a08]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 30%, hsl(var(--primary)/0.4), transparent 50%), radial-gradient(circle at 70% 70%, hsl(280 80% 55% / 0.3), transparent 55%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.18] mix-blend-screen"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent 0 2px, hsl(var(--foreground)/0.4) 2px 3px)`,
                }}
              />
              {/* big code-ish overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-serif italic text-[18vw] lg:text-[180px] leading-none text-foreground/10 select-none">
                  flow()
                </div>
              </div>
            </div>

            <div className="absolute top-5 left-5 right-5 flex items-start justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-white/80 z-10">
              <span className="px-2 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
                Long read · Frontend
              </span>
              <span>03 / 14</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/60">
                Photographed by Kernel Studio · BCN
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-6">
                <span className="text-primary">●</span>
                <span>Matched 96% to your profile</span>
              </div>

              <h2 className="font-serif italic tracking-[-0.03em] leading-[1.02] text-[8vw] md:text-[60px] lg:text-[64px]">
                <span data-fp-line className="block overflow-hidden">
                  <span data-fp-word className="inline-block mr-[0.10em] will-change-transform">The</span>
                  <span data-fp-word className="inline-block mr-[0.10em] will-change-transform">end</span>
                  <span data-fp-word className="inline-block mr-[0.10em] will-change-transform">of</span>
                  <span data-fp-word className="inline-block mr-[0.10em] will-change-transform">the</span>
                </span>
                <span data-fp-line className="block overflow-hidden">
                  <span data-fp-word className="inline-block mr-[0.10em] will-change-transform text-primary">single-page</span>
                </span>
                <span data-fp-line className="block overflow-hidden">
                  <span data-fp-word className="inline-block mr-[0.10em] will-change-transform">app.</span>
                </span>
              </h2>

              <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                Server-first frameworks have quietly won the war. Why your next
                React app should ship less JavaScript than ever — and what that
                means for the way teams actually write code.
              </p>
            </div>

            <div data-fp-side className="space-y-8">
              {/* Author row */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 ring-2 ring-foreground/10">
                  <div className="absolute inset-0 rounded-full mix-blend-overlay opacity-60 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
                </div>
                <div>
                  <div className="font-serif italic text-lg">Iris Tanaka</div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                    Staff engineer · Linear
                  </div>
                </div>
                <button className="ml-auto px-3 py-1.5 rounded-full border border-border font-mono text-[10px] tracking-[0.22em] uppercase hover:bg-foreground hover:text-background hover:border-foreground transition-colors">
                  Follow
                </button>
              </div>

              {/* Numbers */}
              <div ref={numbersRef} className="grid grid-cols-3 gap-4">
                <Stat label="Read" value="9.4" suffix="m" target={9.4} />
                <Stat label="Bookmarks" value="412" target={412} />
                <Stat label="Replies" value="86" target={86} />
              </div>

              <a
                href="#"
                className="group inline-flex items-center gap-2 self-start px-5 py-3 rounded-full bg-foreground text-background font-mono text-[11px] tracking-[0.22em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Read article
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h11m0 0L7 2m5 5l-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Stat({ label, value, suffix, target }: { label: string; value: string; suffix?: string; target: number }) {
  return (
    <div className="border-t border-border pt-3">
      <div className="font-serif italic text-2xl md:text-3xl tracking-tight">
        <span data-fp-num data-target={target}>{value}</span>
        {suffix && <span className="text-primary not-italic font-sans text-lg ml-0.5">{suffix}</span>}
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
