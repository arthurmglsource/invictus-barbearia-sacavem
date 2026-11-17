'use client';

import { useEffect, useRef, useState } from 'react';
import { BUSINESS_INFO, SERVICE_CATEGORIES, SETMORE_BOOK_URL } from '@/data/invictus';
import { gsap } from '@/lib/motion';

const CATEGORY_PREVIEW_IMAGE: Record<string, { src: string; caption: string }> = {
  cortes: {
    src: '/assets/invictus/01-fade-crespo.webp',
    caption: 'Corte Masculino · Degradê, Clássico ou Infantil',
  },
  barba: {
    src: '/assets/invictus/03-corte-classico.webp',
    caption: 'Barba & Barbaterapia com Vaporizador e Toalha Quente',
  },
  combos: {
    src: '/assets/invictus/02-desenho-nuca.webp',
    caption: 'Combo Invictus · Corte + Barbaterapia + Sobrancelha',
  },
  tratamentos: {
    src: '/assets/invictus/04-mascara-black.webp',
    caption: 'Esfoliante + Máscara Black · Limpeza Facial Profunda',
  },
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCatId, setActiveCatId] = useState<string>('cortes');
  const [previewKey, setPreviewKey] = useState<string>('cortes');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.services__title-inner', {
        yPercent: 95,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.services__header',
          start: 'top 88%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const visibleCategories =
    activeCatId === 'all'
      ? SERVICE_CATEGORIES
      : SERVICE_CATEGORIES.filter((c) => c.id === activeCatId);

  const previewData = CATEGORY_PREVIEW_IMAGE[previewKey] ?? CATEGORY_PREVIEW_IMAGE.cortes;

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="services section-graphite"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <div className="services__header">
          <div className="services__meta-row">
            <span className="eyebrow">ESCOLHE O TEU SERVIÇO</span>
            <span className="eyebrow"></span>
          </div>

          <div className="services__title-row">
            <h2 id="services-heading" className="services__title">
              <span className="line-mask">
                <span className="services__title-inner">SERVIÇOS.</span>
              </span>
              <span className="line-mask">
                <span className="services__title-inner"></span>
              </span>
            </h2>

            <div className="services__intro">
              <div className="services__filter-bar" role="tablist" aria-label="Filtrar categorias de serviços">
                {SERVICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={activeCatId === cat.id}
                    className={`services__tab ${activeCatId === cat.id ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveCatId(cat.id);
                      setPreviewKey(cat.id);
                    }}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="services__layout">
          <div className="services__menu-column">
            {visibleCategories.map((category) => (
              <div
                key={category.id}
                className="service-group"
                onMouseEnter={() => setPreviewKey(category.id)}
              >
                <div className="service-group__header">
                  <div className="service-group__title-wrap">
                    <span className="service-group__index">{category.index}</span>
                    <h3>{category.title}</h3>
                  </div>

                </div>

                <ul className="service-group__list">
                  {category.items.map((item) => (
                    <li key={item.id} className="service-row">
                      <a
                        href={item.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-row__link"
                        aria-label={`Reservar ${item.name} — Duração ${item.duration} — Preço ${item.price}`}
                      >
                        <div className="service-row__main">
                          <div className="service-row__title-line">
                            <span className="service-row__name">{item.name}</span>
                            {item.badge && (
                              <span className="service-row__badge">{item.badge}</span>
                            )}
                          </div>
                        </div>

                        <div className="service-row__right">
                          <span className="service-row__duration">{item.duration}</span>
                          <span className="service-row__price">{item.price}</span>
                          <span className="service-row__cta">
                            RESERVAR <i aria-hidden="true"></i>
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="services__mobile-policy">
              <span className="eyebrow">Reservas</span>
              <p>{BUSINESS_INFO.bookingPolicy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
