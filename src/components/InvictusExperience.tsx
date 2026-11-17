'use client';

import { useEffect, useRef, useState } from 'react';
import InvictusHero from './InvictusHero';
import { gsap, ScrollTrigger, lockScroll } from '@/lib/motion';
import { BUSINESS_INFO as B, SERVICE_CATEGORIES, VERIFIED_REVIEWS, SETMORE_URL, GOOGLE_MAPS_URL } from '@/data/invictus';

const asset = (file: string) => `/assets/invictus/${file}.webp`;
// Each photographic original has one section owner. Hero crops are reserved in InvictusHero.
const photos = [
  ['corte-azul', 'Cor azul e corte curto'],
  ['corte-desenho-lateral', 'Desenho à navalha na lateral'],
  ['corte-platinado', 'Corte curto platinado'],
  ['corte-infantil-penteado', 'Corte infantil com penteado lateral'],
  ['corte-texturizado', 'Corte texturizado com degradê'],
  ['02-desenho-nuca', 'Desenho à navalha na nuca'],
];
const tiles = photos.map((_, index) => index);
const guides = [
  { title: 'O degradê certo para ti.', body: 'Um degradê baixo mantém uma transição discreta. Um degradê médio ou alto dá mais contraste ao corte. Na cadeira, ajustamos a altura ao teu cabelo e ao formato do rosto.' },
  { title: 'A tua barba. Bem cuidada.', body: 'Lava a barba com um produto próprio, seca sem esfregar e hidrata a pele por baixo. Entre marcações, evita redesenhar os contornos: pequenos retoques podem alterar a simetria.' },
  { title: 'Um momento para abrandar.', body: 'A barbaterapia combina cuidado da pele, vapor e toalha quente. Para uma sessão completa, escolhe o Combo Invictus: corte, barbaterapia e sobrancelha, em 90 minutos.' },
];
function Book({ className = '', children = 'MARCAR AGORA' }: { className?: string; children?: React.ReactNode ;}) {
  return <a className={`iv-book ${className}`} href={SETMORE_URL} target="_blank" rel="noopener noreferrer">{children}</a>;
}
function Stamp({ className = '' }: { className?: string }) {
  const ring = useRef<SVGSVGElement>(null);
  const hovered = useRef(false);
  const focused = useRef(false);
  const touched = useRef(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, previous = 0, angle = 0, speed = 360 / 35;
    const tick = (now: number) => {
      const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
      previous = now;
      const reduced = media.matches || new URLSearchParams(window.location.search).get('motion') === 'reduce';
      const target = hovered.current || focused.current || now < touched.current ? 360 / 110 : 360 / 35;
      speed += (target - speed) * (1 - Math.exp(-dt * 5));
      if (!reduced) angle = (angle + speed * dt) % 360;
      if (ring.current) ring.current.style.transform = `rotate(${reduced ? 0 : angle}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <a className={`iv-stamp ${className}`} href={SETMORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Marcar agora na Invictus"
    onPointerEnter={e => { if (e.pointerType !== 'touch') hovered.current = true; }}
    onPointerLeave={() => { hovered.current = false; }}
    onFocus={() => { focused.current = true; }} onBlur={() => { focused.current = false; }}
    onPointerDown={() => { touched.current = performance.now() + 350; }}>
    <svg ref={ring} viewBox="0 0 160 160" aria-hidden="true"><defs><path id={`ring-${className}`} d="M 80,80 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" /></defs><text><textPath href={`#ring-${className}`} textLength="370">MARCA O TEU CORTE · INVICTUS · SACAVÉM · </textPath></text></svg>
    <img className="iv-stamp-symbol" src="/assets/invictus/emblem-black.png" alt="" aria-hidden="true" />
  </a>;
}
export default function InvictusExperience() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState(0);
  const [review, setReview] = useState(0);
  const [modal, setModal] = useState<{ image?: string; title: string; body?: string ;} | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if(!menu && !modal) return;
    const unlock = lockScroll();
    const previous = document.activeElement as HTMLElement;
    const onKey = (e: KeyboardEvent) => {
      if(e.key === 'Escape') { setMenu(false); setModal(null); }
      if(e.key === 'Tab') {
        const panel = document.querySelector(menu ? '.iv-nav' : '.iv-dialog');
        const nodes = panel?.querySelectorAll<HTMLElement>('a, button');
        if(!nodes?.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if(e.shiftKey && (document.activeElement === first || document.activeElement === menuRef.current)) { e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    if(modal) closeRef.current?.focus();
    else document.querySelector<HTMLElement>('.iv-nav a')?.focus();
    document.addEventListener('keydown', onKey);
    return () => { unlock(); document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [menu, modal]);
  useEffect(() => {
    // The query switch exercises the same static layout during accessibility QA.
    const forceReduced = new URLSearchParams(window.location.search).get('motion') === 'reduce';
    if(forceReduced) { root.current!.dataset.motion = 'reduce'; return; }
    const mm = gsap.matchMedia();
    mm.add({ desktop: '(min-width: 769px)', mobile: '(max-width: 768px)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
      if(!context.conditions?.motion) return;
      const mobile = !!context.conditions.mobile;
      const scope = root.current!;
      const q = gsap.utils.selector(scope);
      const gallery = q('.iv-gallery')[0] as HTMLElement;
      const images = q('.iv-tile') as HTMLElement[];
      const grid = q('.iv-mosaic')[0] as HTMLElement;
      const g = gsap.timeline({ scrollTrigger: { trigger: gallery, start: 'top top', end: mobile ? '+=300%' : '+=600%', pin: true, refreshPriority: 0, scrub: 1, invalidateOnRefresh: true } });
      const centerX = (el: HTMLElement) => gallery.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2 + grid.offsetLeft);
      const startY = (el: HTMLElement) => gallery.clientHeight - el.offsetTop - grid.offsetTop;
      images.forEach((el, i) => {
        g.fromTo(el, { x: () => centerX(el), y: () => startY(el), autoAlpha: 0, scale: mobile ? 1.6 : 1.1 }, { autoAlpha: 1, duration: .15 }, i < 3 ? .3 + i * .7 : 2.6);
        if(i < 3) g.to(el, { y: () => -el.offsetTop - grid.offsetTop - gallery.clientHeight * .25, duration: 1.4, ease: 'slow(0.7,0.7,false)' }, .4 + i * .7);
        g.to(el, { x: 0, y: 0, scale: 1, duration: 1.6, ease: 'slow(0.7,0.7,false)' }, 2.8 + i * .015);
      });
      g.to(q('.iv-gallery-heading'), { opacity: 0, duration: .4 }, 2.6)
        .to(q('.iv-gallery-shade'), { opacity: 1, duration: .5 }, 4.7)
        .fromTo(q('.iv-testimonials'), { opacity: 0, y: 30, visibility: 'hidden' }, { opacity: 1, y: 0, visibility: 'visible', duration: .6 }, 4.9).to({}, { duration: .6 });
      gsap.utils.toArray<HTMLElement>('.iv-reveal', scope).forEach(el => gsap.from(el, { opacity: 0, y: 50, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none reverse' } }));
      const team = gsap.timeline({scrollTrigger:{trigger:q('.iv-team')[0],start:'top top',end:'bottom top',scrub:true,invalidateOnRefresh:true}});
      team.fromTo(q('.iv-interior-photo'),{yPercent:-3},{yPercent:3,ease:'none'},0);
      gsap.fromTo(q('.iv-interior-photo'),{scale:1.035},{scale:1,ease:'none',scrollTrigger:{trigger:q('.iv-interior')[0],start:'top bottom',end:'top 60%',scrub:true}});
      gsap.fromTo(q('.iv-services-copy'),{y:20},{y:0,ease:'none',scrollTrigger:{trigger:q('.iv-services')[0],start:'top bottom',end:'top 65%',scrub:true}});

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      ScrollTrigger.refresh();
      return () => window.removeEventListener('load', refresh);
    }, root);
    return () => mm.revert();
  }, []);
  useEffect(() => {
    const updateHeader = () => {
      const hero = document.getElementById('topo');
      if (hero && hero.getBoundingClientRect().bottom > 100) return;
      const surface = document.elementFromPoint(window.innerWidth / 2, window.innerWidth <= 768 ? 72 : 108)?.closest('section');
      document.documentElement.dataset.ivPhotoHeader = String(surface?.id === 'experiencia');
      const galleryDimmed = surface?.id === 'galeria' && Number(getComputedStyle(document.querySelector('.iv-gallery-shade')!).opacity) > .4;
      const light = !galleryDimmed && ['localizacao','galeria','servicos'].includes(surface?.id || '');
      document.documentElement.style.setProperty('--iv-header-ink', light ? '#0b0b0b' : '#f3f1eb');
      document.documentElement.style.setProperty('--iv-header-light', light ? '0' : '1');
    };
    window.addEventListener('scroll',updateHeader,{passive:true});
    return ()=>window.removeEventListener('scroll',updateHeader);
  },[]);
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const id = event.currentTarget.hash.slice(1);
    setMenu(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) window.scrollTo({top:window.scrollY + target.getBoundingClientRect().top - (window.innerWidth <= 768 ? 84 : 120),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    });
  };
  return <div ref={root} className="iv-site">
    <a href="#servicos" className="iv-skip">Saltar para os serviços</a>
    <header className="iv-header">
      <a href="#topo" aria-label="Invictus — início" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><img className="iv-logo" src={asset('logo-white')} alt="Invictus Barbearia" width="190" height="112" /></a>
      <a className="iv-social" href={B.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Invictus"><svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
      <nav className={`iv-nav ${menu ? 'is-open' : ''}`} aria-label="Navegação principal">
        <a href="#servicos" onClick={navigate}>SERVIÇOS</a><a href="#experiencia" onClick={navigate}>A INVICTUS</a><a href="#galeria" onClick={navigate}>OS NOSSOS CORTES</a><a href="#dicas" onClick={navigate}>DICAS & CUIDADOS</a><a href="#localizacao" onClick={navigate}>SACAVÉM</a><Book className="iv-mobile-book" />
      </nav>
      <Book className="iv-header-book" />
      <button ref={menuRef} className="iv-menu" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? '×' : '☰'}</button>
    </header>
    <main>
      <InvictusHero stamp={<Stamp className="hero" />} />
      <section className="iv-location" id="localizacao" aria-labelledby="iv-location-title">
        <div className="iv-location-content iv-reveal"><span className="iv-eyebrow">INVICTUS BARBEARIA</span><h2 id="iv-location-title">O TEU PRÓXIMO<br />CORTE É <em>EM SACAVÉM.</em></h2><p>{B.addressLine1}<br />Segunda a sábado · 10:00 — 20:00</p><div className="iv-location-actions"><a className="iv-button iv-button--outline" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">COMO CHEGAR</a><Book className="iv-button" /></div><a className="iv-location-phone" href={B.phoneHref}>{B.phoneDisplay}</a></div>
      </section>
      <section className="iv-gallery" id="galeria" aria-labelledby="iv-gallery-title">
        <h2 className="iv-gallery-heading" id="iv-gallery-title">O TEU ESTILO.<br /><span className="iv-outline">A NOSSA</span><br /><em>ASSINATURA.</em></h2>
        <div className="iv-mosaic">{tiles.map((n, i) => <button key={i} className={`iv-tile iv-tile--${i}`} aria-label={`Ampliar fotografia: ${photos[n][1]}`} onClick={() => setModal({ image: asset(photos[n][0]), title: photos[n][1] })}><img src={asset(photos[n][0])} alt={photos[n][1]} loading="eager" /></button>)}</div>
        <div className="iv-gallery-shade" />
        <div className="iv-testimonials"><span className="iv-stars" aria-label="5 estrelas">★★★★★</span><blockquote key={review}>“{VERIFIED_REVIEWS[review].quote}”</blockquote><p>{VERIFIED_REVIEWS[review].author}</p><div className="iv-review-dots" aria-label="Selecionar avaliação">{VERIFIED_REVIEWS.map((r, i) => <button key={r.id} onClick={() => setReview(i)} aria-label={`Avaliação de ${r.author}`} aria-pressed={review === i}>{r.author.split(' ').map(w => w[0]).slice(0, 2).join('')}</button>)}</div><span className="iv-rating">{B.ratingScore} / 5 · {B.ratingCount} avaliações</span></div>
      </section>
      <section className="iv-team iv-interior" id="experiencia" aria-label="A Invictus — interior da barbearia de Sacavém">
        <img className="iv-interior-photo" src="/assets/invictus/interior-sacavem.webp" alt="Interior da Invictus de Sacavém, com barbeiro, cliente e polo branco com o logótipo da marca" width="2560" height="1706" />
      </section>
      <section className="iv-services" id="servicos" aria-labelledby="iv-services-title">
        <div className="iv-services-copy"><h2 id="iv-services-title"><em>INVICTUS</em><br />SERVIÇOS.</h2><div className="iv-accordion">{SERVICE_CATEGORIES.map((cat, i) => <div className={`iv-accordion-item ${category === i ? 'is-active' : ''}`} key={cat.id}><h3><button aria-expanded={category === i} aria-controls={`iv-panel-${i}`} id={`iv-trigger-${i}`} onClick={() => setCategory(i)}>{cat.title}<span aria-hidden="true">{category === i ? '−' : '+'}</span></button></h3><div id={`iv-panel-${i}`} className="iv-accordion-panel" role="region" aria-labelledby={`iv-trigger-${i}`} hidden={category !== i}><p>{cat.subtitle}</p><ul>{cat.items.map(item => <li key={item.id}><a className="iv-service-booking" href={item.bookingUrl} target="_blank" rel="noopener noreferrer"><span className="iv-service-label">{item.name}<small>{item.duration}</small></span><span className="iv-service-action"><strong>{item.price}</strong><span className="iv-service-mark">Marcar</span></span></a></li>)}</ul></div></div>)}</div><Book /><details className="iv-policy"><summary>Política de reservas</summary><p>{B.bookingPolicy}</p></details></div>
      </section>
      <section className="iv-guides iv-texture" id="dicas" aria-labelledby="iv-guides-title"><div className="iv-guides-header iv-reveal"><h2 id="iv-guides-title">DICAS <em>&</em> CUIDADOS.</h2><a href={B.instagramUrl} target="_blank" rel="noopener noreferrer" className="iv-book">SEGUE A INVICTUS</a></div><div className="iv-guide-grid">{guides.map(g => <button key={g.title} className="iv-guide iv-reveal" onClick={() => setModal({ title: g.title, body: g.body })}><h3>{g.title}</h3><span>LER DICA </span></button>)}</div></section>
    </main>
    <footer className="iv-footer"><img className="iv-footer-bg" src={asset('fachada-sacavem-oficial')} alt="" loading="lazy" /><div className="iv-footer-top"><h2><span className="iv-outline">Vem para</span><br />INVICTUS</h2><Stamp className="footer" /></div><div className="iv-footer-bottom"><p>{B.addressLine1} · Sacavém<br /><a href={B.phoneHref}>{B.phoneDisplay}</a> · <a href={B.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a></p><p>© {new Date().getFullYear()} Invictus Barbearia</p><a href={`mailto:${B.email}`}>Fala connosco</a></div></footer>
    {modal && <div className="iv-modal" onClick={e => { if(e.target === e.currentTarget) setModal(null); }}><div className={`iv-dialog ${modal.image ? '' : 'iv-dialog--text'}`} role="dialog" aria-modal="true" aria-labelledby="iv-dialog-title"><button ref={closeRef} className="iv-close" aria-label="Fechar" onClick={() => setModal(null)}>×</button>{modal.image && <img src={modal.image} alt={modal.title} />}<div><h2 id="iv-dialog-title">{modal.title}</h2>{modal.body && <p>{modal.body}</p>}<Book /></div></div></div>}
  </div>;
}
