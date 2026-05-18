import { useScrollWords } from '../../js/useScrollWords';

const words = [
  'We','design','and','build','digital',
  'experiences','that','make','your','audience',
  'stop','scrolling','and','start',
];

export default function Intro() {
  useScrollWords('intro-statement');

  return (
    <section
      id="intro-statement"
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        paddingLeft: 'max(1.25rem, 5vw)',
        paddingRight: 'max(1.25rem, 5vw)',
      }}
    >
      <p
        style={{
          fontSize: 'clamp(1.15rem, 3vw, 2.6rem)',
          fontWeight: 500,
          fontFamily: 'var(--font-display), sans-serif',
          textAlign: 'center',
          maxWidth: 780,
          margin: '0 auto',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
        }}
      >
        {words.map((w, i) => (
          <span key={i} className="scroll-word" style={{ marginRight: '0.3em' }}>{w}</span>
        ))}
        <span className="scroll-word" style={{ marginRight: '0.3em' }}>
          <span style={{ color: '#23B8CC' }}>clicking</span>.
        </span>
      </p>
    </section>
  );
}
