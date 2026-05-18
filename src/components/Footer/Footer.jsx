export default function Footer({ onContactOpen }) {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.07)' }}>

      {/* Main footer body */}
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '5rem max(1.25rem, 5vw) 3.5rem',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* LEFT — CTA */}
        <div>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
              fontWeight: 700,
              fontFamily: 'var(--font-display), sans-serif',
              color: '#F5F5F0',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              margin: '0 0 0.6rem',
            }}
          >
            AI search is growing.<br />
            Your visibility isn't.
          </h2>
          <p style={{ color: '#BFBFB8', fontSize: '0.82rem', lineHeight: 1.65, margin: '0 0 1.8rem' }}>
            Contact the Veridion team anytime.
          </p>
          <button
            onClick={onContactOpen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: '#23B8CC',
              border: '1px solid #23B8CC',
              borderRadius: 100,
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body), sans-serif',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#23B8CC'; e.currentTarget.style.color = '#0A0A0A'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#23B8CC'; }}
          >
            LET'S BUILD ↗
          </button>
        </div>

        {/* MIDDLE — Navigation */}
        <div>
          <p style={labelStyle}>Navigation</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
              { label: 'Work',   href: '#work'    },
              { label: 'Method', href: '#process' },
              { label: 'Studio', href: '#about'   },
              { label: 'Talk',   href: '#contact' },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={navItemStyle}
                onMouseEnter={e => e.currentTarget.style.color = '#F5F5F0'}
                onMouseLeave={e => e.currentTarget.style.color = '#BFBFB8'}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* RIGHT — Connect */}
        <div>
          <p style={labelStyle}>Connect</p>
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '2rem' }}>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/veridionstudiosofficial/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialBtnStyle}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#23B8CC'; e.currentTarget.style.color = '#23B8CC'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#BFBFB8'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/veridion-studio/"
              target="_blank"
              rel="noopener noreferrer"
              style={socialBtnStyle}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#23B8CC'; e.currentTarget.style.color = '#23B8CC'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#BFBFB8'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/veridionstudiosofficial"
              target="_blank"
              rel="noopener noreferrer"
              style={socialBtnStyle}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#23B8CC'; e.currentTarget.style.color = '#23B8CC'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#BFBFB8'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>

          <p style={labelStyle}>Headquarters</p>
          <p style={infoStyle}>Manila, Philippines</p>

          <p style={{ ...labelStyle, marginTop: '1.25rem' }}>Email</p>
          <a href="mailto:contact@veridion.ph" style={{ ...infoStyle, textDecoration: 'none', color: '#BFBFB8' }}
            onMouseEnter={e => e.currentTarget.style.color = '#23B8CC'}
            onMouseLeave={e => e.currentTarget.style.color = '#BFBFB8'}
          >
            contact@veridion.ph
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '1.25rem max(1.25rem, 5vw)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', color: '#F5F5F0' }}>
            VERIDION
          </span>
          <span style={{ color: '#BFBFB8', fontSize: '0.72rem' }}>
            © 2026 Veridion. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Terms of Use', 'Privacy Policy'].map(t => (
              <a key={t} href="#" style={{ color: '#BFBFB8', fontSize: '0.72rem', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#F5F5F0'}
                onMouseLeave={e => e.currentTarget.style.color = '#BFBFB8'}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

const labelStyle = {
  fontSize: '0.65rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(191,191,184,0.55)',
  fontWeight: 500,
  marginBottom: '1rem',
};

const navItemStyle = {
  color: '#BFBFB8',
  fontSize: '0.95rem',
  textDecoration: 'none',
  transition: 'color 0.25s ease',
  fontWeight: 400,
};

const infoStyle = {
  color: '#BFBFB8',
  fontSize: '0.88rem',
  lineHeight: 1.5,
  margin: 0,
};

const socialBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 34,
  height: 34,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.18)',
  color: '#BFBFB8',
  textDecoration: 'none',
  transition: 'border-color 0.25s ease, color 0.25s ease',
};
