import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Intro from './components/Intro/Intro';
import Services from './components/Services/Services';
import Process from './components/Process/Process';
import Work from './components/Work/Work';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ContactModal from './components/ContactModal/ContactModal';
import Divider from './components/Divider/Divider';
import { useScrollAnimation } from './js/useScrollAnimation';
import './css/variables.css';
import './css/style.css';
import './css/animations.css';
import './css/responsive.css';

const NOISE = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const open  = () => setContactOpen(true);
  const close = () => setContactOpen(false);

  useScrollAnimation();

  return (
    <div
      style={{
        background: '#0A0A0A',
        color: '#F5F5F0',
        fontFamily: "var(--font-body), 'DM Sans', -apple-system, sans-serif",
        overflowX: 'hidden',
      }}
    >
      <ParticleBackground />

      {/* Film grain overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1000,
          opacity: 0.025,
          backgroundImage: `url("${NOISE}")`,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
      <Header onContactOpen={open} />

      <main>
        <Hero onContactOpen={open} />
        <Divider />
        <Intro />
        <Services />
        <Divider />
        <Process />
        <Divider />
        <Work />
        <Divider />
        <About />
        <Divider />
        <Contact onContactOpen={open} />
      </main>

      <Footer onContactOpen={open} />
      </div>

      <ContactModal isOpen={contactOpen} onClose={close} />
    </div>
  );
}
