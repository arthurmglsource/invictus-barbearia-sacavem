import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

const lockOwners = new Set<symbol>();
let savedOverflow: { html: string; body: string } | undefined;

export function lockScroll() {
  if (typeof document === 'undefined') return () => {};
  const token = Symbol('invictus-scroll-lock');
  if (!lockOwners.size) {
    savedOverflow = {
      html: document.documentElement.style.overflow,
      body: document.body.style.overflow,
    };
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  lockOwners.add(token);
  return () => {
    if (!lockOwners.delete(token) || lockOwners.size || !savedOverflow) return;
    document.documentElement.style.overflow = savedOverflow.html;
    document.body.style.overflow = savedOverflow.body;
    savedOverflow = undefined;
  };
}

export function imageReady(image: HTMLImageElement | null, signal?: AbortSignal): Promise<boolean> {
  if (!image) return Promise.resolve(true);
  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      image.removeEventListener('load', loaded);
      image.removeEventListener('error', failed);
      signal?.removeEventListener('abort', failed);
      resolve(ok);
    };
    const loaded = () => {
      if (typeof image.decode !== 'function') return finish(image.naturalWidth > 0);
      image.decode().then(
        () => finish(true),
        () => finish(image.naturalWidth > 0)
      );
    };
    const failed = () => finish(false);
    if (signal?.aborted) return finish(false);
    signal?.addEventListener('abort', failed, { once: true });
    if (image.complete) {
      if (image.naturalWidth) loaded();
      else finish(false);
    } else {
      image.addEventListener('load', loaded, { once: true });
      image.addEventListener('error', failed, { once: true });
    }
  });
}
