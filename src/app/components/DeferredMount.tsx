'use client';

/**
 * Mounts decorative extras (the hero globe and particles) only after the page has loaded and the browser is idle,
 * so the text, links and buttons load first for people and for search/AI crawlers. Renders nothing on the server.
 */
import { useEffect, useState, type ReactNode } from 'react';

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

export function DeferredMount({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const w = window as IdleWindow;
    const go = () => {
      timer = setTimeout(() => {
        if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => !cancelled && setShow(true), { timeout: 2000 });
        else if (!cancelled) setShow(true);
      }, delay);
    };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', go);
      if (timer) clearTimeout(timer);
      if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
    };
  }, [delay]);
  return show ? <>{children}</> : null;
}
