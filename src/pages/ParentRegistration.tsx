import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const parentSteps = [
  'Type of care', 'Parent / guardian details', 'Emergency contact', 'Care preferences', 'Children & health', 'Privacy & consent',
];

const careTypes = [
  { value: 'home', title: 'Care at home', desc: 'Babysitting or family care at home.' },
  { value: 'defence', title: 'Defence care & support', desc: 'For Defence families and emergency services families.' },
  { value: 'event', title: 'Register attendance for an event', desc: 'For a wedding, business party or other event.' },
];

const carePreferencesTypes = [
  'Regular babysitting', 'Wedding care', 'Event care', 'Private / corporate care', 'Group bookings', 'Defence care / support', 'Other',
];

const preferredQualities = [
  'Energetic', 'Creative', 'Innovative', 'Nature lover', 'Clean / tidy', 'Play-based planner',
  'Enthusiastic', 'Nurturing', 'Flexible', 'Forward thinker', 'Punctual', 'Professional', 'LGBTIQA+ friendly',
];

const experiencePreferences = [
  'Childcare experience over 12 months', 'Additional needs experience', 'Infant experience', 'Nursing experience', 'Willing to travel rurally',
];

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function ParentRegistration() {
  const [careType, setCareType] = useState('');
  const [visibleChildren, setVisibleChildren] = useState(1);
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const addChild = () => {
    if (visibleChildren < 4) setVisibleChildren(visibleChildren + 1);
  };

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
        body: JSON.stringify({ formType: 'parent', formData: data }),
      });

      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setState('success');
      form.reset();
      setCareType('');
      setVisibleChildren(1);
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
            We've received your parent registration and our team will be in touch shortly to learn more about your family and the care you're looking for.
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
            <span className="registration-kicker">Families register</span>
            <h1>Thoughtful care<br />for <em>every little wonder.</em></h1>
            <p>Share a little about your family, your children and the care you are looking for. Once complete, this form will prepare an email for Little Wonders so our team can review the details with you.</p>
          </div>
          <div className="registration-hero-card">
            <img src="/assets/babysitting-family.jpg" alt="Child enjoying warm, attentive family care" />
          </div>
        </div>
      </section>

      <div className="registration-shell">
        <section className="registration-intro">
          <h2>Parent registration</h2>
          <p>Complete the details below as fully as you can. Fields marked with an asterisk are required; we can clarify anything else together.</p>
        </section>

        <div className="registration-layout">
          <aside className="registration-aside">
            <h3>Your registration</h3>
            <ol>
              {parentSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <p className="registration-aside-note">Your completed form stays in this browser until you choose to prepare the email. It is not stored on this website.</p>
          </aside>

          <form ref={formRef} onSubmit={handleSubmit} autoComplete="on">
            <div className="registration-form-card">
              <p className="required-note"><span>*</span> Required fields. Please do not include information that is not relevant to arranging care.</p>

              {/* Type of care */}
              <fieldset className="form-section" data-section="Type of care">
                <legend>What would you like to register for?<small>Choose the care pathway that best fits your family.</small></legend>
                <div className="choice-grid">
                  {careTypes.map((ct) => (
                    <label key={ct.value} className="choice">
                      <input type="radio" name="care_type" value={ct.value} required onChange={() => setCareType(ct.value)} />
                      <span><strong>{ct.title}</strong>{ct.desc}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Parent / guardian 1 */}
              <fieldset className="form-section" data-section="Parent or guardian 1">
                <legend>Parent / guardian 1<small>Please provide the primary contact for this registration.</small></legend>
                <div className="form-grid">
                  <div className="field"><label htmlFor="guardian1_surname">Family / surname <span>*</span></label><input id="guardian1_surname" name="guardian1_surname" type="text" autoComplete="family-name" required /></div>
                  <div className="field"><label htmlFor="guardian1_given_names">Given name/s <span>*</span></label><input id="guardian1_given_names" name="guardian1_given_names" type="text" autoComplete="given-name" required /></div>
                  <div className="field"><label htmlFor="guardian1_mobile">Mobile <span>*</span></label><input id="guardian1_mobile" name="guardian1_mobile" type="tel" autoComplete="tel" required /></div>
                  <div className="field"><label htmlFor="guardian1_phone">Phone</label><input id="guardian1_phone" name="guardian1_phone" type="tel" /></div>
                  <div className="field full"><label htmlFor="guardian1_email">Email address <span>*</span></label><input id="guardian1_email" name="guardian1_email" type="email" autoComplete="email" required /></div>
                  <div className="field full"><label htmlFor="guardian1_address">Street address <span>*</span></label><input id="guardian1_address" name="guardian1_address" type="text" autoComplete="street-address" required /></div>
                  <div className="field"><label htmlFor="guardian1_suburb">City / suburb <span>*</span></label><input id="guardian1_suburb" name="guardian1_suburb" type="text" autoComplete="address-level2" required /></div>
                  <div className="field"><label htmlFor="guardian1_state">State <span>*</span></label><input id="guardian1_state" name="guardian1_state" type="text" autoComplete="address-level1" required /></div>
                  <div className="field"><label htmlFor="guardian1_postcode">Postcode <span>*</span></label><input id="guardian1_postcode" name="guardian1_postcode" type="text" inputMode="numeric" autoComplete="postal-code" required /></div>
                  <div className="field"><label htmlFor="guardian1_dob">Date of birth</label><input id="guardian1_dob" name="guardian1_dob" type="date" /></div>
                  <div className="field"><label htmlFor="guardian1_gender">Gender</label><input id="guardian1_gender" name="guardian1_gender" type="text" /></div>
                  <div className="field"><label htmlFor="guardian1_occupation">Occupation</label><input id="guardian1_occupation" name="guardian1_occupation" type="text" /></div>
                </div>
              </fieldset>

              {/* Parent / guardian 2 */}
              <fieldset className="form-section" data-section="Parent or guardian 2">
                <legend>Parent / guardian 2<small>Optional — complete this section if another parent or guardian should be included.</small></legend>
                <div className="form-grid">
                  <div className="field"><label htmlFor="guardian2_surname">Family / surname</label><input id="guardian2_surname" name="guardian2_surname" type="text" /></div>
                  <div className="field"><label htmlFor="guardian2_given_names">Given name/s</label><input id="guardian2_given_names" name="guardian2_given_names" type="text" /></div>
                  <div className="field"><label htmlFor="guardian2_mobile">Mobile</label><input id="guardian2_mobile" name="guardian2_mobile" type="tel" /></div>
                  <div className="field"><label htmlFor="guardian2_phone">Phone</label><input id="guardian2_phone" name="guardian2_phone" type="tel" /></div>
                  <div className="field"><label htmlFor="guardian2_email">Email address</label><input id="guardian2_email" name="guardian2_email" type="email" /></div>
                  <div className="field"><label htmlFor="guardian2_occupation">Occupation</label><input id="guardian2_occupation" name="guardian2_occupation" type="text" /></div>
                </div>
              </fieldset>

              {/* Emergency contact */}
              <fieldset className="form-section" data-section="Emergency contact">
                <legend>Emergency contact<small>This should be someone Little Wonders can contact if a parent or guardian cannot be reached.</small></legend>
                <div className="form-grid">
                  <div className="field"><label htmlFor="emergency_name">Contact name <span>*</span></label><input id="emergency_name" name="emergency_name" type="text" required /></div>
                  <div className="field"><label htmlFor="emergency_number">Contact number <span>*</span></label><input id="emergency_number" name="emergency_number" type="tel" required /></div>
                  <div className="field full"><label htmlFor="emergency_relationship">Relationship to child / children <span>*</span></label><input id="emergency_relationship" name="emergency_relationship" type="text" required /></div>
                </div>
              </fieldset>

              {/* Care preferences */}
              <fieldset className="form-section" data-section="Care preferences">
                <legend>Care preferences<small>Tell us what would make the care arrangement feel right for your family.</small></legend>
                <div className="subsection" style={{ marginTop: 0, paddingTop: 0, borderTop: 0 }}>
                  <h3>Care types</h3>
                  <div className="choice-grid">
                    {carePreferencesTypes.map(v => (
                      <label key={v} className="choice"><input type="checkbox" name="care_preferences_type" value={v} /><span>{v}</span></label>
                    ))}
                  </div>
                </div>
                <div className="subsection">
                  <h3>Preferred qualities</h3>
                  <p className="required-note">Choose at least five qualities that matter to your family.</p>
                  <div className="choice-grid three">
                    {preferredQualities.map(v => (
                      <label key={v} className="choice"><input type="checkbox" name="preferred_qualities" value={v} /><span>{v}</span></label>
                    ))}
                  </div>
                </div>
                <div className="subsection">
                  <h3>Experience preferences</h3>
                  <div className="choice-grid">
                    {experiencePreferences.map(v => (
                      <label key={v} className="choice"><input type="checkbox" name="experience_preferences" value={v} /><span>{v}</span></label>
                    ))}
                  </div>
                </div>
                <div className="form-grid" style={{ marginTop: 20 }}>
                  <div className="field"><label htmlFor="age_preference">Preferred age range for your care professional</label><input id="age_preference" name="age_preference" type="text" /></div>
                  <div className="field"><label htmlFor="care_preferences_notes">Care preferences and notes</label><textarea id="care_preferences_notes" name="care_preferences_notes"></textarea></div>
                </div>
              </fieldset>

              {/* Event attendance (conditional) */}
              {careType === 'event' && (
                <fieldset className="form-section is-visible" data-section="Event attendance">
                  <legend>Register attendance for an event<small>We'll match this registration to the event details where possible.</small></legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="event_registration_name">Event name</label><input id="event_registration_name" name="event_registration_name" type="text" /></div>
                    <div className="field"><label htmlFor="event_registration_code">Event code, if known</label><input id="event_registration_code" name="event_registration_code" type="text" /></div>
                    <div className="field full"><span className="field-label">Are you already a Little Wonders family?</span><div className="choice-grid">
                      <label className="choice"><input type="radio" name="existing_family" value="yes" /><span>Yes</span></label>
                      <label className="choice"><input type="radio" name="existing_family" value="no" /><span>No</span></label>
                    </div></div>
                    <div className="field"><label htmlFor="client_number">Client number, if known</label><input id="client_number" name="client_number" type="text" /></div>
                  </div>
                </fieldset>
              )}

              {/* Defence family details (conditional) */}
              {careType === 'defence' && (
                <fieldset className="form-section is-visible" data-section="Defence family details">
                  <legend>Defence care &amp; support<small>These details help us understand the Defence or emergency services context.</small></legend>
                  <div className="form-grid">
                    <div className="field full"><span className="field-label">Are you a Defence or emergency services family?</span><div className="choice-grid">
                      <label className="choice"><input type="radio" name="defence_family" value="yes" /><span>Yes</span></label>
                      <label className="choice"><input type="radio" name="defence_family" value="no" /><span>No</span></label>
                    </div></div>
                    <div className="field full"><span className="field-label">Are you registering for a Defence-related event?</span><div className="choice-grid">
                      <label className="choice"><input type="radio" name="defence_event" value="yes" /><span>Yes</span></label>
                      <label className="choice"><input type="radio" name="defence_event" value="no" /><span>No</span></label>
                    </div></div>
                    <div className="field"><label htmlFor="defence_event_name">Event name</label><input id="defence_event_name" name="defence_event_name" type="text" /></div>
                    <div className="field"><label htmlFor="defence_client_number">Client number, if known</label><input id="defence_client_number" name="defence_client_number" type="text" /></div>
                  </div>
                </fieldset>
              )}

              {/* Home & family arrangements */}
              <fieldset className="form-section" data-section="Home and family arrangements">
                <legend>Home &amp; family arrangements<small>Only share details that are relevant to the safety and care arrangement.</small></legend>
                <div className="form-grid">
                  <div className="field"><label htmlFor="home_arrangement">Home care arrangement</label><select id="home_arrangement" name="home_arrangement"><option value="">Please select</option><option>Parents / guardians live with the children</option><option>Parent / guardian no longer resides with the children</option><option>Visiting / custody arrangement</option><option>Other arrangement</option></select></div>
                  <div className="field"><label htmlFor="alternative_addresses">Are alternative addresses involved?</label><select id="alternative_addresses" name="alternative_addresses"><option value="">Please select</option><option>No</option><option>Yes</option></select></div>
                  <div className="field full"><label htmlFor="arrangement_details">Relevant family arrangement details</label><textarea id="arrangement_details" name="arrangement_details" placeholder="Include any practical information we need to know about collection, care or contact arrangements."></textarea></div>
                  <div className="field full"><span className="field-label">Are there court orders, parental arrangements or a domestic violence order relevant to care?</span><div className="choice-grid">
                    <label className="choice"><input type="radio" name="court_orders" value="yes" /><span>Yes</span></label>
                    <label className="choice"><input type="radio" name="court_orders" value="no" /><span>No</span></label>
                  </div></div>
                  <div className="field full"><label htmlFor="court_order_details">If yes, please provide relevant details and tell us what documents our team should discuss with you</label><textarea id="court_order_details" name="court_order_details"></textarea></div>
                  <div className="field full"><span className="field-label">Are there pets at the care address?</span><div className="choice-grid">
                    <label className="choice"><input type="radio" name="pets" value="yes" /><span>Yes</span></label>
                    <label className="choice"><input type="radio" name="pets" value="no" /><span>No</span></label>
                  </div></div>
                  <div className="field full"><label htmlFor="pet_details">Pet details, including any guard or dangerous animals</label><textarea id="pet_details" name="pet_details"></textarea></div>
                </div>
              </fieldset>

              {/* Children */}
              <fieldset className="form-section" data-section="Children">
                <legend>Children<small>Start with the first child. You can add up to three more children.</small></legend>
                <div className="children-grid">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`child-card${n > 1 ? ' optional' : ''}${n <= visibleChildren ? ' is-visible' : ''}`}
                    >
                      <h3>Child {n}</h3>
                      <div className="form-grid">
                        <div className="field full"><label htmlFor={`child${n}_name`}>Full name{n === 1 ? ' *' : ''}</label><input id={`child${n}_name`} name={`child${n}_name`} type="text" required={n === 1} disabled={n > visibleChildren} /></div>
                        <div className="field"><label htmlFor={`child${n}_dob`}>Date of birth{n === 1 ? ' *' : ''}</label><input id={`child${n}_dob`} name={`child${n}_dob`} type="date" required={n === 1} disabled={n > visibleChildren} /></div>
                        <div className="field"><label htmlFor={`child${n}_gender`}>Gender</label><input id={`child${n}_gender`} name={`child${n}_gender`} type="text" disabled={n > visibleChildren} /></div>
                        <div className="field full"><label htmlFor={`child${n}_interests`}>Hobbies / interests</label><textarea id={`child${n}_interests`} name={`child${n}_interests`} rows={3} disabled={n > visibleChildren}></textarea></div>
                      </div>
                    </div>
                  ))}
                </div>
                {visibleChildren < 4 && (
                  <button className="add-child" type="button" onClick={addChild}>Add another child</button>
                )}
              </fieldset>

              {/* Health & dietary */}
              <fieldset className="form-section" data-section="Health and dietary information">
                <legend>Health &amp; dietary information<small>These details help us plan safe, comfortable and responsive care.</small></legend>
                <div className="form-grid">
                  <div className="field full"><span className="field-label">Does child 1 have allergies? <span>*</span></span><div className="choice-grid">
                    <label className="choice"><input type="radio" name="child1_allergies" value="yes" required /><span>Yes</span></label>
                    <label className="choice"><input type="radio" name="child1_allergies" value="no" required /><span>No</span></label>
                  </div></div>
                  <div className="field full"><label htmlFor="allergy_information">Allergy details and management information</label><textarea id="allergy_information" name="allergy_information"></textarea></div>
                  <div className="field full"><span className="field-label">Does child 1 have a medical condition, disability or additional support need? <span>*</span></span><div className="choice-grid">
                    <label className="choice"><input type="radio" name="child1_medical" value="yes" required /><span>Yes</span></label>
                    <label className="choice"><input type="radio" name="child1_medical" value="no" required /><span>No</span></label>
                  </div></div>
                  <div className="field full"><label htmlFor="medical_information">Medical, access or support details</label><textarea id="medical_information" name="medical_information"></textarea></div>
                  <div className="field full"><label htmlFor="dietary_requirements">Dietary requirements</label><textarea id="dietary_requirements" name="dietary_requirements"></textarea></div>
                  <div className="field full"><label htmlFor="routines_comfort">Routines, comfort needs and anything else that will help us care well</label><textarea id="routines_comfort" name="routines_comfort"></textarea></div>
                </div>
                <p className="form-note">If supporting medical or court documents are needed, please discuss the safest way to provide them with our team. Files cannot be attached automatically through this form's email handoff.</p>
              </fieldset>

              {/* Privacy & consent */}
              <div className="privacy-note">
                <strong>Privacy notice.</strong> Little Wonders collects only information reasonably necessary to respond to your enquiry and arrange care. This may include contact details, child personal details, health information and relevant care information. See our <Link to="/privacy">Privacy Policy</Link> for more information. Please email any supporting documents separately if our team requests them.
              </div>
              <label className="consent">
                <input type="checkbox" name="privacy_consent" value="I consent to Little Wonders using the information in this form to respond to my parent registration enquiry." required />
                <span>I understand and consent to Little Wonders using the information in this form to respond to my parent registration enquiry. <span>*</span></span>
              </label>

              {state === 'error' && (
                <div className="form-status is-visible is-error">{errorMsg}</div>
              )}

              <div className="form-actions">
                <button className="button" type="submit" disabled={state === 'submitting'}>
                  {state === 'submitting' ? 'Submitting...' : 'Prepare Parent Registration Email'}
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
