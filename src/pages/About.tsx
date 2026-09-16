export default function About() {
  const aboutLinks: { num: string; title: string; desc: string; href: string }[] = [
    { num: '01', title: 'Our Story', desc: 'Get to know where Little Wonders began.', href: '/our-story' },
    { num: '02', title: 'Our Wonder Team', desc: 'Meet the people behind our care.', href: '/wonder-team' },
    { num: '03', title: 'Values, Mission & Sustainability', desc: 'What guides the way we work.', href: '/values-mission-sustainability' },
    { num: '04', title: 'Our Ratios', desc: 'More individual attention and peace of mind.', href: '/ratios' },
    { num: '05', title: 'Team Safety', desc: 'Safety and wellbeing for everyone.', href: '/team-safety' },
    { num: '06', title: 'FAQ', desc: 'A few things you might be wondering.', href: '/faq' },
  ];

  return (
    <main>
      <div className="page-hero">
        <p className="eyebrow">Little Wonders</p>
        <h1>About Us</h1>
        <p>A little more wonder in everyday.</p>
      </div>
      <div className="about-landing">
        <div className="about-feature-image"></div>
        <section className="about-intro">
          <p className="eyebrow">Care, made personal</p>
          <h2>Thoughtful care for little wonders.</h2>
          <p>Little Wonders is built around safe, warm and professional care for children and families.</p>
          <div className="about-links">
            {aboutLinks.map((link) => (
              <a key={link.href} href={link.href}>
                <span>{link.num}</span>
                <strong>{link.title}</strong>
                <small>{link.desc}</small>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
