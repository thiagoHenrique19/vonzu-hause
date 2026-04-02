import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './MapSection.module.css';

const address = 'R. dos Caçadores, 3229 - Velha Central, Blumenau, SC, 89040-312';
const encodedAddress = encodeURIComponent(address);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed&hl=pt-BR&z=16`;
const waUrl = 'https://wa.me/5547988304224?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20Von%20Zu%20Hause.';

const infoItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    label: 'Endereço',
    lines: ['R. dos Caçadores, 3229', 'Velha Central, Blumenau - SC', 'CEP: 89040-312'],
    accent: '#f8c842',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: 'WhatsApp / Telefone',
    lines: ['(47) 98830-4224'],
    accent: '#25D366',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
      </svg>
    ),
    label: 'Horário de Atendimento',
    lines: ['Seg, Qua e Sex: 7h às 17h'],
    accent: '#818cf8',
  },
];

const MapSection: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <section
      id="localizacao"
      className={styles.section}
      ref={(el) => {
        (ref as unknown as React.RefCallback<HTMLElement>)(el);
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
    >
      {/* Top divider wave */}
      <div className={styles.topWave}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,80 960,0 1440,60 L1440,0 Z" fill="var(--ink-900)" />
        </svg>
      </div>

      <div className={styles.bg} />
      <div className={styles.orb} />

      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Localização
          </div>
          <h2 className={styles.title}>
            Onde nos <em>encontrar</em>
          </h2>
          <p className={styles.subtitle}>
            Estamos em Blumenau, SC — prontos para atendê-lo. Venha nos visitar!
          </p>
        </motion.div>

        {/* Layout */}
        <div className={styles.layout}>
          {/* Info panel */}
          <motion.div
            className={styles.infoPanel}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.infoItem}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
              >
                <div className={styles.infoIcon} style={{ color: item.accent, borderColor: `${item.accent}33`, background: `${item.accent}0f` }}>
                  {item.icon}
                </div>
                <div className={styles.infoText}>
                  <span className={styles.infoLabel}>{item.label}</span>
                  {item.lines.map((line, j) => (
                    <span key={j} className={styles.infoLine}>{line}</span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Action buttons */}
            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <motion.a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.btnMaps}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Abrir no Google Maps
              </motion.a>
              <motion.a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.btnWa}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar no WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            className={styles.mapWrap}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ scale: mapScale }}
          >
            <div className={styles.mapFrame}>
              <iframe
                title="Localização Von Zu Hause"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <motion.a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.mapExpandBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
              </svg>
              Ver mapa maior
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
