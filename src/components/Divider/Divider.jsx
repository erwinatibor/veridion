export default function Divider() {
  return (
    <div style={{ padding: '0 max(1.25rem, 5vw)' }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(191,191,184,0.25), transparent)',
      }} />
    </div>
  );
}
