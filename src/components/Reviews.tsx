import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Reviews.module.css';

interface Review {
  id: number;
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  color: string;
}

const SEED: Review[] = [
  { id: 1, name: 'Maria Hoffmann',   initials: 'MH', rating: 5, date: '15 mar 2026', color: '#e8a800', text: 'Os produtos são simplesmente deliciosos! A geleia de amora me lembrou da casa da minha vó. Qualidade impecável e entrega super rápida. Recomendo demais para todo mundo!' },
  { id: 2, name: 'Carlos Müller',    initials: 'CM', rating: 5, date: '08 mar 2026', color: '#8c6239', text: 'O mel artesanal é puro ouro! Já compro há mais de um ano e a qualidade é sempre consistente. O pão colonial então é de outro nível. Von Zu Hause é referência em Blumenau!' },
  { id: 3, name: 'Ana Schulz',       initials: 'AS', rating: 5, date: '01 mar 2026', color: '#c48600', text: 'Presenteei minha família com uma cesta e todos ficaram apaixonados. O queijo colonial surpreendeu todo mundo pela textura e sabor. Produto com alma!' },
  { id: 4, name: 'Roberto Fischer',  initials: 'RF', rating: 5, date: '20 fev 2026', color: '#6b4100', text: 'Nunca tinha experimentado nada assim. As conservas de pepino têm um sabor que me levou diretamente para as festas da minha infância em Blumenau. Perfeito!' },
  { id: 5, name: 'Luiza Krause',     initials: 'LK', rating: 5, date: '12 fev 2026', color: '#9a6200', text: 'Faço pedidos todo mês. Os pães são incríveis e o mel é o melhor que já provei. A equipe é super atenciosa e o atendimento pelo WhatsApp é excelente!' },
];

function Stars({ n }: { n: number }) {
  return (
    <div className={styles.stars}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? '#F8C842' : 'rgba(255,255,255,0.15)' }}>★</span>
      ))}
    </div>
  );
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(SEED);
  const [form, setForm] = useState({ name: '', rating: 5, text: '' });
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    const colors = ['#e8a800','#8c6239','#c48600','#6b4100','#9a6200'];
    const r: Review = {
      id: Date.now(),
      name: form.name,
      initials: form.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase(),
      rating: form.rating,
      date: new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' }),
      text: form.text,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setReviews([r, ...reviews]);
    setForm({ name: '', rating: 5, text: '' });
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section id="avaliacoes" className={styles.section} ref={ref}>
      <div className={styles.topAccent} />

      <div className="container">
        {/* HEADER */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.headerRow}>
            <h2 className="section-h">O que dizem nossos clientes</h2>
            <div className={styles.scoreWrap}>
              <strong className={styles.scoreNum}>{avg}</strong>
              <div>
                <Stars n={5} />
                <span className={styles.scoreCount}>{reviews.length} avaliações</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SWIPER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className={styles.swiperWrap}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className={styles.swiper}
          >
            {reviews.map(r => (
              <SwiperSlide key={r.id}>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.avatar} style={{ background: r.color }}>
                      {r.initials}
                    </div>
                    <div>
                      <strong className={styles.reviewName}>{r.name}</strong>
                      <span className={styles.reviewDate}>{r.date}</span>
                    </div>
                    <Stars n={r.rating} />
                  </div>
                  <p className={styles.reviewText}>"{r.text}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* FORM */}
        <motion.div
          className={styles.formSection}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.formLeft}>
            <h3 className={styles.formTitle}>Deixe sua avaliação</h3>
            <p className={styles.formSub}>
              Sua opinião nos ajuda a melhorar e inspira outros clientes. Compartilhe!
            </p>
          </div>

          <form onSubmit={submit} className={styles.form}>
            <AnimatePresence>
              {sent && (
                <motion.div
                  className={styles.success}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✅ Obrigado! Sua avaliação foi publicada.
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Seu nome</label>
                <input
                  type="text"
                  placeholder="Ex: Maria Hoffmann"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Nota</label>
                <div className={styles.ratingRow}>
                  {[1,2,3,4,5].map(i => (
                    <button
                      key={i} type="button"
                      className={`${styles.star} ${i <= (hover || form.rating) ? styles.starOn : ''}`}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setForm({ ...form, rating: i })}
                    >★</button>
                  ))}
                  <span className={styles.ratingLabel}>
                    {['','Ruim','Regular','Bom','Ótimo','Excelente'][hover || form.rating]}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label>Comentário</label>
              <textarea
                rows={4}
                placeholder="Conte-nos sobre sua experiência com nossos produtos..."
                value={form.text}
                onChange={e => setForm({ ...form, text: e.target.value })}
                required
              />
            </div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Publicar avaliação
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
