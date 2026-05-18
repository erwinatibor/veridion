import { useState } from 'react';

const MODAL_IMG = 'https://lh3.googleusercontent.com/d/1hOLEib3eHKFw-PPvdLp8UpodW9Fj_vsG';

const team = [
  {
    img:  'https://lh3.googleusercontent.com/d/1pJT6YDMDYg3dV7lrO8TNddPdSrvF-Mec',
    name: 'Jerson Sidamon',
    role: 'Founder & CEO',
    sub:  'Project Manager · Sr. Web Developer · QA Lead · QMS Owner',
    desc: 'Owns: delivery, QA sign-off, build methodology, business direction',
  },
  {
    img:      'https://lh3.googleusercontent.com/d/14K3dZVRHAXrTIDrvHwvoxW3FzUTzX2eJ',
    modalImg: 'https://lh3.googleusercontent.com/d/1i0xcNH3ff063QcbvptlJ-wKiA2URSa9f',
    name: 'Junnel Tomales',
    role: 'Co-Founder',
    sub:  'Sr. Web Developer · Tech Stack Manager',
    desc: 'Owns: hosting, DNS, staging environment, tech infrastructure',
  },
  {
    img:      'https://lh3.googleusercontent.com/d/13QOi-TmU520yHzkKGsUN4CLcrj_D3dOF',
    modalImg: 'https://lh3.googleusercontent.com/d/16G9mGr63ADEn66cSWzUHn72HWtVYXEfa',
    name: 'Ihna Grace Simon',
    role: 'Co-Founder',
    sub:  'Admin DCC & HR · Jr. Web Developer · Sales & Outreach',
    desc: 'Owns: HR, team onboarding, document control, internal comms',
  },
  {
    img:      'https://lh3.googleusercontent.com/d/1OiPe1VbFDgCV4c3RNWwna7KJUyLrJt4Z',
    modalImg: 'https://lh3.googleusercontent.com/d/1exzJ_m9c_J8zCz4IpPcFv7Q_BeTevC6P',
    name: 'Sweet Marielle May Bunuan',
    role: 'Co-Founder',
    sub:  'Admin DCC & Finance · Jr. Web Developer · Sales & Outreach',
    desc: 'Owns: finance, bookkeeping, billing, deposit tracking',
  },
];

export default function About() {
  const [selected, setSelected] = useState(null);

  const open  = (member) => setSelected(member);
  const close = ()       => setSelected(null);

  return (
    <section
      id="about"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        paddingLeft: 'max(1.25rem, 5vw)',
        paddingRight: 'max(1.25rem, 5vw)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <p
          data-animate="scroll-up"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            fontWeight: 500,
            marginBottom: '3.5rem',
          }}
        >
          Team Leadership
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {team.map((member, i) => (
            <div
              key={i}
              data-animate="scroll-up"
              data-delay={String(i * 0.1)}
              onClick={() => open(member)}
              style={{ cursor: 'pointer' }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  borderRadius: 4,
                  marginBottom: '1rem',
                  position: 'relative',
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                    background: 'rgba(255,255,255,0.04)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.04)';
                  }}
                />
                {/* Hover hint */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10,10,10,0)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: '1rem',
                    transition: 'background 0.3s ease',
                    opacity: 0,
                  }}
                  className="card-overlay"
                >
                  <span style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#F5F5F0',
                    background: 'rgba(35,184,204,0.85)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 100,
                  }}>
                    View Profile
                  </span>
                </div>
              </div>

              <h3 style={{
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: 'var(--font-display), sans-serif',
                color: '#F5F5F0',
                margin: '0 0 0.25rem',
              }}>
                {member.name}
              </h3>
              <p style={{
                fontSize: '0.75rem',
                color: '#23B8CC',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,10,10,0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'max(1.25rem, 5vw)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 16,
              overflow: 'hidden',
              width: '100%',
              maxWidth: 680,
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
            }}
          >
            {/* Left — decorative image */}
            <div style={{ position: 'relative', minHeight: 340 }}>
              <img
                src={selected.modalImg || MODAL_IMG}
                alt="Veridion Studio"
                referrerPolicy="no-referrer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'rgba(35,184,204,0.08)';
                }}
              />
            </div>

            {/* Right — info */}
            <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Close */}
              <button
                onClick={close}
                style={{
                  alignSelf: 'flex-end',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(245,245,240,0.4)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  lineHeight: 1,
                  marginBottom: '1.5rem',
                  padding: 0,
                }}
              >
                ✕
              </button>

              {/* Member photo (small) */}
              <div style={{
                width: 64, height: 64,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(35,184,204,0.4)',
                marginBottom: '1rem',
              }}>
                <img
                  src={selected.img}
                  alt={selected.name}
                  referrerPolicy="no-referrer"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>

              <h2 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display), sans-serif',
                color: '#F5F5F0',
                margin: '0 0 0.3rem',
              }}>
                {selected.name}
              </h2>
              <p style={{
                fontSize: '0.72rem',
                color: '#23B8CC',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                margin: '0 0 1.25rem',
              }}>
                {selected.role}
              </p>

              <div style={{
                height: 1,
                background: 'rgba(255,255,255,0.07)',
                marginBottom: '1.25rem',
              }} />

              <p style={{
                fontSize: '0.82rem',
                color: '#BFBFB8',
                lineHeight: 1.65,
                margin: '0 0 0.75rem',
              }}>
                {selected.sub}
              </p>
              <p style={{
                fontSize: '0.78rem',
                color: 'rgba(191,191,184,0.55)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {selected.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Card hover overlay style */}
      <style>{`
        [data-animate] > div .card-overlay { opacity: 0; }
        [data-animate] > div:hover .card-overlay { opacity: 1 !important; background: rgba(10,10,10,0.45) !important; }
      `}</style>
    </section>
  );
}
