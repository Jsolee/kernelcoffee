'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    n: '01',
    refs: '1 dev',
    reward: 'Free month of Cron',
    blurb: 'A friend joins through your link and confirms their email.',
  },
  {
    n: '02',
    refs: '3 devs',
    reward: 'Kernel mug · ceramic',
    blurb: 'Hand-thrown in Barcelona. Black glaze, mono logo, dishwasher-safe.',
  },
  {
    n: '03',
    refs: '7 devs',
    reward: '1 year of Cron + tee',
    blurb: 'Full Cron access, plus the heavy-cotton Kernel tee. Shipped worldwide.',
  },
  {
    n: '04',
    refs: '15 devs',
    reward: 'Lifetime · founders board',
    blurb: 'You get a seat on the founders board. Vote on roadmap. Free forever.',
  },
];

export function KernelReferrals() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-ref-fade]', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
      });

      gsap.from('[data-ref-tier]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-ref-tier-grid]', start: 'top 78%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText('kernel.community/r/you');
    } catch {
      /* noop */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="referrals"
      ref={rootRef}
      className="relative py-28 md:py-36 border-t border-border/50 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-12 md:mb-16">
          <span className="h-px w-10 bg-border" />
          <span>§ Referral program · earn for vouching</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <h2
              data-ref-fade
              className="font-serif italic tracking-[-0.03em] leading-[1.05] text-[10vw] md:text-[68px] lg:text-[96px] pb-[0.05em]"
            >
              Bring a dev. <br />
              <span className="text-primary">Unlock the desk.</span>
            </h2>
            <p data-ref-fade className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
              The Kernel community grows by handshake. Every dev you vouch for
              gets a personal invite — and every confirmed signup moves you up
              the perks ladder.
            </p>
          </div>

          {/* Share link card */}
          <div data-ref-fade className="lg:col-span-5">
            <div className="rounded-2xl border border-foreground/15 bg-background/60 backdrop-blur-md p-6 md:p-7">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                Your invite link
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-3 font-mono text-[13px] text-foreground">
                <span className="text-muted-foreground">kernel.community/r/</span>
                <span className="text-primary truncate">you</span>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={onCopy}
                  className="flex-1 inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase py-3 px-5 rounded-xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy link'}
                </button>
                <a
                  href="#subscribe"
                  className="flex-1 inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase py-3 px-5 rounded-xl border border-border hover:border-foreground transition-colors"
                >
                  Activate referrals
                </a>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                <div className="rounded-lg border border-border/60 p-3 text-center">
                  <div className="text-primary font-serif italic not-italic text-lg">0</div>
                  <div className="mt-1">Sent</div>
                </div>
                <div className="rounded-lg border border-border/60 p-3 text-center">
                  <div className="text-primary font-serif italic not-italic text-lg">0</div>
                  <div className="mt-1">Joined</div>
                </div>
                <div className="rounded-lg border border-border/60 p-3 text-center">
                  <div className="text-primary font-serif italic not-italic text-lg">—</div>
                  <div className="mt-1">Tier</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tiers */}
        <div data-ref-tier-grid className="mt-16 md:mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((t) => (
            <div
              key={t.n}
              data-ref-tier
              className="relative rounded-xl border border-border/60 bg-background/40 p-6 hover:border-foreground/40 transition-colors group"
            >
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary">
                Tier {t.n} · {t.refs}
              </div>
              <div className="mt-3 font-serif italic text-2xl md:text-3xl leading-tight tracking-tight">
                {t.reward}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {t.blurb}
              </p>
              <div className="mt-5 h-px w-full bg-border group-hover:bg-foreground/30 transition-colors" />
              <div className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                Auto-unlocks on confirm
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
