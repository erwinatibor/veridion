import { useScrollWords } from '../../js/useScrollWords';

const headingWords = ['Ready', 'to', 'build', 'something'];
const bodyWords = [
  'We','take','on','a','limited','number','of','projects','to','give',
  'every','client','our','full','attention.','If','that','sounds','like',
  'what',"you're",'after,',"let's",'talk.',
];

export default function Contact({ onContactOpen }) {
  useScrollWords('contact');

  return (
    <section
      id="contact"
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 'max(1.25rem, 5vw)',
        paddingRight: 'max(1.25rem, 5vw)',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 580 }}>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            fontWeight: 700,
            fontFamily: 'var(--font-display), sans-serif',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            marginBottom: '1.25rem',
          }}
        >
          {headingWords.map((w, i) => (
            <span key={i} className="scroll-word" style={{ marginRight: '0.3em' }}>{w}</span>
          ))}
          <span className="scroll-word" style={{ marginRight: 0 }}>
            <span style={{ color: '#23B8CC' }}>exceptional</span>?
          </span>
        </h2>

        <p style={{ color: '#BFBFB8', fontSize: 'clamp(0.85rem, 1.4vw, 1rem)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          {bodyWords.map((w, i) => (
            <span key={i} className="scroll-word" style={{ marginRight: '0.25em' }}>{w}</span>
          ))}
        </p>

        <button
          onClick={onContactOpen}
          className="cta-btn"
          style={{
            padding: '0.9rem 2rem',
            background: '#23B8CC',
            color: '#0A0A0A',
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(35,184,204,0.15)',
            fontFamily: 'inherit',
          }}
        >
          Request a Discovery Call →
        </button>
      </div>
    </section>
  );
}
