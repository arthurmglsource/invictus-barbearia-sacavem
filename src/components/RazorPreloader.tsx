'use client';

import { useEffect, useState } from 'react';
import { lockScroll } from '@/lib/motion';

let hasPlayedIntro = false;

interface RazorPreloaderProps {
  onComplete: () => void;
}

export default function RazorPreloader({ onComplete }: RazorPreloaderProps) {
  const [visible, setVisible] = useState(() => !hasPlayedIntro);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!visible || hasPlayedIntro) {
      setVisible(false);
      onComplete();
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      hasPlayedIntro = true;
      setVisible(false);
      onComplete();
      return;
    }

    const unlock = lockScroll();

    const sliceTimer = window.setTimeout(() => {
      setClosing(true);
    }, 780);

    const doneTimer = window.setTimeout(() => {
      hasPlayedIntro = true;
      unlock();
      setVisible(false);
      onComplete();
    }, 1520);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        hasPlayedIntro = true;
        unlock();
        setVisible(false);
        onComplete();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      clearTimeout(sliceTimer);
      clearTimeout(doneTimer);
      window.removeEventListener('keydown', onKeyDown);
      unlock();
    };
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`preloader ${closing ? 'preloader--closing' : ''}`}
      role="dialog"
      aria-label="Abertura Invictus Barbearia"
    >
      <div className="preloader__panel preloader__panel--top" />
      <div className="preloader__panel preloader__panel--bottom" />

      <div className="preloader__center">
        <div className="preloader__emblem-wrap">
          <img
            src="/assets/invictus/emblem-white.webp"
            alt="Símbolo oficial Invictus Barbearia"
            width={154}
            height={162}
            className="preloader__emblem"
          />
        </div>
        <div className="preloader__meta">
          <span>INVICTUS BARBEARIA</span>
          <span className="preloader__dot">·</span>
          <span>SACAVÉM</span>
        </div>
      </div>

      <div className="preloader__razor-line" aria-hidden="true" />

      <button
        type="button"
        className="preloader__skip"
        onClick={() => {
          hasPlayedIntro = true;
          setVisible(false);
          onComplete();
        }}
      >
        SALTAR INTRO
      </button>
    </div>
  );
}
