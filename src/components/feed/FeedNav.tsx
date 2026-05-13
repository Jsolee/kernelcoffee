'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { animate } from 'animejs';

const TOPICS_FOLLOWED = ['AI', 'Frontend', 'Tech News'];

export function FeedNav() {
  const navRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.2 },
    );
  }, []);

  // anime.js: pulsing dot for "live" indicator
  useEffect(() => {
    if (!dotRef.current) return;
    const a = animate(dotRef.current, {
      scale: [1, 1.8, 1],
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
    <nav
      ref={navRef}
      className={
        'fixed top-0 inset-x-0 z-50 transition-all duration-500 ' +
        (scrolled
          ? 'backdrop-blur-xl bg-background/70 border-b border-border/40'
          : 'bg-transparent')
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="/launch" className="flex items-center gap-2.5 group">
          <img
            src="/logo.svg"
            alt="Kernel"
            className="h-7 w-auto transition-transform duration-500 group-hover:rotate-[-6deg]"
          />
          <span className="font-mono text-[13px] tracking-[0.18em] uppercase">
            Kernel<span className="text-primary">/</span>Feed
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-7 font-mono text-[12px] tracking-[0.18em] uppercase text-muted-foreground">
          <a href="#feed" className="hover:text-foreground transition-colors">
            Feed
          </a>
          <a href="#discord" className="hover:text-foreground transition-colors">
            Discord
          </a>
          <a href="#knowledge" className="hover:text-foreground transition-colors">
            Talks
          </a>
          <a href="#gamification" className="hover:text-foreground transition-colors hidden lg:inline">
            Ranks
          </a>
          <a href="#cron" className="hover:text-foreground transition-colors">
            Cron
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground border border-border/60 rounded-full pl-2 pr-3 py-1">
            <span ref={dotRef} className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
            <span>Following · {TOPICS_FOLLOWED.length}</span>
          </div>
          <a
            href="#subscribe"
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors shadow-[0_0_0_0_hsl(var(--primary))] hover:shadow-[0_0_24px_2px_hsl(var(--primary)/0.4)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
            </span>
            Subscribe · Free
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M1 7h11m0 0L7 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
