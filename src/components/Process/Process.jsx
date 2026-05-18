import { useEffect, useRef, useState } from 'react';

function emitStep(step) {
  window.dispatchEvent(new CustomEvent('processStep', { detail: { step } }));
}

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Before anything gets designed, we get to know your brand. Your audience, your goals, what makes you different from everyone else.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Once we understand your brand, we map out the experience. How people move through it, where they engage, and what gets them to convert.',
  },
  {
    num: '03',
    title: 'Develop',
    desc: 'Then we build it. Responsive, scroll-driven, and smooth. Motion, function, and design all working together.',
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!inView) {
        emitStep(-1);
        return;
      }

      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.5 - rect.top) / rect.height));
      const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive(next);

      // Only trigger particle shape once the section reaches the viewport centre
      if (rect.top <= window.innerHeight * 0.5) {
        emitStep(next);
      } else {
        emitStep(-1);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      emitStep(-1);
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 'max(1.25rem, 5vw)',
        paddingRight: 'max(1.25rem, 5vw)',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <p
          data-animate="scroll-up"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            fontWeight: 500,
            marginBottom: '3rem',
          }}
        >
          The Process
        </p>

        <div style={{ maxWidth: 600, position: 'relative' }}>
          {/* Vertical connector line */}
          <div
            style={{
              position: 'absolute',
              left: 7,
              top: 8,
              bottom: 8,
              width: 1,
              background: 'linear-gradient(to bottom, rgba(35,184,204,0.35), rgba(35,184,204,0.1), transparent)',
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`process-step-item${i === active ? ' active' : ''}`}
              style={{
                position: 'relative',
                paddingLeft: '2.75rem',
                marginBottom: i < steps.length - 1 ? '2.5rem' : 0,
              }}
            >
              <div
                className="process-dot"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 6,
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  border: '2px solid #23B8CC',
                  background: '#0A0A0A',
                  boxShadow: '0 0 10px rgba(35,184,204,0.2)',
                }}
              />
              <span style={{ color: '#23B8CC', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
                {step.num}
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display), sans-serif',
                  margin: '0.2rem 0 0.4rem',
                }}
              >
                {step.title}
              </h3>
              <p style={{ color: '#BFBFB8', fontSize: '0.85rem', lineHeight: 1.65, maxWidth: 420, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
