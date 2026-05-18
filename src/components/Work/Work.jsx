import supercarsImg from '../../assets/images/supercars-hero-hq.jpg';
import vikingsImg from '../../assets/images/vikings-hero.jpg';
import savoraImg from '../../assets/images/savora-hero.jpg';
import wcwdImg from '../../assets/images/wcwd-hero.jpg';

const projects = [
  {
    href: '/work/supercars',
    img: supercarsImg,
    title: 'Supercars',
    type: 'Digital Experience',
    tags: ['UX Strategy', 'App & Website Development'],
  },
  {
    href: '/work/tvfc',
    img: vikingsImg,
    title: 'Vikings Fishing',
    type: 'Animated Website',
    tags: ['Web Design', 'Development'],
  },
  {
    href: '/work/savora-collective',
    img: savoraImg,
    title: 'Savora Collective',
    type: 'Brand & Website',
    tags: ['Branding', 'Website Development'],
  },
  {
    href: '/work/wcwd',
    img: wcwdImg,
    title: 'WCWD',
    type: 'Campaign Website',
    tags: ['UI Design', 'Development'],
  },
];

export default function Work() {
  return (
    <section
      id="work"
      style={{
        paddingTop: '8rem',
        paddingBottom: '8rem',
        paddingLeft: 'max(1.25rem, 5vw)',
        paddingRight: 'max(1.25rem, 5vw)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
          <p
            data-animate="scroll-up"
            style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#F5F5F0', fontWeight: 500 }}
          >
            Some Of Our Work
          </p>
          <a
            href="/work"
            data-animate="scroll-up"
            className="nav-link"
            style={{ color: '#F5F5F0', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
          >
            View All →
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {projects.map((p, i) => (
            <a key={i} href={p.href} style={{ textDecoration: 'none', color: '#F5F5F0' }}>
              <div data-animate="scroll-up" data-delay={String(i * 0.05)}>
                <div className="work-img-wrap">
                  <img src={p.img} alt={p.title} className="work-img" />
                  <div className="work-overlay"><span>View Case Study →</span></div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    marginTop: '1rem',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)', fontWeight: 600, margin: 0 }}>{p.title}</h3>
                    <p style={{ color: '#BFBFB8', fontSize: '0.82rem', marginTop: '0.25rem', marginBottom: 0 }}>{p.type}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {p.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.7rem',
                          color: '#BFBFB8',
                          border: '1px solid rgba(191,191,184,0.25)',
                          padding: '0.4rem 0.85rem',
                          borderRadius: 100,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
