import React, { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(0);
  const isHover = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move, { passive: true });

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor]')) {
        isHover.current = true;
        ringRef.current?.classList.add(styles.big);
        dotRef.current?.classList.add(styles.hidden);
      }
    };
    const out = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor]')) {
        isHover.current = false;
        ringRef.current?.classList.remove(styles.big);
        dotRef.current?.classList.remove(styles.hidden);
      }
    };

    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
};

export default CustomCursor;
