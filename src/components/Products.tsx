import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Products.module.css';

const ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="52" height="52">
        {/* Pote de mel com favo */}
        <ellipse cx="32" cy="48" rx="16" ry="6" opacity="0.3"/>
        <path d="M16 28c0-8.84 7.16-16 16-16s16 7.16 16 16v8c0 4.42-3.58 8-8 8H24c-4.42 0-8-3.58-8-8v-8z"/>
        <path d="M24 20l4 4 4-4 4 4 4-4"/>
        <path d="M22 36h20"/>
        <path d="M28 42h8"/>
        <circle cx="32" cy="14" r="3" strokeWidth="1.2"/>
      </svg>
    ),
    name: 'Mel Artesanal',
    desc: 'Colhido por apicultores locais de Blumenau e envasado sem aquecimento. Cor, aroma e sabor exatamente como a natureza produziu.',
    tag: 'Mais vendido',
    color1: '#F8C842',
    color2: '#E8A800',
    colorStop: 'rgba(248,200,66,0.15)',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="52" height="52">
        {/* Pote de conserva */}
        <rect x="18" y="22" width="28" height="32" rx="4"/>
        <rect x="16" y="17" width="32" height="8" rx="3"/>
        <path d="M24 30c2-2 4-2 6 0s4 2 6 0"/>
        <path d="M24 38c2-2 4-2 6 0s4 2 6 0"/>
        <line x1="32" y1="14" x2="32" y2="10"/>
        <path d="M28 10h8"/>
      </svg>
    ),
    name: 'Conservas',
    desc: 'Legumes e frutas da estação, conservados com técnicas coloniais passadas de avó para neta. Sem corantes, sem industrialização.',
    tag: 'Tradicional',
    color1: '#c8b86e',
    color2: '#8a6020',
    colorStop: 'rgba(200,184,110,0.15)',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="52" height="52">
        {/* Pão */}
        <path d="M12 38c0-11.05 8.95-20 20-20s20 8.95 20 20v4H12v-4z"/>
        <path d="M12 42h40v4a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4v-4z"/>
        <path d="M20 30c0-2 2-4 4-4"/>
        <path d="M28 26c0-2 2-3 4-2"/>
        <path d="M36 28c1-1.5 3-1.5 4 0"/>
      </svg>
    ),
    name: 'Pão Colonial',
    desc: 'Fermentação longa, forno a lenha e ingredientes simples. A casca que estalha e o miolo que derrete — exatamente como era antes.',
    tag: 'Favorito',
    color1: '#d4956b',
    color2: '#8a4820',
    colorStop: 'rgba(212,149,107,0.15)',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="52" height="52">
        {/* Queijo com buracos */}
        <path d="M8 36l12-20h24l12 20v4a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4v-4z"/>
        <ellipse cx="24" cy="34" rx="4" ry="3"/>
        <ellipse cx="38" cy="30" rx="3" ry="2.5"/>
        <ellipse cx="30" cy="40" rx="2.5" ry="2"/>
        <line x1="20" y1="16" x2="20" y2="10"/>
        <path d="M17 10h6l2 6"/>
      </svg>
    ),
    name: 'Queijo Colonial',
    desc: 'Maturado com paciência usando técnicas tradicionais da colônia. Sabor pronunciado, textura firme e aroma que revela a origem.',
    tag: 'Especial',
    color1: '#e8d08a',
    color2: '#b08820',
    colorStop: 'rgba(232,208,138,0.15)',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="52" height="52">
        {/* Frasco de geleia com fruta */}
        <rect x="20" y="26" width="24" height="26" rx="4"/>
        <rect x="18" y="20" width="28" height="9" rx="3"/>
        <path d="M26 36c3-3 9-3 12 0"/>
        <path d="M28 42h8"/>
        {/* Morango */}
        <path d="M32 12c-4 0-7 2-7 5s3 5 7 5 7-2 7-5-3-5-7-5z"/>
        <path d="M29 12c1-2 2-3 3-3s2 1 3 3"/>
      </svg>
    ),
    name: 'Geleias Caseiras',
    desc: 'Frutas frescas, colhidas na época certa, cozidas em lotes pequenos. Doçura equilibrada, sem pectina industrial.',
    tag: 'Artesanal',
    color1: '#e87878',
    color2: '#b02020',
    colorStop: 'rgba(232,120,120,0.15)',
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="52" height="52">
        {/* Ramo de ervas com folhas */}
        <path d="M32 52V28"/>
        <path d="M32 40c-6-4-12-3-14 2s2 10 8 10 14-4 14-10"/>
        <path d="M32 34c4-6 10-8 14-5s3 10-2 13-14 1-14-1"/>
        <path d="M32 28c-2-5 0-10 4-12s9 0 10 5-2 10-6 11"/>
        <path d="M32 28c2-5 6-8 6-12"/>
      </svg>
    ),
    name: 'Ervas & Temperos',
    desc: 'Colhidas e secas no momento certo para preservar o óleo essencial. O toque que diferencia um prato comum de algo memorável.',
    tag: 'Natural',
    color1: '#7ec87e',
    color2: '#2a7a2a',
    colorStop: 'rgba(126,200,126,0.15)',
  },
];

function Card({ item, index, inView }: { item: typeof ITEMS[0]; index: number; inView: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, op: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (py - 0.5) * 10, y: -(px - 0.5) * 10 });
    setGlare({ x: px * 100, y: py * 100, op: 0.12 });
  };
  const onLeave = () => { setTilt({ x: 0, y: 0 }); setGlare(g => ({ ...g, op: 0 })); };

  return (
    <motion.div
      className={styles.cardWrap}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
    >
      <div
        ref={ref}
        className={styles.card}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div
          className={styles.cardInner}
          style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
          {/* glare */}
          <div className={styles.glare} style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.op}), transparent 60%)`,
          }} />

          {/* Icon area — full top banner */}
          <div
            className={styles.iconArea}
            style={{ background: `radial-gradient(ellipse 80% 80% at 50% 60%, ${item.colorStop} 0%, transparent 100%)` }}
          >
            {/* Outer glow ring */}
            <div
              className={styles.iconRing}
              style={{ borderColor: `${item.color1}30` }}
            >
              <div
                className={styles.iconCircle}
                style={{
                  background: `radial-gradient(135deg, ${item.color1}22, ${item.color2}11)`,
                  borderColor: `${item.color1}40`,
                  color: item.color1,
                }}
              >
                {item.icon}
              </div>
            </div>

            {/* Tag badge */}
            <span className={styles.tag} style={{ color: item.color1, borderColor: `${item.color1}40`, background: `${item.color1}12` }}>
              {item.tag}
            </span>
          </div>

          {/* Text body */}
          <div className={styles.body}>
            <h3 className={styles.name}>{item.name}</h3>
            <p className={styles.desc}>{item.desc}</p>

            <a
              href="https://wa.me/5547988304224"
              target="_blank" rel="noreferrer"
              className={styles.btn}
              style={{ color: item.color1 }}
            >
              Pedir agora
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          {/* Bottom accent */}
          <div className={styles.bottomLine} style={{ background: `linear-gradient(90deg, transparent, ${item.color1}, transparent)` }} />
        </div>
      </div>
    </motion.div>
  );
}

const Products: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="produtos" className={styles.section}>
      <div className={styles.bg} />

      <div className="container" ref={ref}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Nossos produtos</div>
          <h2 className="section-h">Sabores que contam histórias</h2>
          <p className="section-sub">
            Cada produto é preparado com ingredientes selecionados e produzido
            em pequenos lotes para garantir o máximo de qualidade e frescor.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {ITEMS.map((item, i) => (
            <Card key={item.name} item={item} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className={styles.bottomCta}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p>Quer montar sua própria cesta colonial?</p>
          <a href="https://wa.me/5547988304224" target="_blank" rel="noreferrer" className={styles.ctaLink}>
            Fale conosco pelo WhatsApp →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
