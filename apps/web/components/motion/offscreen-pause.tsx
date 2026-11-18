'use client';

import { useEffect } from 'react';

/**
 * Pauses every CSS animation inside a section that is scrolled out of view.
 *
 * The home page carries ~25 infinite CSS loops (status dots, orbits, cursors,
 * footer stars). Chrome ticks each of them every frame wherever it is on the
 * page, and each tick is a style recalc, a re-layerize and often a repaint.
 * Measured 2026-11-18 on softmato.com: the main thread was 30–50% busy with
 * nobody touching the page; with the off-screen loops paused, 4–7%.
 *
 * Marks each direct child of `<main>`, and the footer after it, with
 * `data-offscreen` while it is outside the viewport (plus a quarter-screen
 * lead); the rule in `globals.css` pauses everything under the mark. Re-watches
 * when `<main>`'s children change, which covers client navigation and
 * streamed sections. Renders nothing; mounted once from the public layout.
 */
export function OffscreenPause() {
  useEffect(() => {
    const main = document.querySelector('main');

    if (!main || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          e.target.toggleAttribute('data-offscreen', !e.isIntersecting);
      },
      { rootMargin: '25% 0px' },
    );

    const watch = () => {
      io.disconnect();
      for (const el of main.children) io.observe(el);
      if (main.nextElementSibling) io.observe(main.nextElementSibling);
    };

    watch();

    const mo = new MutationObserver(watch);

    mo.observe(main, { childList: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
