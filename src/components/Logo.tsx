import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const mainColor = variant === 'light' ? 'text-cream-50' : 'text-sage-700';
  const subColor = variant === 'light' ? 'text-cream-200' : 'text-clay-500';

  return (
    <Link to="/" className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className={`font-serif text-2xl md:text-3xl font-medium tracking-wide ${mainColor}`}>
        Little Wonders
      </span>
      <span className={`font-sans text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] mt-1 ${subColor}`}>
        Wedding &amp; Event Childcare
      </span>
    </Link>
  );
}
