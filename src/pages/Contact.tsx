import { useState } from 'react';
import { Link } from 'react-router-dom';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = String(value); });

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
      const response = await fetch(`${supabaseUrl}/functions/v1/send-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ formType: 'contact', formData: data }),
      });

      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setState('success');
      form.reset();
    } catch {
      setState('error');
      setErrorMsg('Something went wrong sending your message. Please try again or call us on 0488 233 252.');
    }
  };

  if (state === 'success') {
    return (
      <main>
        <div className="registration-shell" style={{ textAlign: 'center', padding: '120px 20px' }}>
          <h1 style={{ fontSize: '48px', color: '#315f89', fontFamily: "'Cormorant Garamond',serif" }}>Thank you!</h1>
          <p style={{ fontSize: '16px', color: '#637180', lineHeight: 1.7, maxWidth: '500px', margin: '20px auto' }}>
            Your message has been sent. Our team will be in touch with you shortly.
          </p>
          <Link className="button" to="/">Return Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="page-hero">
        <p className="eyebrow">Little Wonders</p>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you.</p>
      </div>
      <div className="registration-shell" style={{ paddingBottom: 82 }}>
        <div className="registration-layout">
          <aside className="registration-aside">
            <h3>Get in touch</h3>
            <p className="registration-aside-note">
              Send us a quick message and we'll get back to you as soon as we can. For detailed enquiries, please use the event or parent registration forms.
            </p>
            <p className="registration-aside-note" style={{ borderTop: 0, paddingTop: 0, marginTop: 12 }}>
              Or call us directly on <strong style={{ color: '#426b8d' }}>0488 233 252</strong>.
            </p>
          </aside>
          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="registration-form-card">
              <p className="required-note"><span>*</span> Required fields.</p>

              <fieldset className="form-section" data-section="Contact" style={{ paddingBottom: 0 }}>
                <legend>Send us a message<small>We'll reply to your email as soon as we can.</small></legend>
                <div className="form-grid">
                  <div className="field full">
                    <label htmlFor="name">Your name <span>*</span></label>
                    <input id="name" name="name" type="text" required placeholder="Jane Doe" />
                  </div>
                  <div className="field full">
                    <label htmlFor="email">Email address <span>*</span></label>
                    <input id="email" name="email" type="email" required placeholder="jane@email.com" />
                  </div>
                  <div className="field full">
                    <label htmlFor="message">Message <span>*</span></label>
                    <textarea id="message" name="message" required placeholder="How can we help?" />
                  </div>
                </div>
              </fieldset>

              {state === 'error' && (
                <div className="form-status is-visible is-error" style={{ marginTop: 18 }}>{errorMsg}</div>
              )}

              <div className="form-actions">
                <button className="button" type="submit" disabled={state === 'submitting'}>
                  {state === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                <button className="button secondary" type="reset">Clear</button>
              </div>
            </div>
          </form>
        </div>
        <p className="registration-footer-link">
          Prefer to speak with us first? <Link to="/#contact">Return to the connection form</Link> or call 0488 233 252.
        </p>
      </div>
    </main>
  );
}
