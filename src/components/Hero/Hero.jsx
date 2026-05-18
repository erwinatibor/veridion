import { useState, useEffect, useRef } from 'react';

const PLATFORMS = [
  { name: 'CHATGPT',   dotCls: 'live-pulse',    status: 'CITED',     cls: 'ok'  },
  { name: 'PERPLEXITY',dotCls: 'live-pulse-d2', status: 'NOT CITED', cls: 'bad' },
  { name: 'GEMINI',    dotCls: 'live-pulse-d3', status: 'PARTIAL',   cls: 'mid' },
  { name: 'CLAUDE',    dotCls: '',              status: 'NOT CITED', cls: 'bad' },
  { name: 'COPILOT',   dotCls: '',              status: 'NOT CITED', cls: 'bad' },
];

const FINAL = [
  { status: 'CITED',     cls: 'ok'  },
  { status: 'NOT CITED', cls: 'bad' },
  { status: 'PARTIAL',   cls: 'mid' },
  { status: 'NOT CITED', cls: 'bad' },
  { status: 'NOT CITED', cls: 'bad' },
];

const DOT_COLOR = { ok: '#23B8CC', bad: 'rgba(245,245,240,0.18)', mid: '#FFB547' };
const STAT_COLOR = { ok: '#23B8CC', bad: '#FF6B6B', mid: '#FFB547', '': 'rgba(245,245,240,0.45)' };

export default function Hero({ onContactOpen }) {
  const [platforms, setPlatforms] = useState(PLATFORMS);
  const [phase,     setPhase]     = useState('complete'); // idle | analyzing | complete
  const [score,     setScore]     = useState(22);
  const [scanInput, setScanInput] = useState('');
  const fillRef = useRef(null);

  // Animate fill to 22% on mount
  useEffect(() => {
    const t = setTimeout(() => {
      if (fillRef.current) fillRef.current.style.width = '22%';
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const runScan = () => {
    if (phase === 'analyzing') return;
    setPhase('analyzing');
    setPlatforms(PLATFORMS.map(p => ({ ...p, status: '···', cls: '' })));
    setScore(0);

    // Instantly reset fill bar without transition, then re-enable
    if (fillRef.current) {
      fillRef.current.style.transition = 'none';
      fillRef.current.style.width = '0%';
      requestAnimationFrame(() => {
        fillRef.current.style.transition = 'width 1.8s cubic-bezier(0.2,0.8,0.2,1)';
      });
    }

    FINAL.forEach((r, i) => {
      setTimeout(() => {
        setPlatforms(prev => {
          const next = [...prev];
          next[i] = { ...next[i], status: r.status, cls: r.cls };
          return next;
        });
      }, 400 + i * 350);
    });

    setTimeout(() => {
      let n = 0;
      const iv = setInterval(() => {
        n++;
        setScore(n);
        if (n >= 22) {
          clearInterval(iv);
          if (fillRef.current) fillRef.current.style.width = '22%';
          setPhase('complete');
        }
      }, 40);
    }, 2400);
  };

  // Header height: ticker ~36px + nav ~56px = ~92px
  const headerH = 92;

  return (
    <section
      id="hero-section"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Dot grid background */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.28, pointerEvents: 'none' }}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="rgba(245,245,240,0.18)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* Corner brackets */}
      {[
        { top: headerH + 14, left: 14,   borderTop: true,  borderLeft: true  },
        { top: headerH + 14, right: 14,  borderTop: true,  borderRight: true },
        { bottom: 52,        left: 14,   borderBottom: true,borderLeft: true  },
        { bottom: 52,        right: 14,  borderBottom: true,borderRight: true },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 10, height: 10,
            top: c.top, bottom: c.bottom,
            left: c.left, right: c.right,
            borderTop:    c.borderTop    ? '0.5px solid rgba(245,245,240,0.22)' : 'none',
            borderBottom: c.borderBottom ? '0.5px solid rgba(245,245,240,0.22)' : 'none',
            borderLeft:   c.borderLeft   ? '0.5px solid rgba(245,245,240,0.22)' : 'none',
            borderRight:  c.borderRight  ? '0.5px solid rgba(245,245,240,0.22)' : 'none',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Main two-column content */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1.45fr 1fr',
          gap: 28,
          paddingTop: headerH + 56,
          paddingBottom: 80,
          paddingLeft: 'max(1.25rem, 5vw)',
          paddingRight: 'max(1.25rem, 5vw)',
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
              letterSpacing: '0.04em',
              color: 'rgba(245,245,240,0.52)',
              marginBottom: 22,
            }}
          >
            <span style={{ width: 22, height: 1, background: '#23B8CC', display: 'inline-block' }} />
            <b style={{ fontWeight: 600, color: '#23B8CC', letterSpacing: '0.04em' }}>01</b>
            <span>— AI VISIBILITY STUDIO</span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display), sans-serif',
              fontSize: 'clamp(2rem, 4.2vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
              color: '#FAFAF9',
            }}
          >
            Most businesses<br />
            are{' '}
            <span style={{ color: 'rgba(245,245,240,0.38)' }}>
              invisible
            </span>
            {' '}to AI.<br />
            We render them<br />
            <span style={{ color: '#23B8CC' }}>
              back into view.
            </span>
          </h1>

          {/* Deck */}
          <p
            style={{
              fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
              lineHeight: 1.7,
              color: 'rgba(245,245,240,0.52)',
              maxWidth: 400,
              margin: '1.6rem 0 1.8rem',
            }}
          >
            We rebuild legacy websites for an audience that no longer types into
            Google. SEO foundations. GEO activation. Fifteen days. Five founders.
            Every build signed.
          </p>

          {/* Scan input */}
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, maxWidth: 460 }}>
            <input
              value={scanInput}
              onChange={e => setScanInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runScan()}
              placeholder="enter a business — service, city"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                borderBottom: '0.5px solid rgba(245,245,240,0.22)',
                padding: '9px 0',
                fontSize: 13,
                color: '#F5F5F0',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                fontStyle: 'italic',
                minWidth: 0,
              }}
            />
            <button
              onClick={runScan}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#23B8CC',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 10,
                letterSpacing: '0.22em',
                cursor: 'pointer',
                padding: '0 0 0 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                borderBottom: '0.5px solid rgba(245,245,240,0.22)',
              }}
            >
              SCAN <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, letterSpacing: 0 }}>→</span>
            </button>
          </div>

          {/* Meta strip */}
          <div
            style={{
              display: 'flex',
              gap: 26,
              marginTop: 28,
              fontFamily: 'var(--font-body), sans-serif',
              fontSize: 10,
              color: 'rgba(245,245,240,0.4)',
            }}
          >
            {[
              ['EST.',      '2026'],
              ['BUILDS',    '15 days'],
              ['QA POINTS', '10/10'],
            ].map(([k, v]) => (
              <div key={k}>
                <span style={{ color: 'rgba(245,245,240,0.28)', marginRight: 8, letterSpacing: '0.18em' }}>{k}</span>
                <span style={{ color: '#F5F5F0', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — AI Panel ── */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              border: '0.5px solid rgba(245,245,240,0.11)',
              borderRadius: 6,
              padding: '16px 18px 18px',
              overflow: 'hidden',
              background: 'rgba(245,245,240,0.015)',
            }}
          >
            {/* Sweep */}
            <div className="panel-sweep" />

            {/* Panel header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 9,
                letterSpacing: '0.22em',
                color: 'rgba(245,245,240,0.5)',
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: '0.5px solid rgba(245,245,240,0.08)',
              }}
            >
              <span>AI VISIBILITY INDEX</span>
              <span
                style={{
                  color: phase === 'analyzing' ? '#FFB547' : '#23B8CC',
                  transition: 'color 0.3s ease',
                }}
              >
                {phase === 'analyzing' ? 'ANALYZING' : 'COMPLETE'}
              </span>
            </div>

            {/* Platform rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              {platforms.map((p, i) => (
                <div
                  key={p.name}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '12px 1fr auto',
                    gap: 10,
                    alignItems: 'center',
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: 10.5,
                  }}
                >
                  <span
                    className={p.cls === 'ok' || p.cls === 'mid' ? (i === 2 ? 'live-pulse-d3' : `live-pulse${i > 0 ? `-d${i + 1}` : ''}`) : ''}
                    style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: DOT_COLOR[p.cls] ?? 'rgba(245,245,240,0.18)',
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ color: 'rgba(245,245,240,0.85)', letterSpacing: '0.05em' }}>{p.name}</span>
                  <span
                    style={{
                      color: STAT_COLOR[p.cls] ?? 'rgba(245,245,240,0.45)',
                      fontSize: 9.5,
                      letterSpacing: '0.14em',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {p.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Score block */}
            <div style={{ paddingTop: 14, borderTop: '0.5px solid rgba(245,245,240,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 9, letterSpacing: '0.22em', color: 'rgba(245,245,240,0.5)' }}>
                  INDEX SCORE
                </span>
                <span style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#F5F5F0' }}>
                  {score}
                  <span style={{ color: 'rgba(245,245,240,0.3)', fontSize: 14, marginLeft: 2 }}>/100</span>
                </span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 2, background: 'rgba(245,245,240,0.08)', borderRadius: 1, overflow: 'hidden' }}>
                <div
                  ref={fillRef}
                  style={{
                    height: '100%',
                    width: '0%',
                    background: '#23B8CC',
                    transition: 'width 1.8s cubic-bezier(0.2,0.8,0.2,1)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: 9,
                  color: 'rgba(245,245,240,0.35)',
                  marginTop: 8,
                  letterSpacing: '0.04em',
                }}
              >
                <span>BENCHMARK 72</span>
                <span style={{ color: '#FF6B6B' }}>CRITICAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px max(1.25rem, 5vw)',
          borderTop: '0.5px solid rgba(245,245,240,0.07)',
          fontFamily: 'var(--font-body), sans-serif',
          fontSize: 9.5,
          color: 'rgba(245,245,240,0.4)',
          letterSpacing: '0.04em',
        }}
      >
        <span>BUILT ON SEO FOUNDATIONS · ACTIVATED THROUGH GEO</span>
        <span>
          <span style={{ color: '#23B8CC' }}>FOUNDING PARTNERS</span>
          {'  '}
          <span style={{ color: '#F5F5F0', fontVariantNumeric: 'tabular-nums' }}>03 / 16</span>
          {'  '}
          <span style={{ color: 'rgba(245,245,240,0.28)' }}>SLOTS REMAIN</span>
        </span>
      </div>
    </section>
  );
}
