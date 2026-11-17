'use client';

import { useEffect, useRef } from 'react';
import { BUSINESS_INFO, SETMORE_BOOK_URL } from '@/data/invictus';
import { gsap } from '@/lib/motion';

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.manifesto__razor-rule', {
        scaleX: 0,
        duration: 1.0,
        ease: 'expo.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 86%',
        },
      });

      gsap.from('.manifesto__line-inner', {
        yPercent: 95,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.manifesto__headline',
          start: 'top 88%',
        },
      });

      gsap.from('.manifesto__photo-reveal', {
        clipPath: 'inset(18% 0% 0% 0%)',
        duration: 1.0,
        stagger: 0.14,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.manifesto__visual-grid',
          start: 'top 88%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="manifesto section-bone"
      aria-labelledby="manifesto-title"
    >
      <div className="container">
        <div className="manifesto__top-meta">
          <span className="eyebrow">01 / MANIFESTO DE MARCA</span>
          <span className="eyebrow">AV. SÃO JOSÉ 26A · SACAVÉM</span>
        </div>
        <div className="manifesto__razor-rule" aria-hidden="true" />

        <div className="manifesto__layout">
          <div className="manifesto__brand-col">
            <img
              src="/assets/invictus/logo-black.webp"
              alt="Logótipo Oficial Invictus Barbearia"
              width={240}
              height={143}
              className="manifesto__logo"
              loading="lazy"
            />
            <p className="manifesto__stamp">
              TRADIÇÃO DE LÂMINA.
              <br />
              DIREÇÃO CONTEMPORÂNEA.
            </p>
          </div>

          <div className="manifesto__main-col">
            <h2 id="manifesto-title" className="manifesto__headline">
              <span className="line-mask">
                <span className="manifesto__line-inner">O TEU ESTILO.</span>
              </span>
              <span className="line-mask">
                <span className="manifesto__line-inner">A NOSSA</span>
              </span>
              <span className="line-mask">
                <span className="manifesto__line-inner manifesto__line-inner--accent">
                  ASSINATURA.
                </span>
              </span>
            </h2>

            <div className="manifesto__copy-grid">
              <div className="manifesto__copy-block">
                <p className="manifesto__lead">
                  Na Invictus Barbearia em Sacavém, cada corte é tratado como um exercício de
                  proporção, leitura de rosto e identidade pessoal.
                </p>
              </div>
              <div className="manifesto__copy-block">
                <p className="manifesto__body">
                  Combinamos a disciplina clássica da tesoura e da toalha quente com a linguagem
                  atual do degradê, do desenho à navalha e do cuidado masculino. Sem pressa
                  artificial, sem fórmulas padronizadas — apenas técnica consistente e respeito por
                  quem se senta na cadeira.
                </p>
                <div className="manifesto__inline-actions">
                  <a
                    href={SETMORE_BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark"
                  >
                    AGENDAR HORÁRIO
                  </a>
                  <a href="#servicos" className="link-underline-dark">
                    EXPLORAR TABELA DE PREÇOS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="manifesto__visual-grid">
          <figure className="manifesto__figure manifesto__figure--primary">
            <div className="manifesto__photo-reveal">
              <picture>
                <source srcSet="/assets/invictus/02-desenho-nuca.webp" type="image/webp" />
                <img
                  src="/assets/invictus/02-desenho-nuca.jpg"
                  alt="Corte e desenho artístico na nuca realizado na Invictus Barbearia em Sacavém"
                  width={1152}
                  height={2048}
                  loading="lazy"
                  className="manifesto__img"
                />
              </picture>
            </div>
            <figcaption className="manifesto__caption">
              <span>FIG. 01 — CULTURA & TRAÇO</span>
              <span>Execução real em frente à unidade de Sacavém</span>
            </figcaption>
          </figure>

          <figure className="manifesto__figure manifesto__figure--secondary">
            <div className="manifesto__photo-reveal">
              <picture>
                <source srcSet="/assets/invictus/07-comunidade-evento.webp" type="image/webp" />
                <img
                  src="/assets/invictus/07-comunidade-evento.jpg"
                  alt="Presença da marca Invictus Barbearia em evento e cultura urbana"
                  width={900}
                  height={1600}
                  loading="lazy"
                  className="manifesto__img"
                />
              </picture>
            </div>
            <figcaption className="manifesto__caption">
              <span>FIG. 02 — COMUNIDADE & PRESENÇA</span>
              <span>Identidade Invictus dentro e fora da barbearia</span>
            </figcaption>
          </figure>

          <div className="manifesto__spec-box">
            <div className="manifesto__spec-item">
              <span className="eyebrow">CLASSIFICAÇÃO VERIFICADA</span>
              <strong>{BUSINESS_INFO.ratingScore} / 5.0</strong>
              <p>{BUSINESS_INFO.ratingCount} avaliações reais registadas via Google / Setmore</p>
            </div>
            <div className="manifesto__spec-item">
              <span className="eyebrow">LOCALIZAÇÃO</span>
              <strong>SACAVÉM · 26A</strong>
              <p>Av. São José, 26A · Segunda a Sábado, das 10:00 às 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
