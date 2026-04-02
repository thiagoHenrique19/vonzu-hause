import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollY } from '../hooks/useAnimations';
import styles from './Navbar.module.css';

const LINKS = [
  { href: '#sobre',       label: 'Sobre' },
  { href: '#produtos',    label: 'Produtos' },
  { href: '#contato',     label: 'Contato' },
  { href: '#localizacao', label: 'Localização' },
];

const Navbar: React.FC = () => {
  const scrollY  = useScrollY();
  const scrolled = scrollY > 60;
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`${styles.inner} container`}>

          {/* LOGO */}
          <a href="#" className={styles.logo}>
            <motion.div className={styles.imgWrap} whileHover={{ scale: 1.08, rotate: 3 }} transition={{ type: 'spring', stiffness: 280 }}>
              <img src="/vanzu-logo.jpg" alt="Von Zu Hause" className={styles.img} />
            </motion.div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Von Zu Hause</span>
              <span className={styles.logoSub}>Produtos Coloniais</span>
            </div>
          </a>

          {/* DESKTOP LINKS */}
          <ul className={styles.links}>
            {LINKS.map((l, i) => (
              <motion.li key={l.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.4 }}
              >
                <a href={l.href} className={styles.link}>{l.label}</a>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="https://wa.me/5547988304224"
            target="_blank" rel="noreferrer"
            className={styles.cta}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            Pedir agora
          </motion.a>

          {/* HAMBURGER */}
          <button className={`${styles.ham} ${open ? styles.hamOpen : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className={styles.backdrop}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside className={styles.drawer}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            >
              <div className={styles.drawerLogo}>
                <img src="/vanzu-logo.jpg" alt="Von Zu Hause" className={styles.drawerImg} />
              </div>
              <ul className={styles.drawerLinks}>
                {LINKS.map((l, i) => (
                  <motion.li key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
                  </motion.li>
                ))}
              </ul>
              <a href="https://wa.me/5547988304224" target="_blank" rel="noreferrer"
                className={styles.drawerCta} onClick={() => setOpen(false)}>
                💬 Fazer Pedido
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
