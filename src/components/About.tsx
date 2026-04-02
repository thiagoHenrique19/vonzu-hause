import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import styles from './About.module.css';

const STATS = [
  { n: 100, suffix: '%', label: 'Ingredientes naturais', desc: 'Sem conservantes artificiais' },
  { n: 3,   suffix: 'ª', label: 'Geração de família',   desc: 'Receitas passadas com amor' },
  { n: 15,  suffix: '+', label: 'Anos de tradição',     desc: 'Sabor que resiste ao tempo' },
];

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"/>
        <path d="M12 6v2M12 16v2M6 12h2M16 12h2"/>
      </svg>
    ),
    title: 'Sem conservantes',
    desc: 'Nenhum aditivo artificial entra nas nossas receitas. O que vai à mesa é exatamente o que a natureza oferece — nada mais.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: 'Produção artesanal',
    desc: 'Cada lote é pequeno e feito à mão. Não produzimos em escala — produzimos com cuidado, garantindo que cada peça tenha atenção individual.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Receita de família',
    desc: 'As fórmulas que usamos hoje têm décadas. São receitas herdadas, testadas por gerações e preservadas com o respeito que merecem.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M17.5 12c0 4.142-5.5 8-5.5 8s-5.5-3.858-5.5-8a5.5 5.5 0 0 1 11 0z"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
    title: 'Raízes blumenauenses',
    desc: 'Somos fruto da imigração alemã que moldou Blumenau. A culinária colonial daqui não é tendência — é identidade. É quem somos.',
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASE } },
});

const About: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="sobre" className={styles.section} ref={ref}>
      {/* ── LEFT DARK PANEL ── */}
      <div className={styles.darkPanel}>
        <div className={styles.panelContent}>
          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="eyebrow">Nossa essência</div>
            <h2 className={styles.darkTitle}>
              Von Zu Hause —<br />
              <em className={styles.em}>De Casa</em>
            </h2>
            <p className={styles.darkText}>
              O nome vem do alemão e significa <strong>"de casa"</strong>. Nascemos
              do amor pelas tradições coloniais de Blumenau — uma cidade que guarda
              a alma da imigração alemã e a riqueza da culinária colonial.
            </p>
            <p className={styles.darkText}>
              Cada produto que sai das nossas mãos carrega histórias, memórias
              e o compromisso de preservar sabores que o tempo não apaga.
            </p>
          </motion.div>

          {/* Logo */}
          <motion.div
            className={styles.logoBlock}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04, rotate: -1 }}
          >
            <img src="/vanzu-logo.jpg" alt="Von Zu Hause" className={styles.logoImg} />
          </motion.div>

          {/* COUNTERS */}
          <div className={styles.counters}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className={styles.counter}
                variants={fadeUp(0.2 + i * 0.12)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <strong className={styles.counterNum}>
                  {inView
                    ? <><CountUp end={s.n} duration={2.2} delay={0.3 + i * 0.12} />{s.suffix}</>
                    : `0${s.suffix}`}
                </strong>
                <span className={styles.counterLabel}>{s.label}</span>
                <span className={styles.counterDesc}>{s.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT LIGHT PANEL ── */}
      <div className={styles.lightPanel}>
        <div className={styles.lightContent}>
          <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="eyebrow" style={{ color: 'var(--gold-700)' } as React.CSSProperties}>
              Nossos valores
            </div>
            <h3 className={styles.lightTitle}>
              O que torna cada produto especial
            </h3>
          </motion.div>

          <div className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                className={styles.pillar}
                variants={fadeUp(0.2 + i * 0.1)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ x: 6, borderColor: 'var(--gold-400)' }}
              >
                <motion.div
                  className={styles.pillarIcon}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {p.icon}
                </motion.div>
                <div className={styles.pillarText}>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="https://wa.me/5547988304224"
            target="_blank" rel="noreferrer"
            className={styles.cta}
            variants={fadeUp(0.65)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Falar conosco no WhatsApp</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default About;
