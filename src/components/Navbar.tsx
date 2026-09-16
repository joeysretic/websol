import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks: { label: string; href: string }[] = [
  { label: 'Wedding Childcare', href: '/#services' },
  { label: 'Care Options', href: '/care-options' },
  { label: 'Private & Corporate Care', href: '/#services' },
  { label: 'Group Bookings', href: '/#services' },
  { label: 'Defence Care', href: '/#services' },
];

const aboutDropdown: { label: string; href: string }[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Our Wonder Team', href: '/wonder-team' },
  { label: 'Values, Mission & Sustainability', href: '/values-mission-sustainability' },
  { label: 'Our Ratios', href: '/ratios' },
  { label: 'Team Safety', href: '/team-safety' },
  { label: 'FAQ', href: '/faq' },
];

const eventsDropdown: { label: string; href: string }[] = [
  { label: 'Event Registration', href: '/event-registration' },
  { label: 'Parent Registration', href: '/parent-registration' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href || location.pathname === href.replace(/\/$/, '');

  return (
    <>
      {/* Registration strip */}
      <div className="registration-strip">
        <div className="registration-strip-inner">
          <span className="registration-strip-label">Ready to register?</span>
          <div className="registration-strip-links">
            <Link to="/event-registration">
              Event Registration <span aria-hidden="true">→</span>
            </Link>
            <Link to="/parent-registration">
              Parent Registration <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Announcement bar */}
      <div className="announcement">
        <span>✦</span> Premium Wedding &amp; Event Childcare Across Southern Queensland
        <div>
          <Link to="/#contact">Enquire</Link>
          <i></i>
          <Link to="/#contact">Book Your Connection Call</Link>
        </div>
      </div>

      {/* Header */}
      <header className="site-header">
        <Link className="brand" to="/">
          <img className="brand-logo" src="/assets/littlewonders-logo.png" alt="Little Wonders" />
        </Link>
        <button
          className="menu"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <nav className={menuOpen ? 'open' : ''}>
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div
            className={`nav-dropdown ${aboutOpen ? 'open' : ''}`}
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <Link
              to="/about"
              aria-haspopup="true"
              onClick={(e) => {
                if (window.innerWidth <= 760) {
                  e.preventDefault();
                  setAboutOpen(!aboutOpen);
                }
              }}
            >
              About Us
            </Link>
            <div className="dropdown-menu">
              {aboutDropdown.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={() => { setMenuOpen(false); setAboutOpen(false); }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div
            className={`nav-dropdown event-dropdown ${eventsOpen ? 'open' : ''}`}
            onMouseEnter={() => setEventsOpen(true)}
            onMouseLeave={() => setEventsOpen(false)}
          >
            <Link
              to="/event-registration"
              aria-haspopup="true"
              aria-current={isActive('/event-registration') || isActive('/parent-registration') ? 'page' : undefined}
              onClick={(e) => {
                if (window.innerWidth <= 760) {
                  e.preventDefault();
                  setEventsOpen(!eventsOpen);
                }
              }}
            >
              Events
            </Link>
            <div className="dropdown-menu">
              {eventsDropdown.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={() => { setMenuOpen(false); setEventsOpen(false); }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/#journal" onClick={() => setMenuOpen(false)}>Journal</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
        <Link className="button small" to="/#contact" onClick={() => setMenuOpen(false)}>
          Book Your Connection Call
        </Link>
      </header>
    </>
  );
}
