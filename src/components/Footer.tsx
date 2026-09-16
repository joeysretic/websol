import { Link } from 'react-router-dom';

const footerLinks: { label: string; href: string }[] = [
  { label: 'Wedding Childcare', href: '/#services' },
  { label: 'Care Options', href: '/care-options' },
  { label: 'Private & Corporate Care', href: '/#services' },
  { label: 'Group Bookings', href: '/#services' },
  { label: 'Defence Care', href: '/#services' },
  { label: 'About Us', href: '/about' },
  { label: 'Event Registration', href: '/event-registration' },
  { label: 'Parent Registration', href: '/parent-registration' },
  { label: 'Journal', href: '/#journal' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link className="brand" to="/">
          <img className="brand-logo" src="/assets/littlewonders-logo.png" alt="Little Wonders" />
        </Link>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.label} to={link.href}>{link.label}</Link>
          ))}
        </div>
        <div className="social">
          <a href="#">◎</a>
          <a href="#">f</a>
          <a href="#">p</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 Little Wonders Babysitting &amp; Events Service</span>
        <a href="/privacy">Privacy Policy</a>
        <a href="#">Terms &amp; Conditions</a>
        <span>Est. September 2013</span>
        <span className="motto">Safe. Warm. Professional.</span>
      </div>
    </footer>
  );
}
