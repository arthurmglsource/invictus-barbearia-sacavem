'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion';
import { SETMORE_URL } from '@/data/invictus';

const base = '/assets/invictus/hero-sequence/hq/';
const count = 27;
const frameURL = (index: number) => `${base}frame-${String(index).padStart(3, '0')}.webp`;
export default function InvictusHero({ stamp }: { stamp: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const section = root.current!, canvas = canvasRef.current!, ctx = canvas.getContext('2d')!;
    const poster = section.querySelector<HTMLImageElement>('.iv-sequence-poster')!;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, requested = 0, drawn = -1;
    const frames = new Map<number, HTMLImageElement>();
    const mm = gsap.matchMedia();
    const reduced = () => media.matches || new URLSearchParams(location.search).get('motion') === 'reduce';
    const draw = (force = false) => {
      const target = reduced() ? count - 1 : requested;
      // Never clear a decoded image just because a future frame is still loading.
      const available = frames.has(target) ? target : drawn;
      const source = frames.get(available);
      if (!source || (available === drawn && !force)) return;
      const width = canvas.clientWidth, height = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 3);
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      // Fixed reference dimensions keep every frame on the same seat axis.
      const desktop = matchMedia('(min-width:769px)').matches;
      const scale = desktop
        ? Math.min(section.clientWidth * .44 / 1122, height / 1403)
        : Math.min(width / source.naturalWidth, height / source.naturalHeight);
      const w = source.naturalWidth * scale, h = source.naturalHeight * scale;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(source, (width - w) / 2, height - h, w, h);
      drawn = available; section.dataset.frame = String(available);
      section.dataset.decodedFrames = String(frames.size);
      poster.style.visibility = 'hidden';
    };
    const load = async (index: number) => {
      const image = new Image(); image.src = frameURL(index); await image.decode();
      if (disposed) return;
      frames.set(index, image);
      section.dataset.decodedFrames = String(frames.size);
      draw();
    };
    const observer = new ResizeObserver(() => draw(true)); observer.observe(canvas);
    const initial = reduced() ? count - 1 : 0;
    if(reduced())poster.src=frameURL(count-1);
    load(initial).then(() => {
      if (disposed) return;
      requested=initial;draw(true);
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (reduced()) return;
        const state = {frame: 0};
        const timeline = gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'+=200%',pin:true,refreshPriority:10,scrub:1.5,invalidateOnRefresh:true}});
        timeline.to(state,{frame:count-1,duration:2.6,ease:'none',onUpdate:()=>{requested=Math.round(state.frame);draw();}}).to({}, {duration:.4});
        ScrollTrigger.sort(); ScrollTrigger.refresh();
        return ()=>timeline.revert();
      });
      if(reduced())return;
      // Four bounded workers progressively fetch/decode frames, final pose gets priority.
      const queue=[count-1,...Array.from({length:count-1},(_,i)=>i).filter(i=>i!==initial)];
      const worker=async()=>{while(queue.length&&!disposed){const next=queue.shift()!;try{await load(next);}catch{section.dataset.sequenceStatus='loading-retry';}}};
      void Promise.all(Array.from({length:4},worker));
    }).catch(()=>{section.dataset.sequenceStatus='poster';});
    const contrast=()=>{if(section.getBoundingClientRect().bottom>100){document.documentElement.style.setProperty('--iv-header-ink','#f3f1eb');document.documentElement.style.setProperty('--iv-header-light','1');}};
    contrast(); window.addEventListener('scroll',contrast,{passive:true});
    const change=()=>{requested=reduced()?count-1:0;void load(requested).catch(()=>undefined);};media.addEventListener('change',change);
    return()=>{disposed=true;observer.disconnect();mm.revert();media.removeEventListener('change',change);window.removeEventListener('scroll',contrast);};
  },[]);
  return <section ref={root} className="iv-hero iv-hero-scroll iv-hero-sequence" id="topo" aria-label="Vem para a Invictus — transformação do corte" data-frame="0">
    <div className="iv-sequence-stage"><img className="iv-sequence-poster" src={frameURL(0)} alt="Personagem Invictus na cadeira de barbearia" fetchPriority="high" /><canvas ref={canvasRef} className="iv-sequence-canvas" role="img" aria-label="O mesmo personagem gira com o corpo e a capa numa cadeira e revela o corte acabado" /></div>
    {stamp}
    <div className="iv-hero-heading-group"><h1 className="iv-hero-title"><span className="iv-hero-title-line">Vem para</span><span className="iv-hero-title-line iv-hero-title-brand">INVICTUS</span></h1><a className="iv-book iv-hero-cta" href={SETMORE_URL} target="_blank" rel="noopener noreferrer">MARCAR AGORA</a></div>
    <span className="iv-scroll-cue"><span aria-hidden="true">↓</span></span>
  </section>;
}
