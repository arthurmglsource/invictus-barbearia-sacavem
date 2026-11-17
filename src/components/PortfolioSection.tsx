'use client';

import { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_WORKS, SETMORE_BOOK_URL, type PortfolioWork } from '@/data/invictus';
import { gsap, lockScroll } from '@/lib/motion';

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [selectedWork, setSelectedWork] = useState<PortfolioWork | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.portfolio__title-inner', {
        yPercent: 95,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.portfolio__header',
          start: 'top 88%',
        },
      });

      gsap.utils.toArray<HTMLElement>('.portfolio-card').forEach((card, i) => {
        const media = card.querySelector('.portfolio-card__media');
        const img = card.querySelector('.portfolio-card__img');

        if (media) {
          gsap.from(media, {
            clipPath: 'inset(10% 0% 10% 0%)',
            duration: 0.9,
            delay: (i % 2) * 0.08,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          });
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.07, yPercent: -3 },
            {
              scale: 1.0,
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedWork) return;
    const unlock = lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedWork(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      unlock();
    };
  }, [selectedWork]);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="portfolio section-carbon"
      aria-labelledby="portfolio-heading"
    >
      <div className="container">
        <div className="portfolio__header">
          <div className="portfolio__header-meta">
            <span className="eyebrow">INVICTUS · SACAVÉM</span>
            <span className="eyebrow"></span>
          </div>

          <div className="portfolio__header-row">
            <h2 id="portfolio-heading" className="portfolio__title">
              <span className="line-mask">
                <span className="portfolio__title-inner">O TEU</span>
              </span>
              <span className="line-mask">
                <span className="portfolio__title-inner">ESTILO.</span>
              </span>
            </h2>

            <div className="portfolio__header-aside">
              <a
                href={SETMORE_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                MARCAR O MEU CORTE
              </a>
            </div>
          </div>
        </div>

        <div ref={railRef} className="portfolio__editorial-grid">
          {PORTFOLIO_WORKS.map((work, index) => (
            <article
              key={work.id}
              className={`portfolio-card portfolio-card--${index + 1} portfolio-card--${work.aspect}`}
            >
              <div
                className="portfolio-card__media"
                role="button"
                tabIndex={0}
                aria-label={`Ampliar fotografia: ${work.title}`}
                onClick={() => setSelectedWork(work)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedWork(work);
                  }
                }}
              >
                <picture>
                  <source srcSet={work.image} type="image/webp" />
                  <img
                    src={work.imageJpg}
                    alt={`${work.title} — ${work.subtitle}`}
                    className="portfolio-card__img"
                    loading="lazy"
                  />
                </picture>
                <span className="portfolio-card__zoom-pill">VER DETALHE +</span>
              </div>

              <div className="portfolio-card__body">
                <div className="portfolio-card__heading-row">
                  <h3>{work.title}</h3>
                  <span className="portfolio-card__price-tag">
                    {work.serviceName} · <strong>{work.servicePrice}</strong>
                  </span>
                </div>




              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedWork && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografia ampliada: ${selectedWork.title}`}
        >
          <div className="lightbox__backdrop" onClick={() => setSelectedWork(null)} />
          <div className="lightbox__dialog">
            <div className="lightbox__top">
              <span className="eyebrow">
                {selectedWork.index} / 04 · {selectedWork.category}
              </span>
              <button
                type="button"
                className="lightbox__close"
                onClick={() => setSelectedWork(null)}
              >
                FECHAR [ESC]
              </button>
            </div>
            <div className="lightbox__content">
              <div className="lightbox__img-wrap">
                <img
                  src={selectedWork.imageJpg}
                  alt={selectedWork.title}
                  className="lightbox__img"
                />
              </div>
              <div className="lightbox__info">
                <h3>{selectedWork.title}</h3>
                <p className="lightbox__sub">{selectedWork.subtitle}</p>
                <p className="lightbox__desc">{selectedWork.description}</p>
                <div className="lightbox__service-box">
                  <span className="eyebrow">SERVIÇO ASSOCIADO NO SETMORE</span>
                  <strong>
                    {selectedWork.serviceName} — {selectedWork.servicePrice}
                  </strong>
                </div>
                <a
                  href={selectedWork.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-primary--full"
                >
                  MARCAR {selectedWork.serviceName.toUpperCase()} AGORA
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
