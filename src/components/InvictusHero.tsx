'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion';
import { SETMORE_BOOK_URL } from '@/data/invictus';

const DESKTOP_BASE = '/assets/invictus/hero-sequence/opt-desktop/';
const MOBILE_BASE = '/assets/invictus/hero-sequence/opt-mobile/';
const COUNT = 27;

const frameURL = (index: number, mobile: boolean) =>
  `${mobile ? MOBILE_BASE : DESKTOP_BASE}frame-${String(index).padStart(3, '0')}.webp`;

export default function InvictusHero({ stamp }: { stamp: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = root.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const poster = section.querySelector<HTMLImageElement>('.iv-sequence-poster')!;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = matchMedia('(max-width: 768px)');

    let disposed = false;
    let requested = 0;
    let drawn = -1;
    let activeMobile = mobileQuery.matches;
    const frames = new Map<number, HTMLImageElement>();
    const mm = gsap.matchMedia();

    const reduced = () => media.matches || new URLSearchParams(location.search).get('motion') === 'reduce';

    const draw = (force = false) => {
      const target = reduced() ? COUNT - 1 : requested;
      // Never clear a decoded image just because a future frame is still loading.
      const available = frames.has(target) ? target : drawn;
      const source = frames.get(available);
      if (!source || (available === drawn && !force)) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2.5);
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      const desktop = !mobileQuery.matches;
      const scale = desktop
        ? Math.min((section.clientWidth * 0.44) / source.naturalWidth, height / source.naturalHeight)
        : Math.min(width / source.naturalWidth, height / source.naturalHeight);
      const w = source.naturalWidth * scale;
      const h = source.naturalHeight * scale;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(source, (width - w) / 2, height - h, w, h);
      drawn = available;
      section.dataset.frame = String(available);
      section.dataset.decodedFrames = String(frames.size);
      poster.style.visibility = 'hidden';
    };

    const load = async (index: number, isMobile = activeMobile) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = frameURL(index, isMobile);
      await image.decode();
      if (disposed || isMobile !== activeMobile) return;
      frames.set(index, image);
      section.dataset.decodedFrames = String(frames.size);
      draw();
    };

    const observer = new ResizeObserver(() => {
      const nextMobile = mobileQuery.matches;
      if (nextMobile !== activeMobile) {
        activeMobile = nextMobile;
        frames.clear();
        drawn = -1;
        void load(reduced() ? COUNT - 1 : requested, activeMobile).catch(() => undefined);
      } else {
        draw(true);
      }
    });
    observer.observe(canvas);

    const initial = reduced() ? COUNT - 1 : 0;
    if (reduced()) {
      const desktopSource = section.querySelector<HTMLSourceElement>('.iv-sequence-poster-desktop');
      const mobileSource = section.querySelector<HTMLSourceElement>('.iv-sequence-poster-mobile');
      if (desktopSource) desktopSource.srcset = frameURL(COUNT - 1, false);
      if (mobileSource) mobileSource.srcset = frameURL(COUNT - 1, true);
      poster.src = frameURL(COUNT - 1, activeMobile);
    }

    // Register hero pin synchronously so downstream ScrollTriggers & hash anchors compute exact offsets on first layout.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (reduced()) return;
      const state = { frame: 0 };
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          refreshPriority: 10,
          scrub: 0.35,
          invalidateOnRefresh: true,
          onLeave: () => {
            requested = COUNT - 1;
            draw();
          },
          onEnterBack: () => {
            requested = Math.round(state.frame);
            draw();
          },
          onLeaveBack: () => {
            requested = 0;
            draw();
          },
        },
      });
      timeline
        .to(state, {
          frame: COUNT - 1,
          duration: 2.6,
          ease: 'none',
          onUpdate: () => {
            requested = Math.round(state.frame);
            draw();
          },
        })
        .to({}, { duration: 0.4 });
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      return () => timeline.revert();
    });

    load(initial, activeMobile)
      .then(() => {
        if (disposed) return;
        requested = initial;
        draw(true);

        if (reduced()) return;

        // Progressive non-blocking background queue after initial paint:
        // prioritize final frame and evenly spaced keyframes so fast scroll stays responsive.
        const keyframes = [COUNT - 1, 6, 13, 20, 3, 9, 16, 23];
        const rest = Array.from({ length: COUNT }, (_, i) => i).filter(
          (i) => i !== initial && !keyframes.includes(i)
        );
        const queue = [...keyframes.filter((i) => i !== initial), ...rest];
        const startProgressive = () => {
          const worker = async () => {
            while (queue.length && !disposed) {
              const next = queue.shift()!;
              try {
                await load(next, activeMobile);
              } catch {
                section.dataset.sequenceStatus = 'loading-retry';
              }
            }
          };
          void Promise.all(Array.from({ length: 3 }, worker));
        };

        if ('requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(startProgressive, { timeout: 250 });
        } else {
          setTimeout(startProgressive, 32);
        }
      })
      .catch(() => {
        section.dataset.sequenceStatus = 'poster';
      });

    const change = () => {
      requested = reduced() ? COUNT - 1 : 0;
      void load(requested, activeMobile).catch(() => undefined);
    };
    media.addEventListener('change', change);

    return () => {
      disposed = true;
      observer.disconnect();
      mm.revert();
      media.removeEventListener('change', change);
    };
  }, []);

  return (
    <section
      ref={root}
      className="iv-hero iv-hero-scroll iv-hero-sequence"
      id="topo"
      aria-label="Vem para a Invictus — transformação do corte"
      data-frame="0"
    >
      <div className="iv-sequence-stage">
        <picture>
          <source
            className="iv-sequence-poster-mobile"
            media="(max-width: 768px)"
            srcSet={frameURL(0, true)}
          />
          <source
            className="iv-sequence-poster-desktop"
            media="(min-width: 769px)"
            srcSet={frameURL(0, false)}
          />
          <img
            className="iv-sequence-poster"
            src={frameURL(0, false)}
            alt="Personagem Invictus na cadeira de barbearia"
            width={1121}
            height={1403}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <canvas
          ref={canvasRef}
          className="iv-sequence-canvas"
          role="img"
          aria-label="O mesmo personagem gira com o corpo e a capa numa cadeira e revela o corte acabado"
        />
      </div>
      {stamp}
      <div className="iv-hero-heading-group">
        <h1 className="iv-hero-title">
          <span className="iv-hero-title-line">Vem para</span>
          <span className="iv-hero-title-line iv-hero-title-brand">INVICTUS</span>
        </h1>
        <a
          className="iv-book iv-hero-cta"
          href={SETMORE_BOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          MARCAR AGORA
        </a>
      </div>
      <span className="iv-scroll-cue" aria-hidden="true">
        <span>↓</span>
      </span>
    </section>
  );
}
