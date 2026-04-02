import { useEffect, useRef, useState } from 'react';

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
}

export function useParallax(speed = 0.3) {
  const scrollY = useScrollY();
  return scrollY * speed;
}

export function useTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * maxTilt, y: -dx * maxTilt });
    };
    const reset = () => setTilt({ x: 0, y: 0 });
    el.addEventListener('mousemove', handler);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', handler);
      el.removeEventListener('mouseleave', reset);
    };
  }, [maxTilt]);

  return { ref, tilt };
}
