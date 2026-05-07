'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

type Voice = {
  id: string;
  name: string;
  role: string;
  bio: string;
  topic: string;
  posts: number;
  hue: number;
};

const VOICES: Voice[] = [
  { id: 'v01', name: 'Mira Okafor',     role: 'AI eng · Hugging Face',   bio: 'Writes about agent design & memory systems.', topic: 'AI',         posts: 24, hue: 142 },
  { id: 'v02', name: 'Daniyar Kim',     role: 'Frontend · Vercel',       bio: 'Performance-obsessed. RSC apologist.',         topic: 'Frontend',   posts: 18, hue: 12 },
  { id: 'v03', name: 'Iris Tanaka',     role: 'Staff eng · Linear',      bio: 'Deep tooling, productivity, deep work.',       topic: 'Tools',      posts: 31, hue: 280 },
  { id: 'v04', name: 'Salomé Bauer',    role: 'Infra · ex-Anthropic',    bio: 'Eval harnesses & honest benchmarks.',          topic: 'AI',         posts: 12, hue: 200 },
  { id: 'v05', name: 'Hiro Watanabe',   role: 'Open source · Bun',       bio: 'Runtime internals, weird async patterns.',     topic: 'Open Source', posts: 22, hue: 48 },
  { id: 'v06', name: 'Paloma Marín',    role: 'Engineering manager',     bio: 'Comp, hiring, and the human side of code.',    topic: 'Career',     posts: 9,  hue: 320 },
  { id: 'v07', name: 'Jonas Verheij',   role: 'Solo founder',            bio: 'Building in public. Unapologetic takes.',      topic: 'Tech News',  posts: 41, hue: 92 },
  { id: 'v08', name: 'Kernel Wire',     role: 'In-house desk',           bio: 'Daily curation. The signal, no spin.',         topic: 'Tech News',  posts: 187, hue: 0 },
];

export function FeedVoices() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-voices-head]', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // anime.js: cards entrance with stagger
  useEffect(() => {
    if (!rootRef.current) return;
    let played = false;
    const trig = ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top 70%',
      onEnter: () => {
        if (played) return;
        played = true;
        animate('[data-voice-card]', {
          opacity: [0, 1],
          translateY: [40, 0],
          delay: stagger(60),
          duration: 800,
          ease: 'outExpo',
        });
      },
    });
    return () => trig.kill();
  }, []);

  return (
    <section
      id="voices"
      ref={rootRef}
      className="relative py-28 md:py-40 border-t border-border/50"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16" data-voices-head>
          <span className="h-px w-10 bg-border" />
          <span>§ Voices · The Kernel desk</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-16" data-voices-head>
          <h2 className="lg:col-span-7 font-serif italic tracking-[-0.03em] leading-[1.04] text-[8vw] md:text-[60px] lg:text-[76px]">
            Real engineers. <br />
            <span className="text-primary">No</span> ghostwriters.
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 self-end text-base md:text-lg leading-relaxed text-muted-foreground">
            Every byline you see has shipped something. The Kernel desk picks
            voices the way we source coffee — traceable, distinctive, and
            opinionated.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {VOICES.map((v, i) => (
            <VoiceCard key={v.id} voice={v} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceCard({ voice, idx }: { voice: Voice; idx: number }) {
  const ref = useRef<HTMLElement>(null);
  const orbitRef = useRef<SVGGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // continuous slow orbit on avatar
    let orbitAnim: ReturnType<typeof animate> | null = null;
    if (orbitRef.current) {
      orbitAnim = animate(orbitRef.current, {
        rotate: '1turn',
        duration: 16000 + (idx % 4) * 1200,
        ease: 'linear',
        loop: true,
      });
    }

    const onEnter = () => {
      animate(el, { translateY: -4, duration: 380, ease: 'outExpo' });
      if (dotRef.current) {
        animate(dotRef.current, {
          r: [3, 5, 3],
          duration: 600,
          ease: 'inOutSine',
        });
      }
    };
    const onLeave = () => {
      animate(el, { translateY: 0, duration: 480, ease: 'outExpo' });
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      orbitAnim && orbitAnim.pause();
    };
  }, [idx]);

  return (
    <article
      ref={ref}
      data-voice-card
      className="group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm p-5 transition-colors hover:border-foreground/40 hover:bg-card/80"
    >
      {/* Avatar with orbiting dot */}
      <div className="flex items-start justify-between mb-5">
        <div className="relative h-16 w-16">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id={`g-${voice.id}`} cx="35%" cy="35%">
                <stop offset="0%" stopColor={`hsl(${voice.hue} 80% 70%)`} />
                <stop offset="100%" stopColor={`hsl(${(voice.hue + 60) % 360} 75% 35%)`} />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="32" fill={`url(#g-${voice.id})`} />
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="hsl(var(--foreground)/0.15)"
              strokeWidth="1"
            />
            <g ref={orbitRef} style={{ transformOrigin: '50px 50px' }}>
              <circle ref={dotRef} cx="50" cy="14" r="3" fill="hsl(var(--primary))" />
            </g>
          </svg>
        </div>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground text-right">
          <div>{voice.posts} posts</div>
          <div className="text-primary mt-1">{voice.topic}</div>
        </div>
      </div>

      <h3 className="font-serif italic text-2xl tracking-tight leading-tight">{voice.name}</h3>
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-1">
        {voice.role}
      </div>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{voice.bio}</p>

      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
        <button className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors">
          + Follow
        </button>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-1"
        >
          <path
            d="M1 7h11m0 0L7 2m5 5l-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </article>
  );
}
