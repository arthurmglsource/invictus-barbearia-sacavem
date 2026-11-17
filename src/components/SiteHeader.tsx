'use client';

import { useEffect, useState } from 'react';
import { BUSINESS_INFO, SETMORE_BOOK_URL } from '@/data/invictus';
import { lockScroll } from '@/lib/motion';

const NAV_LINKS = [
  { id: 'topo', index: '01', label: 'INÍCIO' },
  { id: 'galeria', index: '03', label: 'PORTFÓLIO' },
  { id: 'servicos', index: '04', label: 'SERVIÇOS & PREÇOS' },
  { id: 'localizacao', index: '07', label: 'SACAVÉM & CONTACTO' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightSectionActive, setLightSectionActive] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);

      const lightIds = ['manifesto', 'avaliacoes'];
      const isOverLight = lightIds.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 72 && rect.bottom >= 72;
      });
      setLightSectionActive(isOverLight);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const unlock = lockScroll();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      unlock();
    };
  }, [menuOpen]);

  const handleNavigate = (id: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      if (id === 'topo') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const useDarkText = lightSectionActive && !menuOpen;

  return (
    <>
      <header
        className={`site-header ${scrolled ? 'site-header--scrolled' : ''} ${
          useDarkText ? 'site-header--light-surface' : ''
        } ${menuOpen ? 'site-header--menu-open' : ''}`}
      >
        <div className="site-header__inner">
          <div className="site-header__col site-header__col--left">
            <button
              type="button"
              className="burger-btn"
              aria-expanded={menuOpen}
              aria-controls="invictus-navigation-drawer"
              aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className="burger-btn__bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="burger-btn__label">{menuOpen ? 'FECHAR' : 'MENU'}</span>
            </button>

            <nav className="site-header__quick-links" aria-label="Atalhos rápidos">
              <a
                href="#galeria"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('galeria');
                }}
              >
                CORTES
              </a>
              <a
                href="#servicos"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('servicos');
                }}
              >
                SERVIÇOS
              </a>
              <a
                href="#localizacao"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('localizacao');
                }}
              >
                SACAVÉM
              </a>
            </nav>
          </div>

          <div className="site-header__col site-header__col--center">
            <a
              href="#topo"
              className="site-header__logo-link"
              aria-label="Invictus Barbearia Sacavém — Voltar ao início"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('topo');
              }}
            >
              <img
                src={
                  useDarkText
                    ? '/assets/invictus/logo-black.webp'
                    : '/assets/invictus/logo-white.webp'
                }
                alt="Invictus Barbearia"
                width={220}
                height={131}
                className="site-header__logo"
              />
            </a>
          </div>

          <div className="site-header__col site-header__col--right">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="site-header__phone"
              aria-label={`Ligar para ${BUSINESS_INFO.phoneDisplay}`}
            >
              {BUSINESS_INFO.phoneShort}
            </a>
            <a
              href={SETMORE_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__cta"
            >
              AGENDAR
            </a>
          </div>
        </div>
      </header>

      <div
        id="invictus-navigation-drawer"
        className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal Invictus Barbearia"
        aria-hidden={!menuOpen}
      >
        <div className="nav-drawer__backdrop" onClick={() => setMenuOpen(false)} />

        <div className="nav-drawer__panel">
          <div className="nav-drawer__grid">
            <div className="nav-drawer__primary">
              <p className="eyebrow">NAVEGAÇÃO · INVICTUS SACAVÉM</p>
              <ul className="nav-drawer__list">
                {NAV_LINKS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="nav-drawer__link"
                      onClick={() => handleNavigate(item.id)}
                    >
                      <span className="nav-drawer__index">{item.index}</span>
                      <span className="nav-drawer__text">{item.label}</span>
                      <span className="nav-drawer__arrow" aria-hidden="true">
                       
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="nav-drawer__aside">
              <div className="nav-drawer__card">
                <img
                  src="/assets/invictus/emblem-white.webp"
                  alt=""
                  width={76}
                  height={80}
                  className="nav-drawer__emblem"
                />
                <p className="eyebrow">UNIDADE OFICIAL</p>
                <h3>SACAVÉM, PORTUGAL</h3>
                <p className="nav-drawer__address">
                  {BUSINESS_INFO.addressLine1}
                  <br />
                  {BUSINESS_INFO.addressLine2}
                </p>

                <div className="nav-drawer__meta-group">
                  <div>
                    <span className="eyebrow">HORÁRIO</span>
                    <p>Seg — Sáb · 10:00 às 20:00</p>
                    <p className="text-muted">Domingo · Encerrado</p>
                  </div>
                  <div>
                    <span className="eyebrow">CONTACTO DIRETO</span>
                    <p>
                      <a href={BUSINESS_INFO.phoneHref}>{BUSINESS_INFO.phoneDisplay}</a>
                    </p>
                    <p>
                      <a
                        href={BUSINESS_INFO.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {BUSINESS_INFO.instagramHandle}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="nav-drawer__actions">
                  <a
                    href={SETMORE_BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-primary--full"
                  >
                    MARCAR AGORA NO SETMORE
                  </a>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline btn-outline--full"
                  >
                    COMO CHEGAR
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
