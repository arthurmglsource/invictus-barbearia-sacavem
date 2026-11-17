import { BUSINESS_INFO, GOOGLE_MAPS_URL } from '@/data/invictus';

export default function LocationSection() {
  return (
    <section id="localizacao" className="location section-graphite" aria-labelledby="location-heading">
      <div className="container clean-location">
        <img src="/assets/invictus/05-fachada-sacavem.webp" alt="Entrada da Invictus Barbearia em Sacavém" loading="lazy" />
        <div>
          <span className="eyebrow">ENCONTRA-NOS</span>
          <h2 id="location-heading">EM SACAVÉM.</h2>
          <p>{BUSINESS_INFO.addressLine1}<br />{BUSINESS_INFO.addressLine2}</p>
          <p>Segunda a sábado · 10:00 — 20:00<br />Domingo · Encerrado</p>
          <div className="clean-location__actions">
            <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">COMO CHEGAR</a>
            <a href={BUSINESS_INFO.phoneHref} className="link-underline">{BUSINESS_INFO.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
