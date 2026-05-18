import { useState, useEffect } from 'react';
import { useNavScroll } from '../../js/useNavScroll';

function getManilaTime() {
  return new Date().toLocaleTimeString('en-PH', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export default function Header({ onContactOpen }) {
  useNavScroll();

  const [clock, setClock]         = useState(getManilaTime());
  const [scanCount, setScanCount] = useState(1268);

  useEffect(() => {
    let ticks = 0;
    const id = setInterval(() => {
      ticks++;
      setClock(getManilaTime());
      if (ticks % 4 === 0) setScanCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav
      id="main-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Ticker bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '9px max(1.25rem, 5vw)',
          borderBottom: '0.5px solid rgba(245,245,240,0.07)',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: 10,
          color: 'rgba(245,245,240,0.5)',
          letterSpacing: '0.04em',
        }}
      >
        <span
          className="live-pulse"
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#23B8CC', display: 'inline-block', flexShrink: 0 }}
        />
        <span>LIVE</span>
        <span style={{ color: 'rgba(245,245,240,0.2)' }}>·</span>
        <span>VRD-INDEX v1.2</span>
        <span style={{ color: 'rgba(245,245,240,0.2)' }}>·</span>
        <span>
          <span style={{ color: '#F5F5F0', fontVariantNumeric: 'tabular-nums' }}>
            {scanCount.toLocaleString()}
          </span>{' '}businesses scanned today
        </span>
        <span style={{ color: 'rgba(245,245,240,0.2)' }}>·</span>
        <span>
          Manila{' '}
          <span style={{ color: '#F5F5F0', fontVariantNumeric: 'tabular-nums' }}>{clock}</span>{' '}PHT
        </span>
      </div>

      {/* Nav bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem max(1.25rem, 5vw)',
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        <a
          href="#hero-section"
          style={{
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
            color: '#F5F5F0',
            textDecoration: 'none',
          }}
        >
          VERIDION
        </a>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#work"    className="nav-link" style={navLinkStyle}>Work</a>
          <a href="#process" className="nav-link" style={navLinkStyle}>Method</a>
          <a href="#about"   className="nav-link" style={navLinkStyle}>Studio</a>
          <button
            onClick={onContactOpen}
            className="nav-link"
            style={{ ...navLinkStyle, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Talk
          </button>
        </div>
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: '#F5F5F0',
  fontSize: '0.7rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 500,
  padding: 0,
};
