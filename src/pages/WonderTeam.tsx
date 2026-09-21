import { Link } from 'react-router-dom';

const minRequirements = [
  'Minimum 18 years of age',
  'Blue Card (QLD) or Ochre Card (NT)',
  'First Aid & CPR (HLTAID004 Childcare first aid "ACECQA approved")',
  "Driver's License (P or Opens)",
  'Safe and reliable vehicle (with road safety certificate)',
  'Exceptional written and verbal communication skills',
  'Hold a current public liability insurance policy',
  'Be punctual and presentable',
];

const desiredRequirements = [
  "Minimum 2 years' experience with children under 16 years of age",
  'Qualified in or studying towards a minimum Certificate III in Childcare, Education or Health related qualifications',
];

const phases = [
  { num: 'ONE', title: 'Application Submission' },
  { num: 'TWO', title: 'Shortlisting' },
  { num: 'THREE', title: 'Interviews' },
  { num: 'FOUR', title: 'Reference Check & Qualifications' },
  { num: 'FIVE', title: 'Survey Registration' },
  { num: 'SIX', title: 'Contract Sign' },
  { num: 'SEVEN', title: 'Inductions' },
];

export default function WonderTeam() {
  return (
    <main>
      <div className="page-hero">
        <p className="eyebrow">Little Wonders</p>
        <h1>Our Wonder Team</h1>
        <p>Carefully chosen. Personally selected.</p>
      </div>

      <div className="wonder-team-content">
        {/* Intro */}
        <section className="wonder-intro">
          <div className="wonder-intro-copy">
            <p className="eyebrow">Care, made personal</p>
            <h2>Carefully chosen. Personally selected. Here because they genuinely care.</h2>
            <p>Choosing someone to care for your children takes trust. That's why every member of our Team is personally recruited and selected in house by our Director.</p>
            <p>Qualifications, experience and required checks matter — but we believe exceptional care goes beyond what's written on a certificate.</p>
            <p>We look for warmth, intuition, professionalism and a genuine passion for children. It's noticing when a little one isn't quite themselves, spotting a potential risk, getting down on the floor to play, or knowing when an extra cuddle is needed.</p>
            <p>Every team member undergoes personal interviews, qualification and check verification, and extensive reference checks before representing Little Wonders.</p>
            <p>Where possible, we also carefully match our team to the ages, needs and personalities of the children, as well as the type of care being provided.</p>
            <p className="wonder-motto">Above all, our Wonder Team reflects the values at the heart of Little Wonders: <strong>Safe. Warm. Professional.</strong></p>
          </div>
          <div className="wonder-intro-image">
            <img src="/assets/wonder-team-1.jpg" alt="Two members of the Wonder Team collaborating together" />
          </div>
        </section>

        {/* Team intro quote */}
        <section className="wonder-quote">
          <h2>Our team (or Wonder Team as we call it!) is made up of extremely amazing people…</h2>
          <p className="wonder-quote-sub">AND WE ARE ALWAYS ON THE SEARCH FOR MORE!</p>
          <p className="wonder-quote-text">We tailor each nanny and babysitting placement to each family's unique needs, ensuring we can get the best possible fit for your family.</p>
        </section>

        {/* Requirements */}
        <div className="wonder-requirements-grid">
          <section className="wonder-requirements">
            <h3>Team Minimum <span>Requirements</span></h3>
            <p className="wonder-requirements-label">of all positions:</p>
            <ul>
              {minRequirements.map((req) => <li key={req}>{req}</li>)}
            </ul>
          </section>
          <section className="wonder-requirements wonder-requirements-desired">
            <h3>Desired <span>Requirements</span></h3>
            <ul>
              {desiredRequirements.map((req) => <li key={req}>{req}</li>)}
            </ul>
          </section>
        </div>

        {/* Selection Process */}
        <section className="wonder-selection">
          <h2>Our Selection Process</h2>
          <p>Our selection process isn't just about qualifications, our team members go through a number of phases to become part of our team. Regardless of qualification not everyone who has the right requirements is necessarily a great fit for our team. We take the time to ensure that only the best possible are part of our team.</p>
          <div className="wonder-phases">
            {phases.map((phase) => (
              <div key={phase.num} className="wonder-phase">
                <span className="wonder-phase-num">Phase {phase.num}</span>
                <strong>{phase.title}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="wonder-cta">
          <h2>Let us help you Find Balance</h2>
          <Link className="button" to="/contact">Contact Us Now &nbsp;→</Link>
        </section>
      </div>
    </main>
  );
}
