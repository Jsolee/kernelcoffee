'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

type CardType = 'long' | 'code' | 'quote' | 'release' | 'thread' | 'link';

type Post = {
  id: string;
  type: CardType;
  topic: string;
  topicSlug: string;
  title: string;
  excerpt?: string;
  author: string;
  handle: string;
  read?: string;
  ago: string;
  match: number; // 0–100
  body?: string; // for code & quote
  meta?: string;
};

const POSTS: Post[] = [
  {
    id: 'p01',
    type: 'long',
    topic: 'AI',
    topicSlug: 'ai',
    title: 'Why memory tools will change agent UX forever',
    excerpt:
      'Persistent context isn\'t a model upgrade — it\'s a product surface. The teams shipping memory in their UI today are the ones rewriting the playbook.',
    author: 'Mira Okafor',
    handle: '@miraok',
    read: '6m read',
    ago: '2h',
    match: 94,
  },
  {
    id: 'p02',
    type: 'code',
    topic: 'Frontend',
    topicSlug: 'frontend',
    title: 'A 12-line debounce hook I keep reaching for',
    body: `function useDebounce<T>(value: T, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}`,
    author: 'Daniyar Kim',
    handle: '@daniyark',
    ago: '4h',
    match: 88,
  },
  {
    id: 'p03',
    type: 'quote',
    topic: 'Tech News',
    topicSlug: 'tech-news',
    title: '',
    body:
      'The most underrated skill of 2026 isn\'t prompting. It\'s knowing which problems are still worth writing software for.',
    author: 'Jonas Verheij',
    handle: '@jonasv',
    ago: '7h',
    match: 91,
  },
  {
    id: 'p04',
    type: 'release',
    topic: 'Frontend',
    topicSlug: 'frontend',
    title: 'Astro 6.0 — “Carbon”',
    excerpt:
      'Streaming islands, server actions, and a brand new content layer. The fastest version of Astro we\'ve ever shipped.',
    author: 'Astro Team',
    handle: '@astrodotbuild',
    meta: 'v6.0.0',
    ago: '1d',
    match: 86,
  },
  {
    id: 'p05',
    type: 'thread',
    topic: 'AI',
    topicSlug: 'ai',
    title: 'A thread on building agent eval harnesses that don\'t lie',
    excerpt:
      '14 things I learned while building the eval suite at our infra startup. Most of them I learned the painful way.',
    author: 'Salomé Bauer',
    handle: '@salobauer',
    meta: '14 posts',
    ago: '12h',
    match: 89,
  },
  {
    id: 'p06',
    type: 'long',
    topic: 'Tech News',
    topicSlug: 'tech-news',
    title: 'The quiet repricing of senior engineers',
    excerpt:
      'Comp data from 1,400 offers tells a strange story: titles inflate, but the bar at staff and above is rising fast.',
    author: 'Paloma Marín',
    handle: '@palomar',
    read: '8m read',
    ago: '1d',
    match: 82,
  },
  {
    id: 'p07',
    type: 'code',
    topic: 'AI',
    topicSlug: 'ai',
    title: 'Stream tool calls without losing your mind',
    body: `for await (const chunk of stream) {
  if (chunk.type === 'tool-call-delta')
    yield buffer.append(chunk.delta);
}`,
    author: 'Hiro Watanabe',
    handle: '@hirow',
    ago: '5h',
    match: 90,
  },
  {
    id: 'p08',
    type: 'link',
    topic: 'Tech News',
    topicSlug: 'tech-news',
    title: 'Anthropic releases Claude Opus 4.7 with 1M context',
    excerpt: 'anthropic.com — major release notes inside, plus benchmark deltas vs. 4.6.',
    author: 'Kernel Wire',
    handle: '@kernelwire',
    ago: '3h',
    match: 96,
  },
];

const TOPIC_FILTERS = [
  { id: 'all', label: 'For you' },
  { id: 'ai', label: 'AI' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'tech-news', label: 'Tech News' },
];

export function TheFeed() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const visible = useMemo(
    () =>
      filter === 'all'
        ? POSTS
        : POSTS.filter((p) => p.topicSlug === filter),
    [filter],
  );

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-feed-head]', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // anime.js: stagger cards every time filter / view changes
  useEffect(() => {
    animate('[data-feed-card]', {
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.98, 1],
      delay: stagger(60),
      duration: 750,
      ease: 'outExpo',
    });
  }, [filter, view]);

  return (
    <section
      id="feed"
      ref={rootRef}
      className="relative py-28 md:py-36 border-t border-border/50"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16" data-feed-head>
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground mb-6">
              <span className="h-px w-10 bg-border" />
              <span>§ The Feed · re-ranked 12s ago</span>
            </div>
            <h2 className="font-serif italic tracking-[-0.03em] leading-[1.04] text-[8vw] md:text-[64px] lg:text-[80px]">
              Today, in your <span className="text-primary">kernel</span>.
            </h2>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <ViewBtn label="Grid" active={view === 'grid'} onClick={() => setView('grid')} />
            <ViewBtn label="List" active={view === 'list'} onClick={() => setView('list')} />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 border-b border-border pb-3 mb-10">
          {TOPIC_FILTERS.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={
                'relative px-3 md:px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors ' +
                (filter === t.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground')
              }
            >
              {t.label}
              {filter === t.id && (
                <span className="absolute -bottom-3 left-3 right-3 h-px bg-primary" />
              )}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/80">
            <span className="hidden md:inline">{visible.length} posts</span>
            <span className="hidden md:inline">·</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              live
            </span>
          </div>
        </div>

        {/* Cards */}
        {view === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-min">
            {visible.map((p, i) => (
              <Card key={p.id} post={p} idx={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border/60">
            {visible.map((p, i) => (
              <RowCard key={p.id} post={p} idx={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ViewBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        'px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase rounded-full border transition-colors ' +
        (active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/60')
      }
    >
      {label}
    </button>
  );
}

function Card({ post, idx }: { post: Post; idx: number }) {
  const ref = useRef<HTMLElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  // Hover micro-interaction with anime.js
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => {
      animate(el, { translateY: -4, duration: 380, ease: 'outExpo' });
      if (arrowRef.current) {
        animate(arrowRef.current, { translateX: 4, duration: 320, ease: 'outExpo' });
      }
    };
    const onLeave = () => {
      animate(el, { translateY: 0, duration: 480, ease: 'outExpo' });
      if (arrowRef.current) {
        animate(arrowRef.current, { translateX: 0, duration: 380, ease: 'outExpo' });
      }
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Featured larger size for first card occasionally
  const tall = post.type === 'long' && idx === 0;
  const span = tall ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : '';

  return (
    <article
      ref={ref}
      data-feed-card
      data-card-type={post.type}
      className={
        'group relative flex flex-col rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-colors hover:border-foreground/40 hover:bg-card/80 ' +
        span
      }
    >
      <CardHeader post={post} />
      <CardBody post={post} tall={tall} />
      <CardFooter post={post} arrowRef={arrowRef} />
    </article>
  );
}

function CardHeader({ post }: { post: Post }) {
  const typeLabel: Record<CardType, string> = {
    long: 'Long read',
    code: 'Snippet',
    quote: 'Hot take',
    release: 'Release',
    thread: 'Thread',
    link: 'Link',
  };
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border/50">
      <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
        <span className="text-primary">●</span>
        <span className="text-muted-foreground">{post.topic}</span>
        <span className="text-muted-foreground/40">·</span>
        <span>{typeLabel[post.type]}</span>
      </div>
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        {post.match}% match
      </span>
    </div>
  );
}

function CardBody({ post, tall }: { post: Post; tall?: boolean }) {
  if (post.type === 'code') {
    return (
      <div className="px-5 py-5 flex-1">
        <div className="font-serif italic text-xl tracking-tight leading-tight mb-3">
          {post.title}
        </div>
        <pre className="font-mono text-[11px] leading-relaxed bg-background/60 border border-border/60 rounded-md p-3 overflow-x-auto text-muted-foreground">
          <code className="whitespace-pre">{post.body}</code>
        </pre>
      </div>
    );
  }
  if (post.type === 'quote') {
    return (
      <div className="px-5 py-6 flex-1 relative">
        <div className="absolute top-3 left-4 font-serif text-7xl text-primary/20 leading-none select-none">
          &ldquo;
        </div>
        <p className="relative font-serif italic text-2xl leading-snug tracking-tight">
          {post.body}
        </p>
      </div>
    );
  }
  if (post.type === 'release') {
    return (
      <div className="px-5 py-5 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 bg-primary text-primary-foreground rounded-sm">
            {post.meta}
          </span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            stable
          </span>
        </div>
        <h3 className="font-serif italic text-2xl leading-tight tracking-tight mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
      </div>
    );
  }
  if (post.type === 'thread') {
    return (
      <div className="px-5 py-5 flex-1">
        <h3 className="font-serif italic text-2xl leading-tight tracking-tight mb-3">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-1 flex-1 bg-border first:bg-primary [&:nth-child(2)]:bg-primary"
            />
          ))}
          <span className="ml-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
            {post.meta}
          </span>
        </div>
      </div>
    );
  }
  if (post.type === 'link') {
    return (
      <div className="px-5 py-5 flex-1">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path d="M3 11l8-8M5 3h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          External
        </div>
        <h3 className="font-serif italic text-2xl leading-tight tracking-tight mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
      </div>
    );
  }
  // long
  return (
    <div className={'px-5 py-5 flex-1 flex flex-col ' + (tall ? 'gap-5' : '')}>
      <h3
        className={
          'font-serif italic tracking-tight leading-tight ' +
          (tall ? 'text-3xl md:text-4xl' : 'text-2xl')
        }
      >
        {post.title}
      </h3>
      <p
        className={
          'text-muted-foreground leading-relaxed ' +
          (tall ? 'text-base md:text-lg' : 'text-sm')
        }
      >
        {post.excerpt}
      </p>
      {tall && (
        <div className="mt-auto pt-4">
          <div
            className="h-32 rounded-md bg-gradient-to-br from-primary/15 via-card to-card border border-border relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.4), transparent 45%), radial-gradient(circle at 80% 70%, hsl(280 80% 60% / 0.3), transparent 50%)',
            }} />
            <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/70">
              cover · auto-generated
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CardFooter({ post, arrowRef }: { post: Post; arrowRef: React.RefObject<SVGSVGElement | null> }) {
  return (
    <div className="px-5 py-4 border-t border-border/50 flex items-center justify-between gap-3 mt-auto">
      <div className="flex items-center gap-2.5 min-w-0">
        <Avatar seed={post.handle} />
        <div className="min-w-0">
          <div className="font-serif italic text-sm truncate">{post.author}</div>
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-foreground truncate">
            {post.handle} · {post.read || post.ago}
          </div>
        </div>
      </div>
      <svg
        ref={arrowRef}
        width="16"
        height="16"
        viewBox="0 0 14 14"
        fill="none"
        className="shrink-0 will-change-transform"
      >
        <path
          d="M1 7h11m0 0L7 2m5 5l-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function RowCard({ post, idx }: { post: Post; idx: number }) {
  return (
    <article
      data-feed-card
      className="group flex items-center gap-6 py-6 hover:bg-card/40 transition-colors px-2 -mx-2 rounded-lg"
    >
      <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground w-12 shrink-0">
        {String(idx + 1).padStart(2, '0')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
          <span className="text-primary">●</span>
          <span>{post.topic}</span>
          <span className="text-muted-foreground/40">·</span>
          <span>{post.author}</span>
        </div>
        <h3 className="font-serif italic text-xl md:text-2xl leading-tight tracking-tight truncate">
          {post.title || (post.body && post.body.slice(0, 80) + '…')}
        </h3>
      </div>
      <div className="hidden md:flex items-center gap-6 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
        <span>{post.read || post.ago}</span>
        <span className="text-foreground">{post.match}%</span>
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 group-hover:translate-x-1 transition-transform">
        <path d="M1 7h11m0 0L7 2m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </article>
  );
}

function Avatar({ seed }: { seed: string }) {
  const palette = useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    const a = h % 360;
    const b = (a + 60) % 360;
    return `linear-gradient(135deg, hsl(${a} 70% 55%), hsl(${b} 80% 45%))`;
  }, [seed]);
  return (
    <div className="relative h-8 w-8 rounded-full ring-1 ring-foreground/10 shrink-0" style={{ background: palette }}>
      <div className="absolute inset-0 rounded-full mix-blend-overlay opacity-50 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
    </div>
  );
}
