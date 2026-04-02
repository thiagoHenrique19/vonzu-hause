import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

/* ── Typewriter ── */
const WORDS = ['Artesanais', 'Von Zu Hause', 'com Amor', 'de Família'];

function Typewriter() {
  const [idx, setIdx]     = useState(0);
  const [shown, setShown] = useState('');
  const [del, setDel]     = useState(false);

  useEffect(() => {
    const word = WORDS[idx];
    if (!del) {
      if (shown.length < word.length) {
        const t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), 70);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDel(true), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (shown.length > 0) {
        const t = setTimeout(() => setShown(shown.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setDel(false);
        setIdx((i) => (i + 1) % WORDS.length);
      }
    }
  }, [shown, del, idx]);

  return (
    <span className={styles.typeword}>
      {shown}<span className={styles.cursor}>|</span>
    </span>
  );
}

/* ── Floating orbs canvas ── */
function OrbCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    let W = c.width = window.innerWidth;
    let H = c.height = window.innerHeight;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 180 + i * 60,
      color: i % 2 === 0 ? [232, 168, 0] : [140, 98, 57],
      speed: 0.0003 + Math.random() * 0.0004,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf: number;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(o => {
        const nx = o.x + Math.cos(t * o.speed + o.phase) * 60;
        const ny = o.y + Math.sin(t * o.speed * 0.7 + o.phase) * 40;
        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, o.r);
        const [r, g2, b] = o.color;
        g.addColorStop(0, `rgba(${r},${g2},${b},0.13)`);
        g.addColorStop(1, `rgba(${r},${g2},${b},0)`);
        ctx.beginPath();
        ctx.arc(nx, ny, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className={styles.orbCanvas} />;
}

/* ── Floating badges ── */
const BADGES = [
  { emoji: '🍯', label: 'Mel Artesanal', x: '72%', y: '18%', delay: 0.6 },
  { emoji: '🫙', label: 'Conservas',      x: '78%', y: '54%', delay: 0.9 },
  { emoji: '🥖', label: 'Pão Colonial',   x: '62%', y: '78%', delay: 1.2 },
];

/* ── Magnetic button ── */
function MagneticBtn({ children, className, href }: { children: React.ReactNode; className: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left - r.width  / 2) * 0.25;
    const y  = (e.clientY - r.top  - r.height / 2) * 0.25;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };

  return (
    <a ref={ref} href={href} className={className}
      onMouseMove={handleMove} onMouseLeave={handleLeave}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

/* ── HERO ── */
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const up = { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* dark background */}
      <div className={styles.dark} />
      <OrbCanvas />

      {/* grid lines */}
      <div className={styles.gridLines} />

      {/* diagonal divider */}
      <div className={styles.diag} />

      <motion.div className={`${styles.inner} container`} style={{ y, opacity: fadeOut }}>

        {/* ── LEFT ── */}
        <motion.div
          className={styles.left}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={up} className="eyebrow">
            Blumenau · SC &nbsp;·&nbsp; Desde sempre
          </motion.div>

          <motion.h1 variants={up} className={styles.title}>
            Delícias<br />
            <Typewriter /><br />
            <em className={styles.italic}>Coloniais</em>
          </motion.h1>

          <motion.p variants={up} className={styles.desc}>
            Produtos coloniais artesanais feitos com receitas de família,
            ingredientes naturais e muito amor — direto de Blumenau para a sua mesa.
          </motion.p>

          <motion.div variants={up} className={styles.actions}>
            <MagneticBtn href="https://wa.me/5547988304224" className={styles.btnPrimary}>
              <span className={styles.btnInner}>
                <span>💬</span>
                <span>Fazer Pedido</span>
              </span>
              <span className={styles.btnShine} />
            </MagneticBtn>
            <MagneticBtn href="#produtos" className={styles.btnGhost}>
              Explorar produtos ↓
            </MagneticBtn>
          </motion.div>

          <motion.div variants={up} className={styles.bar}>
            {[
              { n: '100%', l: 'Artesanal' },
              { n: '0', l: 'Conservantes' },
              { n: '3ª', l: 'Geração' },
              { n: 'SC', l: 'Blumenau' },
            ].map((s, i) => (
              <React.Fragment key={s.l}>
                {i > 0 && <span className={styles.barDot} />}
                <div className={styles.stat}>
                  <strong>{s.n}</strong>
                  <span>{s.l}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT – logo ── */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, scale: 0.82, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* outer glow rings */}
          {[320, 420, 530].map((s, i) => (
            <motion.div
              key={s}
              className={styles.ring}
              style={{ width: s, height: s }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.04, 1] }}
              transition={{ rotate: { duration: 22 + i * 8, repeat: Infinity, ease: 'linear' }, scale: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' } }}
            />
          ))}

          {/* logo card */}
          <motion.div
            className={styles.logoWrap}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.logoGlow} />
            <img src="/vanzu-logo.jpg" alt="Von Zu Hause" className={styles.logoImg} />
          </motion.div>

          {/* floating badges */}
          {BADGES.map((b) => (
            <motion.div
              key={b.label}
              className={styles.badge}
              style={{ left: b.x, top: b.y }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
              transition={{
                opacity: { delay: b.delay, duration: 0.5 },
                scale:   { delay: b.delay, duration: 0.5, type: 'spring', stiffness: 260 },
                y:       { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: b.delay },
              }}
            >
              <span>{b.emoji}</span>{b.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>↓</motion.span>
        <span>scroll</span>
      </motion.div>


    </section>
  );
};

export default Hero;
