import { useState } from 'react';
import './contactsection.css';

/* ── Icons ── */
function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* Address coordinates — Sukhmani Apartment, Indore */
const LAT  = 22.7196;
const LNG  = 75.8577;
const ZOOM = 15;

/* OpenStreetMap embed URL */
const MAP_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${LNG - 0.01}%2C${LAT - 0.008}%2C${LNG + 0.01}%2C${LAT + 0.008}&layer=mapnik&marker=${LAT}%2C${LNG}`;

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', description: '' });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); /* TODO: wire to API */ };

  return (
    <section id="contact" className="cnt">
      <div className="lp-container cnt__inner">

        {/* ── LEFT — blue info panel ── */}
        <div className="cnt__left">
          <h2 className="cnt__h2">Get in Touch</h2>
          <p className="cnt__sub">
            Have questions? We're here to help and guide you through your
            STEM learning journey.
          </p>

          {/* Contact info chips */}
          <div className="cnt__info">
            <div className="cnt__info-row">
              <div className="cnt__chip">
                <EmailIcon />
                <span>abhaythakur@gmail.com</span>
              </div>
              <div className="cnt__chip">
                <PhoneIcon />
                <span>+91 9112421984</span>
              </div>
            </div>
            <div className="cnt__chip cnt__chip--full">
              <LocationIcon />
              <span>104, Sukhmani Apartment Bhawarkua Main Rd Vishnu Puri Colony, Indore</span>
            </div>
          </div>

          {/* Real OpenStreetMap embed */}
          <div className="cnt__map">
            <iframe
              title="P-School Location"
              src={MAP_URL}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* ── RIGHT — contact form ── */}
        <div className="cnt__right">
          <form className="cnt__form" onSubmit={handleSubmit}>
            <div className="cnt__field">
              <label htmlFor="cnt-name">Your Name <span className="cnt__req">*</span></label>
              <input
                id="cnt-name"
                name="name"
                type="text"
                placeholder="Abhay Thakur"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cnt__field">
              <label htmlFor="cnt-email">Your Email <span className="cnt__req">*</span></label>
              <input
                id="cnt-email"
                name="email"
                type="email"
                placeholder="Abthakur@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cnt__field">
              <label htmlFor="cnt-subject">Subject <span className="cnt__req">*</span></label>
              <input
                id="cnt-subject"
                name="subject"
                type="text"
                placeholder="How Can We Help?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cnt__field">
              <label htmlFor="cnt-desc">Description</label>
              <textarea
                id="cnt-desc"
                name="description"
                rows={6}
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="cnt__submit">Submit Now</button>
          </form>
        </div>

      </div>
    </section>
  );
}
