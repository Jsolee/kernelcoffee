'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function StickySubscribeBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const nearEnd = y + h > docH - 700;
      setVisible(y > h * 0.9 && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.to(barRef.current, {
      y: visible && !dismissed ? 0 : 120,
      opacity: visible && !dismissed ? 1 : 0,
      duration: 0.55,
      ease: 'expo.out',
    });
  }, [visible, dismissed]);

  return (
    <div
      ref={barRef}
      style={{ transform: 'translateY(120px)', opacity: 0 }}
      className="fixed bottom-4 inset-x-4 md:bottom-6 md:left-auto md:right-6 md:inset-x-auto z-40 pointer-events-auto"
    >
      <div className="mx-auto md:mx-0 max-w-xl rounded-2xl border border-foreground/20 bg-background/90 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] flex items-center gap-3 p-2 pl-5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground hidden sm:block">
            Tomorrow · 07:00 CET
          </div>
          <div className="font-serif italic text-base md:text-lg leading-tight truncate">
            Get the next Kernel Wire
          </div>
        </div>
        <a
          href="#subscribe"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.22em] uppercase py-2.5 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors whitespace-nowrap shrink-0"
        >
          Subscribe
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M1 7h11m0 0L7 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="shrink-0 h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
