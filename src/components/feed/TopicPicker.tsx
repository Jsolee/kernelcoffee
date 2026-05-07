'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

type Topic = {
  id: string;
  label: string;
  count: number;
  color: string;
};

const TOPICS: Topic[] = [
  { id: 'ai', label: 'AI', count: 384, color: 'from-emerald-300/20 to-emerald-500/10' },
  { id: 'frontend', label: 'Frontend', count: 247, color: 'from-rose-300/20 to-rose-500/10' },
  { id: 'tech-news', label: 'Tech News', count: 519, color: 'from-amber-300/20 to-amber-500/10' },
  { id: 'devops', label: 'DevOps', count: 168, color: 'from-sky-300/20 to-sky-500/10' },
  { id: 'open-source', label: 'Open Source', count: 203, color: 'from-violet-300/20 to-violet-500/10' },
  { id: 'design', label: 'Design', count: 142, color: 'from-pink-300/20 to-pink-500/10' },
  { id: 'career', label: 'Career', count: 91, color: 'from-orange-300/20 to-orange-500/10' },
  { id: 'tools', label: 'Tools', count: 176, color: 'from-teal-300/20 to-teal-500/10' },
  { id: 'hardware', label: 'Hardware', count: 64, color: 'from-fuchsia-300/20 to-fuchsia-500/10' },
  { id: 'ml-ops', label: 'ML Ops', count: 88, color: 'from-lime-300/20 to-lime-500/10' },
  { id: 'security', label: 'Security', count: 73, color: 'from-red-300/20 to-red-500/10' },
  { id: 'product', label: 'Product', count: 112, color: 'from-indigo-300/20 to-indigo-500/10' },
];

const STORAGE_KEY = 'kernel.feed.topics';
const DEFAULT_SELECTED = ['ai', 'frontend', 'tech-news'];

function hashId(seeds: string[]) {
  // deterministic mini-hash → 6 hex chars
  const s = seeds.join('|');
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0').slice(-6).toUpperCase();
}

export function TopicPicker() {
  const rootRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLSpanElement>(null);
  const matchRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setSelected(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {}
  }, [selected]);

  const kernelId = useMemo(() => hashId(selected.length ? selected : ['empty']), [selected]);
  const matchPct = useMemo(() => {
    const base = 38;
    const bonus = Math.min(60, selected.length * 9);
    return base + bonus;
  }, [selected]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-tp-head]', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
      });
      gsap.from('[data-tp-card]', {
        opacity: 0,
        x: 80,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // anime.js: chips entrance with stagger when section enters viewport
  useEffect(() => {
    if (!rootRef.current) return;
    let played = false;
    const trigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top 70%',
      onEnter: () => {
        if (played) return;
        played = true;
        animate('[data-tp-chip]', {
          opacity: [0, 1],
          translateY: [24, 0],
          scale: [0.92, 1],
          delay: stagger(40),
          duration: 700,
          ease: 'outExpo',
        });
      },
    });
    return () => trigger.kill();
  }, []);

  // anime.js: when selection changes — animate match % counter + ring + ID flicker
  useEffect(() => {
    if (idRef.current) {
      // ID flicker
      animate(idRef.current, {
        opacity: [
          { to: 0.2, duration: 60 },
          { to: 1, duration: 80 },
          { to: 0.4, duration: 50 },
          { to: 1, duration: 100 },
        ],
        ease: 'linear',
      });
    }
    if (matchRef.current) {
      const obj = { v: parseFloat(matchRef.current.textContent || '0') };
      animate(obj, {
        v: matchPct,
        duration: 700,
        ease: 'outExpo',
        onUpdate: () => {
          if (matchRef.current) matchRef.current.textContent = String(Math.round(obj.v));
        },
      });
    }
    if (ringRef.current) {
      const circ = 2 * Math.PI * 44;
      const offset = circ - (matchPct / 100) * circ;
      animate(ringRef.current, {
        strokeDashoffset: offset,
        duration: 900,
        ease: 'outExpo',
      });
    }
  }, [matchPct]);

  const toggle = (id: string) => {
    setSelected((curr) => (curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]));
  };

  return (
    <section
      id="topics"
      ref={rootRef}
      className="relative py-28 md:py-40 border-t border-border/50"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16" data-tp-head>
          <span className="h-px w-10 bg-border" />
          <span>§ Topic stack · /etc/kernel.conf</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: heading + chips */}
          <div className="lg:col-span-7" data-tp-head>
            <h2 className="font-serif italic tracking-[-0.03em] leading-[1.04] text-[8vw] md:text-[64px] lg:text-[80px] max-w-[720px]">
              Tell us what you read.
              <br />
              We <span className="text-primary">re-rank</span> the rest.
            </h2>
            <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
              Every topic you tap shifts the weight of your feed. No accounts.
              No tracking pixels. Stored locally on this device.
            </p>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {TOPICS.map((t) => {
                const active = selected.includes(t.id);
                return (
                  <button
                    key={t.id}
                    data-tp-chip
                    onClick={() => toggle(t.id)}
                    className={
                      'group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 ' +
                      (active
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/60')
                    }
                  >
                    <span
                      className={
                        'h-1.5 w-1.5 rounded-full transition-colors ' +
                        (active ? 'bg-primary' : 'bg-muted-foreground/40 group-hover:bg-foreground')
                      }
                    />
                    {t.label}
                    <span className={'opacity-60 ' + (active ? 'text-background/70' : '')}>{t.count}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex items-center gap-4 font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              <button
                onClick={() => setSelected(DEFAULT_SELECTED)}
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                ↺ Reset to demo profile
              </button>
              <span>·</span>
              <span>{selected.length} active</span>
            </div>
          </div>

          {/* Right: profile card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28" data-tp-card>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
              {/* gradient backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_60%)]" />
              <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              <div className="relative p-8 md:p-10">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-6">
                  <span>Profile · ::demo</span>
                  <span>v1.0</span>
                </div>

                {/* Ring + ID */}
                <div className="flex items-center gap-6">
                  <div className="relative h-28 w-28 shrink-0">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="2"
                      />
                      <circle
                        ref={ringRef}
                        cx="50"
                        cy="50"
                        r="44"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 44}
                        strokeDashoffset={2 * Math.PI * 44}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-serif italic text-3xl tracking-tight">
                        <span ref={matchRef}>0</span>
                        <span className="text-primary not-italic font-sans">%</span>
                      </span>
                      <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-muted-foreground mt-0.5">
                        match
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-1">
                      Kernel ID
                    </div>
                    <div className="font-mono text-2xl md:text-3xl tracking-[0.06em]">
                      <span className="text-muted-foreground">0x</span>
                      <span ref={idRef} className="text-foreground">
                        {kernelId}
                      </span>
                    </div>
                    <div className="mt-2 font-serif italic text-base text-muted-foreground">
                      "the curious frontend dev"
                    </div>
                  </div>
                </div>

                {/* Bars */}
                <div className="mt-8 space-y-3">
                  {selected.slice(0, 5).map((id) => {
                    const t = TOPICS.find((x) => x.id === id);
                    if (!t) return null;
                    const w = Math.max(20, Math.min(95, (t.count / 600) * 100));
                    return (
                      <div key={id} className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase">
                        <span className="w-24 shrink-0 text-muted-foreground truncate">{t.label}</span>
                        <div className="flex-1 h-1 bg-border/60 relative overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-foreground"
                            style={{
                              width: `${w}%`,
                              transition: 'width 600ms cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                          />
                        </div>
                        <span className="text-muted-foreground w-10 text-right">{t.count}</span>
                      </div>
                    );
                  })}
                  {selected.length > 5 && (
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70 pt-1">
                      + {selected.length - 5} more
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  <span>Updated · just now</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    syncing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
