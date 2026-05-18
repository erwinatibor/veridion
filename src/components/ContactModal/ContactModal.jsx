import { useState } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`contact-modal-overlay${isOpen ? ' open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="contact-modal">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: '1.3rem', fontWeight: 600, margin: 0 }}>
            Let's Talk
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#BFBFB8',
              cursor: 'pointer',
              fontSize: '1.4rem',
              lineHeight: 1,
              padding: '0.2rem 0.4rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#F5F5F0'}
            onMouseLeave={e => e.currentTarget.style.color = '#BFBFB8'}
          >
            ×
          </button>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ color: '#23B8CC', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Message Sent
            </p>
            <p style={{ color: '#BFBFB8', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              Thanks for reaching out. We'll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              className="form-input"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={update('name')}
              required
            />
            <input
              className="form-input"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={update('email')}
              required
            />
            <textarea
              className="form-input"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={update('message')}
              required
            />
            <button
              type="submit"
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
              Send Message →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
