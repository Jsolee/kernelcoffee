'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const CHANNELS = [
  { name: '#general', count: 412, badge: 'live' },
  { name: '#frontend-desk', count: 187 },
  { name: '#ai-lab', count: 234, badge: 'hot' },
  { name: '#career-room', count: 96 },
  { name: '#bugs-and-postmortems', count: 142 },
  { name: '#show-and-tell', count: 78 },
];

const ONLINE = [
  { handle: '@maya', role: 'staff', color: 'bg-primary' },
  { handle: '@lior', role: 'maintainer', color: 'bg-amber-400/80' },
  { handle: '@noa', role: 'guest · oss', color: 'bg-rose-400/80' },
  { handle: '@sven', role: 'lead', color: 'bg-foreground' },
];

export function KernelDiscord() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-disc-fade]', {
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

  useEffect(() => {
    if (!dotRef.current) return;
    const a = animate(dotRef.current, {
      scale: [1, 1.7, 1],
      opacity: [1, 0.4, 1],
      duration: 1800,
      ease: 'inOutSine',
      loop: true,
    });
    return () => {
      a.pause();
    };
  }, []);

  return (
    <section
      id="discord"
      ref={rootRef}
      className="relative py-28 md:py-36 border-t border-border/50 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08)_0%,transparent_55%)]" />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16">
          <span className="h-px w-10 bg-border" />
          <span>§ The Kernel Discord · closed door</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Copy */}
          <div className="lg:col-span-6">
            <h2
              data-disc-fade
              className="font-serif italic tracking-[-0.03em] leading-[1.05] text-[10vw] md:text-[68px] lg:text-[88px] pb-[0.05em]"
            >
              A room for devs <br />
              <span className="text-primary">who actually ship.</span>
            </h2>
            <p data-disc-fade className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
              The Kernel Discord is invite-only. No drive-by traffic, no
              recruiters DM-ing you, no "engagement growth" channels. Just
              devs reviewing each other's PRs over a slow espresso.
            </p>

            <ul data-disc-fade className="mt-8 space-y-3 max-w-md font-mono text-[12px] tracking-[0.05em] text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">▶</span>
                <span>Daily standups · weekly demos · async by default</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">▶</span>
                <span>Code review threads with the Kernel desk</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-0.5">▶</span>
                <span>One vouched intro per existing member</span>
              </li>
            </ul>

            <div data-disc-fade className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#subscribe"
                className="group inline-flex items-center justify-center gap-2 font-mono text-[12px] tracking-[0.22em] uppercase py-4 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                Request invite
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M1 7h11m0 0L7 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground px-4">
                <span ref={dotRef} className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
                412 online now · 1,247 members
              </div>
            </div>
          </div>

          {/* Discord mockup */}
          <div data-disc-fade className="lg:col-span-6">
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden shadow-[0_24px_80px_-30px_hsl(var(--primary)/0.3)]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  kernel.community · discord
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary">
                  invite only
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-5 sm:col-span-4 border-r border-border/60 p-4 space-y-1">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Channels</div>
                  {CHANNELS.map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center justify-between font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 rounded hover:bg-foreground/5 cursor-default"
                    >
                      <span className="truncate">{c.name}</span>
                      {c.badge ? (
                        <span className="text-[9px] uppercase tracking-[0.18em] text-primary">{c.badge}</span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/60">{c.count}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="col-span-7 sm:col-span-8 p-4">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">Online now</div>
                  <div className="space-y-2.5">
                    {ONLINE.map((m) => (
                      <div key={m.handle} className="flex items-center gap-3">
                        <span className={`h-7 w-7 rounded-full ${m.color}`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-[12px] truncate">{m.handle}</div>
                          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground truncate">{m.role}</div>
                        </div>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg border border-border/60 bg-background/40 p-3">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary mb-1">@maya · #ai-lab</div>
                    <div className="font-serif italic text-sm leading-snug">
                      "shipped the new ranking weights this morning — anyone want to break it?"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
