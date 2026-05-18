import { useEffect, useRef } from 'react';

const CARDS = [
  {
    num: '01',
    title: 'Website\nDevelopment',
    desc: 'Custom websites built around how people actually scroll and click. Single pages, full sites, whatever gets results.',
    link: 'Learn more',
    bg: '#E8E8E3',
    textColor: '#0A0A0A',
  },
  {
    num: '02',
    title: 'App Design &\nDevelopment',
    desc: 'Apps from idea to launch. We handle the strategy, the design, and the build, all under one roof.',
    link: 'Our process',
    bg: '#23B8CC',
    textColor: '#0A0A0A',
  },
  {
    num: '03',
    title: 'UX/UI\nStrategy',
    desc: 'UX audits, wireframes, and conversion strategy. We figure out where users drop off and fix it.',
    link: 'View approach',
    bg: '#E8E8E3',
    textColor: '#0A0A0A',
  },
  {
    num: '04',
    title: 'Digital\nBranding',
    desc: 'Brand identity that actually works online. Tone, type, colour, motion — all pulling in the same direction.',
    link: 'See details',
    bg: '#23B8CC',
    textColor: '#0A0A0A',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const vh         = window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrolled   = window.scrollY - sectionTop;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const pushed   = scrolled - i * vh;
        const progress = Math.max(0, Math.min(1, pushed / vh));

        if (progress === 0) {
          card.style.transform    = 'scale(1)';
          card.style.filter       = 'none';
          card.style.opacity      = '1';
          card.style.borderRadius = '0px';
        } else {
          const scale  = 1 - progress * 0.08;
          const blur   = progress * 6;
          const op     = 1 - progress * 0.18;
          const radius = progress * 20;
          card.style.transform    = `scale(${scale})`;
          card.style.filter       = `blur(${blur}px)`;
          card.style.opacity      = String(op);
          card.style.borderRadius = `${radius}px`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${(CARDS.length + 1) * 100}vh`,
      }}
    >
      {CARDS.map((card, i) => (
        <div
          key={card.num}
          ref={el => (cardRefs.current[i] = el)}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            background: card.bg,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            willChange: 'transform, opacity, filter',
            transformOrigin: 'center top',
            zIndex: i + 1,
          }}
        >
          {/* Background number */}
          <div
            style={{
              position: 'absolute',
              right: '-0.02em',
              bottom: '-0.08em',
              fontSize: 'clamp(14rem, 26vw, 34rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-display), sans-serif',
              color: 'rgba(0,0,0,0.055)',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '-0.04em',
            }}
          >
            {card.num}
          </div>

          <div
            style={{
              width: '100%',
              paddingLeft: 'max(1.25rem, 5vw)',
              paddingRight: 'max(1.25rem, 5vw)',
            }}
          >
            {i === 0 && (
              <p
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.35)',
                  fontWeight: 500,
                  marginBottom: '2.5rem',
                }}
              >
                What We Do
              </p>
            )}

            <h2
              className="services-title"
              style={{
                fontSize: 'clamp(2.8rem, 7.5vw, 9rem)',
                fontWeight: 800,
                fontFamily: 'var(--font-display), sans-serif',
                color: card.textColor,
                margin: 0,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                maxWidth: '62%',
                whiteSpace: 'pre-line',
              }}
            >
              {card.title}
            </h2>

            <div
              style={{
                marginTop: '2.5rem',
                marginLeft: 'max(2rem, 8vw)',
                maxWidth: 460,
              }}
            >
              <p
                style={{
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: 'clamp(0.88rem, 1.3vw, 1rem)',
                  lineHeight: 1.75,
                  margin: '0 0 1.2rem',
                  textAlign: 'center',
                }}
              >
                {card.desc}
              </p>
              <div style={{ textAlign: 'center' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(0,0,0,0.38)',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  {card.link} ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
