import { BUSINESS_INFO } from '@/data/invictus';

export default function MonumentalFooter() {
  return (
    <footer className="site-footer section-carbon">
      <div className="container clean-footer">
        <a href="#topo"><img src="/assets/invictus/logo-white.webp" alt="Invictus Barbearia" width={140} height={83} loading="lazy" /></a>
        <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        <p>© {new Date().getFullYear()} Invictus Barbearia</p>
      </div>
    </footer>
  );
}
