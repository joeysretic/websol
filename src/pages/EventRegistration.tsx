import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const eventSteps = [
  'Event type', 'Your details', 'Event details', 'Childcare needs', 'Care preferences', 'Privacy & consent',
];

const activityInclusions = [
  'Relaxation / chill out zone', 'Outdoor games and play', 'Winter warmers', 'Cosy corners',
  'Portable cots', 'Individual slumber zones', 'Relaxed slumber zone', 'Child-safe furniture',
  'Television for movies', 'Big kids / teen hang out', 'Other',
];

const optionalExtras = [
  "Children's snacks and catering", "Children's lunch", "Children's dinner",
  'Face painters', 'Balloon bending', 'Jumping castle', 'Other',
];

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function EventRegistration() {
  const [eventType, setEventType] = useState('');
  const [onsiteChildcare, setOnsiteChildcare] = useState('');
  const [careTimesDifferent, setCareTimesDifferent] = useState('');
  const [childCount, setChildCount] = useState(1);
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setState('submitting');
    setErrorMsg('');

    const formData = new FormData(form);
    const data: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      if (key in data) {
        if (Array.isArray(data[key])) {
          (data[key] as string[]).push(String(value));
        } else {
          data[key] = [String(data[key]), String(value)];
        }
      } else {
        data[key] = String(value);
      }
    });

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
      const response = await fetch(`${supabaseUrl}/functions/v1/send-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({ formType: 'event', formData: data }),
      });

      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setState('success');
      form.reset();
      setEventType('');
      setOnsiteChildcare('');
      setCareTimesDifferent('');
      setChildCount(1);
    } catch {
      setState('error');
      setErrorMsg('Something went wrong submitting your registration. Please try again or call us on 0488 233 252.');
    }
  };

  if (state === 'success') {
    return (
      <main>
        <div className="registration-shell" style={{ textAlign: 'center', padding: '120px 20px' }}>
          <h1 style={{ fontSize: '48px', color: '#315f89', fontFamily: "'Cormorant Garamond',serif" }}>Thank you!</h1>
          <p style={{ fontSize: '16px', color: '#637180', lineHeight: 1.7, maxWidth: '500px', margin: '20px auto' }}>
            We've received your event registration and our team will be in touch shortly to review the details with you.
          </p>
          <Link className="button" to="/">Return Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="registration-hero">
        <div className="registration-shell registration-hero-inner">
          <div className="registration-hero-copy">
            <span className="registration-kicker">Events register</span>
            <h1>Let's make room<br />for <em>little moments.</em></h1>
            <p>Tell us about your event and the care you are planning. Once you complete this form, it will prepare an email for Little Wonders so our team can review the details with you.</p>
          </div>
          <div className="registration-hero-card">
            <img src="/assets/event-children.jpg" alt="Children enjoying a beautifully styled event play space" />
          </div>
        </div>
      </section>

      <div className="registration-shell">
        <section className="registration-intro">
          <h2>Event registration</h2>
          <p>Complete the details below as fully as you can. Fields marked with an asterisk are required; we can clarify anything else together.</p>
        </section>

        <div className="registration-layout">
          <aside className="registration-aside">
            <h3>Your registration</h3>
            <ol>
              {eventSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <p className="registration-aside-note">Your completed form stays in this browser until you choose to prepare the email. It is not stored on this website.</p>
          </aside>

          <form ref={formRef} onSubmit={handleSubmit} autoComplete="on">
            <div className="registration-form-card">
              <p className="required-note"><span>*</span> Required fields. Please do not include information that is not relevant to arranging care.</p>

              {/* Event type */}
              <fieldset className="form-section" data-section="Event type">
                <legend>What kind of event are you planning?<small>Select the option that best describes your event.</small></legend>
                <div className="choice-grid">
                  <label className="choice">
                    <input type="radio" name="event_type" value="defence" required onChange={() => setEventType('defence')} />
                    <span><strong>Defence event</strong>All events and care options including community events.</span>
                  </label>
                  <label className="choice">
                    <input type="radio" name="event_type" value="private" onChange={() => setEventType('private')} />
                    <span><strong>Private event</strong>Wedding, birthday, anniversary or engagement party.</span>
                  </label>
                  <label className="choice">
                    <input type="radio" name="event_type" value="business" onChange={() => setEventType('business')} />
                    <span><strong>Business / corporate</strong>Workshops, meetings, business events and celebrations.</span>
                  </label>
                  <label className="choice">
                    <input type="radio" name="event_type" value="public" onChange={() => setEventType('public')} />
                    <span><strong>Public event</strong>Open day, community day or expo.</span>
                  </label>
                </div>
              </fieldset>

              {/* Your details */}
              <fieldset className="form-section" data-section="Your details">
                <legend>Your details<small>The person or organisation coordinating the event.</small></legend>
                <div className="form-grid">
                  <div className="field"><label htmlFor="surname">Family / surname <span>*</span></label><input id="surname" name="surname" type="text" autoComplete="family-name" required /></div>
                  <div className="field"><label htmlFor="given_names">Given name/s <span>*</span></label><input id="given_names" name="given_names" type="text" autoComplete="given-name" required /></div>
                  <div className="field"><label htmlFor="business_name">Business name</label><input id="business_name" name="business_name" type="text" /></div>
                  <div className="field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required /></div>
                  <div className="field"><label htmlFor="mobile">Mobile <span>*</span></label><input id="mobile" name="mobile" type="tel" autoComplete="tel" required /></div>
                  <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" /></div>
                  <div className="field full"><label htmlFor="address">Street address</label><input id="address" name="address" type="text" autoComplete="street-address" /></div>
                  <div className="field"><label htmlFor="suburb">City / suburb</label><input id="suburb" name="suburb" type="text" autoComplete="address-level2" /></div>
                  <div className="field"><label htmlFor="state">State</label><input id="state" name="state" type="text" autoComplete="address-level1" /></div>
                  <div className="field"><label htmlFor="postcode">Postcode</label><input id="postcode" name="postcode" type="text" inputMode="numeric" autoComplete="postal-code" /></div>
                  <div className="field full"><label htmlFor="postal_address">Postal address, if different</label><textarea id="postal_address" name="postal_address" rows={2}></textarea></div>
                </div>
              </fieldset>

              {/* Event details */}
              <fieldset className="form-section" data-section="Event details">
                <legend>Event details<small>Share the key details so we can understand the shape of your day.</small></legend>
                <div className="form-grid">
                  <div className="field"><label htmlFor="event_name">Event name <span>*</span></label><input id="event_name" name="event_name" type="text" required /></div>
                  <div className="field"><label htmlFor="event_date">Event date <span>*</span></label><input id="event_date" name="event_date" type="date" required /></div>
                  <div className="field"><label htmlFor="start_time">Start time <span>*</span></label><input id="start_time" name="start_time" type="time" required /></div>
                  <div className="field"><label htmlFor="end_time">End time <span>*</span></label><input id="end_time" name="end_time" type="time" required /></div>
                  <div className="field full"><label htmlFor="venue">Location / venue <span>*</span></label><input id="venue" name="venue" type="text" placeholder="Venue name and address" required /></div>
                  <div className="field full"><label htmlFor="second_venue">Second location / venue</label><input id="second_venue" name="second_venue" type="text" /></div>
                  <div className="field"><label htmlFor="expected_attendees">Expected individuals attending <span>*</span></label><input id="expected_attendees" name="expected_attendees" type="number" min="1" required /></div>
                  <div className="field"><label htmlFor="dress_code">Dress code</label><input id="dress_code" name="dress_code" type="text" /></div>
                  <div className="field"><label htmlFor="event_theme">Event theme</label><input id="event_theme" name="event_theme" type="text" /></div>
                  <div className="field full"><label htmlFor="event_purpose">Tell us about the event</label><textarea id="event_purpose" name="event_purpose" placeholder="What would you like Little Wonders to understand about the occasion?"></textarea></div>
                </div>
              </fieldset>

              {/* Defence event details (conditional) */}
              {eventType === 'defence' && (
                <fieldset className="form-section is-visible" data-section="Defence event details">
                  <legend>Defence event details<small>These details help us understand the event context and coordination needs.</small></legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="defence_involvement">Your involvement</label><select id="defence_involvement" name="defence_involvement"><option value="">Please select</option><option>Event host</option><option>Business admin</option><option>Event planner</option><option>Other</option></select></div>
                    <div className="field"><label htmlFor="defence_other">If other, please describe</label><input id="defence_other" name="defence_other" type="text" /></div>
                    <div className="field"><label htmlFor="position_rank">Position / rank</label><input id="position_rank" name="position_rank" type="text" /></div>
                    <div className="field"><label htmlFor="unit">Unit</label><input id="unit" name="unit" type="text" /></div>
                    <div className="field"><label htmlFor="invitation_only">Invitation only?</label><select id="invitation_only" name="invitation_only"><option value="">Please select</option><option>Yes</option><option>No</option></select></div>
                    <div className="field"><label htmlFor="defence_attendees">Who is likely to attend?</label><input id="defence_attendees" name="defence_attendees" type="text" /></div>
                  </div>
                  <div className="subsection"><h3>Location type</h3><div className="choice-grid">
                    {['On base / barracks', 'Restaurant / venue off base', 'Defence-related expo / open day', 'Community hall / centre', 'Other'].map(v => (
                      <label key={v} className="choice"><input type="checkbox" name="location_type" value={v} /><span>{v}</span></label>
                    ))}
                  </div></div>
                  <div className="subsection"><h3>Event access</h3><div className="choice-grid">
                    <label className="choice"><input type="radio" name="security_clearance" value="yes" /><span>Security clearance / sign-on is required</span></label>
                    <label className="choice"><input type="radio" name="security_clearance" value="no" /><span>Security clearance / sign-on is not required</span></label>
                  </div></div>
                </fieldset>
              )}

              {/* Private event details (conditional) */}
              {eventType === 'private' && (
                <fieldset className="form-section is-visible" data-section="Private event details">
                  <legend>Private event details<small>Tell us a little more about the celebration.</small></legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="private_event_type">Event type</label><select id="private_event_type" name="private_event_type"><option value="">Please select</option><option>Wedding</option><option>Birthday - adult</option><option>Birthday - child</option><option>Anniversary</option><option>Engagement</option><option>Christmas party</option><option>Christening</option><option>Other</option></select></div>
                    <div className="field"><label htmlFor="private_involvement">Your involvement</label><select id="private_involvement" name="private_involvement"><option value="">Please select</option><option>Guest</option><option>Host</option><option>Planner</option><option>Other</option></select></div>
                  </div>
                </fieldset>
              )}

              {/* Business event details (conditional) */}
              {eventType === 'business' && (
                <fieldset className="form-section is-visible" data-section="Business event details">
                  <legend>Business / corporate details<small>Help us understand the format and the families attending.</small></legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="business_event_type">Event type</label><select id="business_event_type" name="business_event_type"><option value="">Please select</option><option>Meeting</option><option>Workshop / class</option><option>Business Christmas party</option><option>Expo</option><option>Regular event</option><option>Other</option></select></div>
                    <div className="field"><label htmlFor="business_involvement">Your involvement</label><select id="business_involvement" name="business_involvement"><option value="">Please select</option><option>Guest</option><option>Host</option><option>Planner</option><option>Business admin</option><option>Other</option></select></div>
                  </div>
                </fieldset>
              )}

              {/* Public event details (conditional) */}
              {eventType === 'public' && (
                <fieldset className="form-section is-visible" data-section="Public event details">
                  <legend>Public event details<small>Tell us how the event is being run.</small></legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="public_event_type">Event type</label><select id="public_event_type" name="public_event_type"><option value="">Please select</option><option>Public free entry</option><option>Public ticket only</option><option>Private business ticket only</option><option>Open day</option><option>Community day</option><option>Expo</option><option>Other</option></select></div>
                    <div className="field"><label htmlFor="public_involvement">Your involvement</label><select id="public_involvement" name="public_involvement"><option value="">Please select</option><option>Guest</option><option>Host</option><option>Planner</option><option>Business admin</option><option>Other</option></select></div>
                  </div>
                </fieldset>
              )}

              {/* Childcare needs */}
              <fieldset className="form-section" data-section="Childcare needs">
                <legend>Childcare needs<small>We'll use these details to shape a safe, comfortable experience for children.</small></legend>
                <div className="form-grid">
                  <div className="field full">
                    <span className="field-label">Will onsite childcare be provided? <span>*</span></span>
                    <div className="choice-grid">
                      <label className="choice"><input type="radio" name="onsite_childcare" value="yes" required onChange={() => setOnsiteChildcare('yes')} /><span>Yes, I'm enquiring about onsite childcare</span></label>
                      <label className="choice"><input type="radio" name="onsite_childcare" value="no" required onChange={() => setOnsiteChildcare('no')} /><span>No, I'm making an enquiry about another care option</span></label>
                    </div>
                  </div>
                  <div className="field full">
                    <span className="field-label">Will care times be different from the event times?</span>
                    <div className="choice-grid">
                      <label className="choice"><input type="radio" name="care_times_different" value="yes" onChange={() => setCareTimesDifferent('yes')} /><span>Yes</span></label>
                      <label className="choice"><input type="radio" name="care_times_different" value="no" onChange={() => setCareTimesDifferent('no')} /><span>No</span></label>
                    </div>
                  </div>
                </div>

                {careTimesDifferent === 'yes' && (
                  <div className="conditional is-visible subsection">
                    <h3>Care times</h3>
                    <div className="form-grid">
                      <div className="field"><label htmlFor="care_start">Expected care start</label><input id="care_start" name="care_start" type="time" /></div>
                      <div className="field"><label htmlFor="care_finish">Expected care finish</label><input id="care_finish" name="care_finish" type="time" /></div>
                    </div>
                  </div>
                )}

                {onsiteChildcare === 'yes' && (
                  <div className="conditional is-visible subsection">
                    <h3>Children attending</h3>
                    <div className="form-grid">
                      <div className="field"><label htmlFor="number_children">Number of children <span>*</span></label><input id="number_children" name="number_children" type="number" min="1" max="100" required /></div>
                      <div className="field"><label htmlFor="age_group">Age group/s</label><input id="age_group" name="age_group" type="text" placeholder="For example: babies, toddlers, school age" /></div>
                      <div className="field full"><span className="field-label">Are there severe allergies?</span><div className="choice-grid">
                        <label className="choice"><input type="radio" name="severe_allergies" value="yes" /><span>Yes</span></label>
                        <label className="choice"><input type="radio" name="severe_allergies" value="no" /><span>No</span></label>
                      </div></div>
                      <div className="field full"><label htmlFor="allergy_details">Allergy details and management information</label><textarea id="allergy_details" name="allergy_details"></textarea></div>
                      <div className="field full"><span className="field-label">Is there a medical condition or disability we should plan for?</span><div className="choice-grid">
                        <label className="choice"><input type="radio" name="medical_needs" value="yes" /><span>Yes</span></label>
                        <label className="choice"><input type="radio" name="medical_needs" value="no" /><span>No</span></label>
                      </div></div>
                      <div className="field full"><label htmlFor="medical_details">Medical, access or support details</label><textarea id="medical_details" name="medical_details"></textarea></div>
                      <div className="field full"><label htmlFor="childcare_details">Other childcare information</label><textarea id="childcare_details" name="childcare_details" placeholder="Routines, comfort needs, interests or anything else that will help us prepare."></textarea></div>
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Activity packages */}
              <fieldset className="form-section" data-section="Activity packages">
                <legend>Activity packages<small>Let us know which atmosphere or activities would suit the children and the event.</small></legend>
                <div className="subsection" style={{ marginTop: 0, paddingTop: 0, borderTop: 0 }}>
                  <h3>Possible inclusions</h3>
                  <div className="choice-grid">
                    {activityInclusions.map(v => (
                      <label key={v} className="choice"><input type="checkbox" name="activity_inclusions" value={v} /><span>{v}</span></label>
                    ))}
                  </div>
                </div>
                <div className="subsection">
                  <h3>Optional extras</h3>
                  <div className="choice-grid">
                    {optionalExtras.map(v => (
                      <label key={v} className="choice"><input type="checkbox" name="optional_extras" value={v} /><span>{v}</span></label>
                    ))}
                  </div>
                </div>
                <div className="field" style={{ marginTop: 18 }}>
                  <label htmlFor="package_other">Other package or extra details</label>
                  <textarea id="package_other" name="package_other"></textarea>
                </div>
              </fieldset>

              {/* Care preferences */}
              <fieldset className="form-section" data-section="Care preferences">
                <legend>Care preferences &amp; notes<small>These details help us plan the right space, transitions and moments of connection.</small></legend>
                <div className="form-grid">
                  <div className="field full"><span className="field-label">Will children need care while travelling between venues?</span><div className="choice-grid">
                    <label className="choice"><input type="radio" name="travel_between_venues" value="yes" /><span>Yes</span></label>
                    <label className="choice"><input type="radio" name="travel_between_venues" value="no" /><span>No</span></label>
                  </div></div>
                  <div className="field full"><label htmlFor="childcare_space">What childcare space is available or planned?</label><textarea id="childcare_space" name="childcare_space"></textarea></div>
                  <div className="field full"><label htmlFor="separate_moments">Are there particular moments when children will separate from parents or guests?</label><textarea id="separate_moments" name="separate_moments"></textarea></div>
                  <div className="field full"><label htmlFor="child_friendly_moments">Which child-friendly moments would you like them to be part of?</label><textarea id="child_friendly_moments" name="child_friendly_moments"></textarea></div>
                  <div className="field full"><label htmlFor="care_preferences">Care preferences</label><textarea id="care_preferences" name="care_preferences" placeholder="Anything about the feel, rhythm or support you would like us to consider."></textarea></div>
                  <div className="field full"><label htmlFor="extra_details">Extra details</label><textarea id="extra_details" name="extra_details"></textarea></div>
                </div>
              </fieldset>

              {/* Privacy & consent */}
              <div className="privacy-note">
                <strong>Privacy notice.</strong> Little Wonders collects only information reasonably necessary to respond to your enquiry and arrange care. This may include contact details, child personal details, health information and relevant care information. See our <Link to="/privacy">Privacy Policy</Link> for more information. Please email any supporting documents separately if our team requests them.
              </div>
              <label className="consent">
                <input type="checkbox" name="privacy_consent" value="I consent to Little Wonders using the information in this form to respond to my event registration enquiry." required />
                <span>I understand and consent to Little Wonders using the information in this form to respond to my event registration enquiry. <span>*</span></span>
              </label>

              {state === 'error' && (
                <div className="form-status is-visible is-error">{errorMsg}</div>
              )}

              <div className="form-actions">
                <button className="button" type="submit" disabled={state === 'submitting'}>
                  {state === 'submitting' ? 'Submitting...' : 'Prepare Event Registration Email'}
                </button>
                <button className="button secondary" type="reset">Clear form</button>
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
