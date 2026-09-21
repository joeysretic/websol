import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main id="top">
      {/* Hero */}
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">For beautiful celebrations &amp; the little people you love</span>
          <p className="eyebrow">Premium childcare for families, weddings &amp; events<br />across Southern Queensland</p>
          <h1>Care that makes<br /><em>every moment.</em></h1>
          <div className="script">More present for<br />What matters most.</div>
          <p>Thoughtfully tailored childcare experiences for families, weddings and events across Southern Queensland, so you can be fully present — knowing the little people are safe, happy and creating memories of their own.</p>
          <div className="actions">
            <Link className="button" to="/contact">Book Your Connection Call</Link>
            <Link className="button outline" to="/#services">Explore Our Services</Link>
          </div>
          <div className="hero-note"><span>✦</span> Beautifully considered care, wherever life takes you</div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <div className="image-label">little moments<br /><span>big memories</span></div>
          </div>
          <div className="hero-stamp">SAFE<br /><b>·</b><br />JOYFUL<br /><b>·</b><br />THOUGHTFUL</div>
          <div className="hero-shape"></div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div><span>♡</span><b>Safe Hands</b><p>Low ratios, qualified educators &amp; elevated safety standards.</p></div>
        <div><span>♧</span><b>Warm Hearts</b><p>We genuinely get to know every family and every child.</p></div>
        <div><span>☆</span><b>Professional Care</b><p>Experienced, reliable &amp; dedicated to exceptional service.</p></div>
        <div><span>◌</span><b>Beautifully Styled</b><p>We style our play spaces to match your wedding colours at no extra cost.</p></div>
        <div><span>♧</span><b>Guest Connect</b><p>We connect with your little guests before the big day.</p></div>
        <div><span>♧</span><b>Memories to Keep</b><p>Every child takes home their own special memories.</p></div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <p className="eyebrow centered">Our services</p>
        <h2>Exceptional Childcare for Extraordinary Occasions.</h2>
        <p className="intro">Weddings, events and family moments — with care at the heart.</p>
        <div className="cards">
          <article className="card wedding">
            <div className="card-image corporate-care"></div>
            <div className="card-body">
              <span className="round">♡</span>
              <h3>Wedding Childcare</h3>
              <p>From intimate gatherings to grand celebrations, we create personalised wedding childcare experiences across Southern Queensland so you can relax, celebrate and enjoy every moment.</p>
              <Link to="/contact">Learn more&nbsp; →</Link>
            </div>
          </article>
          <article className="card">
            <div className="card-image party wedding-care"></div>
            <div className="card-body">
              <span className="round">♧</span>
              <h3>Private &amp; Corporate Care</h3>
              <p>Conferences, corporate events, private functions and group bookings. Flexible childcare solutions designed for families, business and special occasions.</p>
              <Link to="/contact">Learn more&nbsp; →</Link>
            </div>
          </article>
          <article className="card">
            <div className="card-image defence"></div>
            <div className="card-body">
              <span className="round">♡</span>
              <h3>Defence Care &amp; Support</h3>
              <p>Proudly supporting Australian Defence families with trusted, flexible childcare solutions — wherever you need us across Queensland.</p>
              <Link to="/contact">Learn more&nbsp; →</Link>
            </div>
          </article>
        </div>
      </section>

      {/* Venues */}
      <section className="venues" id="about">
        <div className="venue-copy">
          <p className="eyebrow">We travel to</p>
          <h2>Extraordinary Venues.</h2>
          <p>From the rolling hills of Maleny and the Sunshine Coast Hinterland to Toowoomba, Brisbane, Tamborine Mountain and beyond, we bring exceptional childcare to Queensland's most beautiful wedding and event locations.</p>
          <div className="regions">
            <a href="#">Maleny &amp; Hinterland</a>
            <a href="#">Sunshine Coast &amp; Noosa</a>
            <a href="#">Brisbane</a>
            <a href="#">Toowoomba &amp; Darling Downs</a>
            <a href="#">Tamborine Mountain</a>
            <a href="#">More Regions</a>
          </div>
        </div>
        <div className="venue-art"></div>
      </section>

      {/* Gallery */}
      <section className="gallery" id="journal">
        <div className="gallery-tile tile-one"></div>
        <div className="gallery-tile tile-two"></div>
        <div className="gallery-tile tile-three"></div>
        <div className="gallery-tile tile-four"></div>
        <a className="gallery-tile tile-five" href="#">Follow us<br /><strong>on Instagram ↗</strong></a>
      </section>

      {/* Connect */}
      <section className="connect" id="contact">
        <p className="eyebrow centered">Let's connect</p>
        <h2>Book Your Complimentary Connection Call</h2>
        <p>A relaxed 15–30 minute chat to talk about your celebration,<br className="desktop" /> answer your questions and see how we can help.</p>
        <a className="button" href="mailto:hello@littlewonders.com.au">Book now&nbsp; →</a>
      </section>
    </main>
  );
}
