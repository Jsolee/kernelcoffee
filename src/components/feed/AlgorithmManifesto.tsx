'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

const RULES = [
  {
    no: '01',
    rule: 'Recency over reach',
    body: 'New posts surface even if they have zero engagement. We don\'t care who already saw it.',
  },
  {
    no: '02',
    rule: 'No engagement bait',
    body: 'Cliffhanger headlines, "you won\'t believe", and outrage hooks are demoted automatically.',
  },
  {
    no: '03',
    rule: 'Author diversity',
    body: 'You won\'t see the same byline twice in a row. The desk rotates voices intentionally.',
  },
  {
    no: '04',
    rule: 'Local-first weights',
    body: 'Your topic preferences live on your device. Nothing leaves the browser unless you sign up.',
  },
  {
    no: '05',
    rule: 'Read time, not session time',
    body: 'We optimize for posts you actually finish — not how long you stay scrolling.',
  },
  {
    no: '06',
    rule: 'Signal-to-noise audit',
    body: 'The desk runs a weekly review. If a topic is producing too much noise, it gets re-ranked.',
  },
];

export function AlgorithmManifesto() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-algo-line]');
      lines.forEach((line) => {
        gsap.from(line.querySelectorAll('[data-algo-word]'), {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.04,
          scrollTrigger: { trigger: line, start: 'top 88%' },
        });
      });

      gsap.from('[data-algo-rule]', {
        opacity: 0,
        x: -40,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-algo-rules]', start: 'top 75%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // anime.js: blinking cursor
  useEffect(() => {
    if (!cursorRef.current) return;
    const a = animate(cursorRef.current, {
      opacity: [
        { to: 1, duration: 60 },
        { to: 0, duration: 60 },
      ],
      duration: 1100,
      ease: 'steps(2)',
      loop: true,
    });
    return () => {
      a.pause();
    };
  }, []);

  // anime.js: typewriter effect on the code block when in view
  useEffect(() => {
    if (!codeRef.current) return;
    const code = codeRef.current;
    const fullText = code.dataset.full || '';
    code.textContent = '';
    let played = false;

    const trig = ScrollTrigger.create({
      trigger: code,
      start: 'top 80%',
      onEnter: () => {
        if (played) return;
        played = true;
        const obj = { i: 0 };
        animate(obj, {
          i: fullText.length,
          duration: 2400,
          ease: 'linear',
          onUpdate: () => {
            code.textContent = fullText.slice(0, Math.floor(obj.i));
          },
        });
      },
    });
    return () => trig.kill();
  }, []);

  const codeText = `// /etc/kernel/feed.algorithm.ts
export const rank = (post: Post, you: Profile) => {
  const recency   = halfLife(post.publishedAt, '36h');
  const topicFit  = cosine(post.topics, you.weights);
  const baitScore = penalize(post.title, baitVocab);
  const novelty   = 1 - bylineRepeats(post.author, you.recent);

  return recency * 0.4
       + topicFit * 0.4
       + novelty * 0.15
       - baitScore * 0.25;
};`;

  return (
    <section
      id="algorithm"
      ref={rootRef}
      className="relative py-28 md:py-44 border-t border-border/50 overflow-hidden"
    >
      {/* radial backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.08)_0%,transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16">
          <span className="h-px w-10 bg-border" />
          <span>§ The algorithm · disclosed in full</span>
        </div>

        {/* Big headline */}
        <h2
          ref={headlineRef}
          className="font-serif italic tracking-[-0.03em] leading-[1.02] text-[9vw] md:text-[72px] lg:text-[100px] max-w-[1180px]"
        >
          <span data-algo-line className="block overflow-hidden pb-[0.18em] -mb-[0.10em]">
            <span data-algo-word className="inline-block mr-[0.10em] will-change-transform">No</span>
            <span data-algo-word className="inline-block mr-[0.10em] will-change-transform">engagement</span>
            <span data-algo-word className="inline-block mr-[0.10em] will-change-transform">bait.</span>
          </span>
          <span data-algo-line className="block overflow-hidden pb-[0.18em] -mb-[0.10em]">
            <span data-algo-word className="inline-block mr-[0.10em] will-change-transform">No</span>
            <span data-algo-word className="inline-block mr-[0.10em] will-change-transform">doomscroll.</span>
          </span>
          <span data-algo-line className="block overflow-hidden pb-[0.18em] -mb-[0.10em]">
            <span data-algo-word className="inline-block mr-[0.10em] will-change-transform">Just</span>
            <span data-algo-word className="inline-block mr-[0.10em] will-change-transform text-primary">signal.</span>
          </span>
        </h2>

        <div className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-12">
          {/* Code block */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                  feed.algorithm.ts
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary">
                  open · MIT
                </div>
              </div>
              <pre
                ref={codeRef}
                data-full={codeText}
                className="font-mono text-[12px] md:text-[13px] leading-relaxed p-5 md:p-6 text-muted-foreground overflow-x-auto whitespace-pre"
              >
{codeText}
              </pre>
              <div className="px-5 py-3 border-t border-border/60 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                <span>$</span>
                <span>kernel feed --explain --post=p07</span>
                <span ref={cursorRef} className="inline-block w-1.5 h-3 bg-primary ml-0.5" />
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm md:text-base leading-relaxed text-muted-foreground">
              The whole ranking function fits on one screen. We publish every
              change to it the same week we ship it. No black box, no growth-team
              lever you can't see.
            </p>
          </div>

          {/* Rules list */}
          <div className="lg:col-span-5" data-algo-rules>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-6">
              Six rules · always on
            </div>
            <ol className="space-y-2">
              {RULES.map((r) => (
                <li
                  key={r.no}
                  data-algo-rule
                  className="group relative flex gap-5 border-b border-border/60 py-5 hover:border-foreground/40 transition-colors"
                >
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-primary shrink-0 pt-1">
                    {r.no}
                  </span>
                  <div>
                    <div className="font-serif italic text-xl md:text-2xl tracking-tight">
                      {r.rule}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-md">
                      {r.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
