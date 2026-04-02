import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
