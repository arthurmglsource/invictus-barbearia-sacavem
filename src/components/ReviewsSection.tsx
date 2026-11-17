'use client';

import { useEffect, useRef } from 'react';
import { BUSINESS_INFO, SETMORE_BOOK_URL, SETMORE_REVIEWS_URL, VERIFIED_REVIEWS } from '@/data/invictus';
import { gsap } from '@/lib/motion';

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.reviews__title-inner', {
        yPercent: 95,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.reviews__header',
          start: 'top 88%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="avaliacoes"
      ref={sectionRef}
      className="reviews section-bone"
      aria-labelledby="reviews-heading"
    >
      <div className="container">
        <div className="reviews__header">
          <div className="reviews__meta">
            <span className="eyebrow">05 / PROVA SOCIAL VERIFICADA</span>
            <span className="eyebrow">FONTE: GOOGLE &amp; SETMORE OFICIAL · SACAVÉM</span>
          </div>

          <div className="reviews__hero-row">
            <h2 id="reviews-heading" className="reviews__title">
              <span className="line-mask">
                <span className="reviews__title-inner">CONFIANÇA</span>
              </span>
              <span className="line-mask">
                <span className="reviews__title-inner">COMPROVADA.</span>
              </span>
            </h2>

            <div className="reviews__score-panel">
              <div className="reviews__big-score">
                <strong>{BUSINESS_INFO.ratingScore}</strong>
                <div>
                  <span className="reviews__stars" aria-label="4.9 de 5 estrelas">
                    ★★★★★
                  </span>
                  <p>Baseado em {BUSINESS_INFO.ratingCount} avaliações reais verificadas</p>
                </div>
              </div>

              <div className="reviews__bars" aria-label="Distribuição de classificações">
                <div className="reviews__bar-row">
                  <span>5 ★</span>
                  <div className="reviews__bar-track">
                    <div className="reviews__bar-fill" style={{ width: '96%' }} />
                  </div>
                  <span>{BUSINESS_INFO.ratingBreakdown.fiveStar}</span>
                </div>
                <div className="reviews__bar-row">
                  <span>4 ★</span>
                  <div className="reviews__bar-track">
                    <div className="reviews__bar-fill" style={{ width: '3%' }} />
                  </div>
                  <span>{BUSINESS_INFO.ratingBreakdown.fourStar}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews__grid">
          {VERIFIED_REVIEWS.map((review, idx) => (
            <article key={review.id} className="review-card">
              <div className="review-card__top">
                <span className="review-card__index">0{idx + 1}</span>
                <span className="review-card__stars" aria-label={`${review.rating} estrelas`}>
                  {'★'.repeat(review.rating)}
                </span>
              </div>

              <blockquote className="review-card__quote">&ldquo;{review.quote}&rdquo;</blockquote>

              <footer className="review-card__footer">
                <strong>{review.author}</strong>
                <span>{review.source}</span>
              </footer>
            </article>
          ))}
        </div>

        <div className="reviews__bottom-bar">
          <p className="reviews__verification-note">{BUSINESS_INFO.verificationNote}</p>
          <div className="reviews__actions">
            <a
              href={SETMORE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark"
            >
              VER TODAS AS {BUSINESS_INFO.ratingCount} AVALIAÇÕES NO SETMORE
            </a>
            <a
              href={SETMORE_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark"
            >
              MARCAR AGORA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
