import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Contact.module.css';

const PHONE = '47988304224';
const WA_LINK = `https://wa.me/55${PHONE}?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20Von%20Zu%20Hause.`;
const IG_LINK = 'https://www.instagram.com/vonzu.hause/';
const MAPS_LINK = 'https://maps.google.com/?q=R.+dos+Caçadores,+3229,+Blumenau,+SC';

const cards = [
  {
    id: 'whatsapp',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: 'WhatsApp',
    sub: 'Atendimento rápido',
    value: '(47) 98830-4224',
    link: WA_LINK,
    cta: 'Enviar mensagem',
    accent: '#25D366',
    glow: 'rgba(37,211,102,0.18)',
  },
  {
    id: 'instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    label: 'Instagram',
    sub: 'Novidades e receitas',
    value: '@vonzu.hause',
    link: IG_LINK,
    cta: 'Ver perfil',
    accent: '#E1306C',
    glow: 'rgba(225,48,108,0.18)',
  },
  {
    id: 'address',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    label: 'Endereço',
    sub: 'Velha Central, Blumenau - SC',
    value: 'R. dos Caçadores, 3229',
    link: MAPS_LINK,
    cta: 'Ver no mapa',
    accent: '#f8c842',
    glow: 'rgba(248,200,66,0.18)',
  },
];

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section id="contato" className={styles.section} ref={(el) => { (ref as unknown as React.RefCallback<HTMLElement>)(el); (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el; }}>
      {/* Parallax noise bg */}
      <motion.div className={styles.bgNoise} style={{ y: bgY }} />

      {/* Decorative orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className={styles.badgeDot} />
            Contato
          </motion.div>
          <h2 className={styles.title}>
            Fale <em>conosco</em>
          </h2>
          <p className={styles.subtitle}>
            Estamos aqui para atender você. Entre em contato pelo canal que preferir.
          </p>
        </motion.div>

        {/* Cards */}
        <div className={styles.grid}>
          {cards.map((card, i) => (
            <motion.a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noreferrer"
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ '--card-accent': card.accent, '--card-glow': card.glow } as React.CSSProperties}
            >
              {/* Top glare */}
              <div className={styles.cardGlare} />

              {/* Icon */}
              <motion.div
                className={styles.iconRing}
                style={{ color: card.accent }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {card.icon}
              </motion.div>

              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>{card.label}</span>
                <span className={styles.cardSub}>{card.sub}</span>
                <strong className={styles.cardValue}>{card.value}</strong>
              </div>

              <div className={styles.cardCta} style={{ color: card.accent }}>
                {card.cta}
                <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                  <path d="M3 8h8.586L8.293 4.707l1.414-1.414L14.414 8l-4.707 4.707-1.414-1.414L11.586 9H3V8z"/>
                </svg>
              </div>

              {/* Bottom accent line */}
              <div className={styles.cardAccentLine} style={{ background: card.accent }} />
            </motion.a>
          ))}
        </div>

        {/* Instagram Feature Banner */}
        <motion.div
          className={styles.banner}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.bannerBg} />
          <div className={styles.bannerContent}>
            <div className={styles.bannerLeft}>
              <div className={styles.bannerIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <div>
                <h3 className={styles.bannerTitle}>Siga-nos no Instagram</h3>
                <p className={styles.bannerSub}>
                  Novidades, receitas artesanais e bastidores das nossas produções especiais.
                </p>
              </div>
            </div>
            <motion.a
              href={IG_LINK}
              target="_blank"
              rel="noreferrer"
              className={styles.bannerBtn}
              whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(225,48,108,0.45)' }}
              whileTap={{ scale: 0.97 }}
            >
              @vonzu.hause
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
