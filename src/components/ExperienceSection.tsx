'use client';

import { useEffect, useRef } from 'react';
import { EXPERIENCE_PILLARS, SETMORE_BOOK_URL } from '@/data/invictus';
import { gsap } from '@/lib/motion';

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.experience__title-inner', {
        yPercent: 95,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.experience__header',
          start: 'top 88%',
        },
      });

      gsap.from('.experience__blade-reveal', {
        clipPath: 'inset(0% 35% 0% 0%)',
        duration: 1.1,
        ease: 'expo.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.experience__showcase',
          start: 'top 85%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="experience section-carbon"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <div className="experience__header">
          <div className="experience__meta">
            <span className="eyebrow">04 / A EXPERIÊNCIA INVICTUS</span>
            <span className="eyebrow">CUIDADO FACIAL · BARBATERAPIA · TÉCNICA</span>
          </div>

          <h2 id="experience-heading" className="experience__title">
            <span className="line-mask">
              <span className="experience__title-inner">MAIS DO QUE CORTAR.</span>
            </span>
            <span className="line-mask">
              <span className="experience__title-inner experience__title-inner--muted">
                UM RITUAL DE PRECISÃO.
              </span>
            </span>
          </h2>
        </div>

        <div className="experience__showcase">
          <figure className="experience__main-figure">
            <div className="experience__blade-stage">
              <div className="experience__blade-reveal">
                <picture>
                  <source srcSet="/assets/invictus/04-mascara-black.webp" type="image/webp" />
                  <img
                    src="/assets/invictus/04-mascara-black.jpg"
                    alt="Tratamento facial com Máscara Black realizado na Invictus Barbearia em Sacavém"
                    width={2048}
                    height={2048}
                    loading="lazy"
                    className="experience__main-img"
                  />
                </picture>
              </div>
              <span className="experience__blade-line" aria-hidden="true" />
            </div>

            <figcaption className="experience__main-caption">
              <div>
                <span className="eyebrow">PROTOCOLO REAL EM CADEIRA</span>
                <strong>ESFOLIAÇÃO &amp; MÁSCARA BLACK PURIFICANTE</strong>
              </div>
              <a
                href="https://invictusbarbeariasacavem.setmore.com/book?step=staff&products=d8fb3ed2-4a52-49bc-9343-8ebe1bbfa8fa&type=service"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                RESERVAR CORTE + MÁSCARA BLACK (22 €)
              </a>
            </figcaption>
          </figure>

          <div className="experience__side-stack">
            <div className="experience__ritual-card">
              <span className="eyebrow">O MAIS COMPLETO DA CASA</span>
              <h3>COMBO INVICTUS · 1H30</h3>
              <p>
                Corte personalizado aliado à nossa barbaterapia completa: esfoliação preparatória,
                vaporizador facial de ozono, toalha quente aromática, bálsamo after shave,
                finalização com massajador e limpeza de sobrancelha.
              </p>
              <div className="experience__ritual-specs">
                <div>
                  <span>DURAÇÃO</span>
                  <strong>90 MIN</strong>
                </div>
                <div>
                  <span>VALOR OFICIAL</span>
                  <strong>30 €</strong>
                </div>
                <div>
                  <span>OFERTA NO CORTE</span>
                  <strong>LAVAGEM</strong>
                </div>
              </div>
              <a
                href="https://invictusbarbeariasacavem.setmore.com/book?step=staff&products=9ab61c4d-dc7e-42c9-9b02-f615e3fe1b31%7Cb3e79b92-9535-451d-942e-aaeb99b2d6ab&type=service"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-outline--full"
              >
                RESERVAR COMBO INVICTUS
              </a>
            </div>

            <figure className="experience__secondary-figure">
              <picture>
                <source srcSet="/assets/invictus/05-fachada-sacavem.webp" type="image/webp" />
                <img
                  src="/assets/invictus/05-fachada-sacavem.jpg"
                  alt="Fachada real da Invictus Barbearia na Av. São José 26A em Sacavém"
                  width={2048}
                  height={2005}
                  loading="lazy"
                  className="experience__secondary-img"
                />
              </picture>
              <figcaption>
                <span>ESPAÇO FÍSICO · PORTA 26A</span>
                <span>Av. São José, Sacavém</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="experience__pillars">
          {EXPERIENCE_PILLARS.map((pillar) => (
            <article key={pillar.index} className="experience__pillar">
              <span className="experience__pillar-index">{pillar.index}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>

        <div className="experience__cta-strip">
          <p>AGENDA O TEU HORÁRIO ONLINE EM MENOS DE 1 MINUTO.</p>
          <a
            href={SETMORE_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            MARCAR AGORA NO SETMORE
          </a>
        </div>
      </div>
    </section>
  );
}
