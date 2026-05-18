const team = [
  {
    img: 'https://lh3.googleusercontent.com/d/1pJT6YDMDYg3dV7lrO8TNddPdSrvF-Mec',
    name: 'Jerson Sidamon',
    role: 'Founder & CEO',
    sub: 'Project Manager · Sr. Web Developer · QA Lead · QMS Owner',
    desc: 'Owns: delivery, QA sign-off, build methodology, business direction',
  },
  {
    img: 'https://lh3.googleusercontent.com/d/14K3dZVRHAXrTIDrvHwvoxW3FzUTzX2eJ',
    name: 'Junnel Tomales',
    role: 'Co-Founder',
    sub: 'Sr. Web Developer · Tech Stack Manager',
    desc: 'Owns: hosting, DNS, staging environment, tech infrastructure',
  },
  {
    img: 'https://lh3.googleusercontent.com/d/13QOi-TmU520yHzkKGsUN4CLcrj_D3dOF',
    name: 'Ihna Grace Simon',
    role: 'Co-Founder',
    sub: 'Admin DCC & HR · Jr. Web Developer · Sales & Outreach',
    desc: 'Owns: HR, team onboarding, document control, internal comms',
  },
  {
    img: 'https://lh3.googleusercontent.com/d/1OiPe1VbFDgCV4c3RNWwna7KJUyLrJt4Z',
    name: 'Sweet Marielle May Bunuan',
    role: 'Co-Founder',
    sub: 'Admin DCC & Finance · Jr. Web Developer · Sales & Outreach',
    desc: 'Owns: finance, bookkeeping, billing, deposit tracking',
  },
];

export default function About() {
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
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  borderRadius: 4,
                  marginBottom: '1rem',
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                    background: 'rgba(255,255,255,0.04)',
                  }}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.parentElement.style.display = 'flex';
                    e.currentTarget.parentElement.style.alignItems = 'center';
                    e.currentTarget.parentElement.style.justifyContent = 'center';
                    e.currentTarget.insertAdjacentHTML('afterend', '<span style="color:rgba(245,245,240,0.2);font-size:0.7rem;letter-spacing:0.1em;">Photo</span>');
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display), sans-serif',
                  color: '#F5F5F0',
                  margin: '0 0 0.25rem',
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#23B8CC',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  margin: '0 0 0.3rem',
                }}
              >
                {member.role}
              </p>
              {member.sub && (
                <p style={{ fontSize: '0.7rem', color: '#BFBFB8', margin: '0 0 0.3rem', lineHeight: 1.5 }}>
                  {member.sub}
                </p>
              )}
              {member.desc && (
                <p style={{ fontSize: '0.68rem', color: 'rgba(191,191,184,0.55)', margin: 0, lineHeight: 1.5 }}>
                  {member.desc}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
