'use client';

import { useEffect, useRef, useState } from 'react';
import { BUSINESS_INFO, HERO_FRAMES, SETMORE_BOOK_URL } from '@/data/invictus';
import { gsap } from '@/lib/motion';

interface HeroSectionProps {
  ready: boolean;
}

export default function HeroSection({ ready }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (mediaWrapRef.current) {
        gsap.to(mediaWrapRef.current, {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [ready]);

  const activeFrame = HERO_FRAMES[activeIndex];

  return (
    <section
      id="topo"
      ref={sectionRef}
      className={`hero ${ready ? 'hero--ready' : ''}`}
      aria-label="Invictus Barbearia — Mais que uma barbearia"
    >
      <div ref={mediaWrapRef} className="hero__media-stage">
        {HERO_FRAMES.map((frame, index) => {
          const isCurrent = index === activeIndex;
          return (
            <picture
              key={frame.id}
              className={`hero__picture ${isCurrent ? 'hero__picture--active hero__bg-active' : ''}`}
              aria-hidden={!isCurrent}
            >
              <source
                media="(max-width: 767px)"
                srcSet={frame.mobileWebp}
                type="image/webp"
              />
              <source
                media="(max-width: 767px)"
                srcSet={frame.mobileJpg}
                type="image/jpeg"
              />
              <source
                media="(min-width: 768px)"
                srcSet={frame.desktopWebp}
                type="image/webp"
              />
              <img
                src={frame.desktopJpg}
                alt={frame.alt}
                className="hero__img"
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
          );
        })}
        <div className="hero__vignette" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <div className="hero__center-stack">
          <h1 className="hero__headline">
            <span className="hero__title-line">
              <span className="hero__title-line-inner">MAIS QUE UMA</span>
            </span>
            <span className="hero__title-line">
              <span className="hero__title-line-inner">BARBEARIA.</span>
            </span>
          </h1>

          <p className="hero__subheadline">{BUSINESS_INFO.subheadline}</p>

          <div className="hero__cta-wrap">
            <a
              href={SETMORE_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta-btn"
            >
              <span>MARCAR AGORA</span>
            </a>
          </div>
        </div>

        <div className="hero__bottom-bar">
          <div
            className="hero__frame-switcher"
            role="group"
            aria-label="Selecionar fotografia real da Invictus"
          >
            <div className="hero__frame-buttons">
              {HERO_FRAMES.map((frame, idx) => (
                <button
                  key={frame.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`hero__frame-btn ${idx === activeIndex ? 'is-active' : ''}`}
                  aria-pressed={idx === activeIndex}
                >
                  <span className="hero__frame-code">{frame.code}</span>
                  <span className="hero__frame-label">{frame.label}</span>
                </button>
              ))}
            </div>
            <p className="hero__frame-caption">
              <span>FOTOGRAFIA REAL INVICTUS SACAVÉM</span>
              <span className="hero__dot">·</span>
              <span>{activeFrame.caption}</span>
            </p>
          </div>

          <a
            href={SETMORE_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__floating-reserve"
            aria-label="Reservar horário na Invictus Barbearia Sacavém"
          >
            <span className="hero__reserve-dot" aria-hidden="true" />
            <span>
              <strong>RESERVAR</strong>
              <small>SACAVÉM · {BUSINESS_INFO.ratingScore}★</small>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
