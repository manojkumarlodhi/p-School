import { useState, useEffect } from 'react';
import './institutionenquirymodal.css';

const INSTITUTION_TYPES = ['School', 'University', 'Training Center', 'Vocational Institute', 'Other'];
const STUDENT_RANGES    = ['00-200', '200-400', '400-800', '800-1600', '1600+'];
const INTEREST_AREAS    = ['Coding', 'Electronics', 'Mechanics', 'Robotics'];

const INIT = {
  institutionName: '',
  institutionType: '',
  contactPersonName: '',
  designation: '',
  email: '',
  phone: '',
  approxStudents: '',
  country: '',
  state: '',
  city: '',
  district: '',
  pinCode: '',
  courseAddress: '',
  streetAddress: '',
  interests: [],
  message: '',
  agreeContact: false,
};

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function InstitutionEnquiryModal({ open, onClose }) {
  const [form, setForm] = useState(INIT);

  /* Lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const toggleInterest = (val) =>
    setForm((p) => ({
      ...p,
      interests: p.interests.includes(val)
        ? p.interests.filter((i) => i !== val)
        : [...p.interests, val],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    /* TODO: wire to API */
    onClose();
  };

  return (
    <div className="iem__overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="iem__modal" role="dialog" aria-modal="true" aria-label="Request Institution Demo">

        {/* ── Header ── */}
        <div className="iem__header">
          <div>
            <h2 className="iem__title">Request an Institution Demo</h2>
            <p className="iem__subtitle">
              Tell us about your institution and learning goals. Our team will be in
              touch to schedule a personalized demo.
            </p>
          </div>
          <button className="iem__close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>

        {/* ── Form ── */}
        <form className="iem__form" onSubmit={handleSubmit}>

          {/* Row 1 */}
          <div className="iem__row">
            <div className="iem__field">
              <label>Institution Name</label>
              <input type="text" placeholder="Pschoolndia" value={form.institutionName}
                onChange={(e) => set('institutionName', e.target.value)} required />
            </div>
            <div className="iem__field">
              <label>Institution Type *</label>
              <select value={form.institutionType} onChange={(e) => set('institutionType', e.target.value)} required>
                <option value="">University</option>
                {INSTITUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="iem__row">
            <div className="iem__field">
              <label>Contact Person Name</label>
              <input type="text" placeholder="Contact Person Name" value={form.contactPersonName}
                onChange={(e) => set('contactPersonName', e.target.value)} required />
            </div>
            <div className="iem__field">
              <label>Max - Designation</label>
              <input type="text" placeholder="CEO" value={form.designation}
                onChange={(e) => set('designation', e.target.value)} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="iem__row">
            <div className="iem__field">
              <label>Email *</label>
              <input type="email" placeholder="Pschoolndia@gmail.com" value={form.email}
                onChange={(e) => set('email', e.target.value)} required />
            </div>
            <div className="iem__field">
              <label>Pin Code / Zip *</label>
              <input type="text" placeholder="P-address" value={form.pinCode}
                onChange={(e) => set('pinCode', e.target.value)} />
            </div>
          </div>

          {/* Row 4 */}
          <div className="iem__row">
            <div className="iem__field">
              <label>Approximate Number of Students *</label>
              <select value={form.approxStudents} onChange={(e) => set('approxStudents', e.target.value)} required>
                <option value="">Camp Status</option>
                {STUDENT_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="iem__field">
              <label>Country</label>
              <input type="text" placeholder="Country" value={form.country}
                onChange={(e) => set('country', e.target.value)} />
            </div>
          </div>

          {/* Row 5 */}
          <div className="iem__row">
            <div className="iem__field">
              <label>State / Region</label>
              <input type="text" placeholder="State / Region" value={form.state}
                onChange={(e) => set('state', e.target.value)} />
            </div>
            <div className="iem__field">
              <label>City</label>
              <input type="text" placeholder="City" value={form.city}
                onChange={(e) => set('city', e.target.value)} />
            </div>
          </div>

          {/* Row 6 */}
          <div className="iem__row">
            <div className="iem__field">
              <label>District / Area</label>
              <input type="text" placeholder="District / Area" value={form.district}
                onChange={(e) => set('district', e.target.value)} />
            </div>
            <div className="iem__field">
              <label>Postal Zone</label>
              <input type="text" placeholder="Your Carrier Wallet" value={form.phone}
                onChange={(e) => set('phone', e.target.value)} />
            </div>
          </div>

          {/* Course Address */}
          <div className="iem__field iem__field--full">
            <label>Course Address</label>
            <input type="text" placeholder="104, Khushbu Nagar" value={form.courseAddress}
              onChange={(e) => set('courseAddress', e.target.value)} />
          </div>

          {/* Street Address */}
          <div className="iem__field iem__field--full">
            <label>Street Address</label>
            <input type="text" placeholder="104, Khushbu Nagar" value={form.streetAddress}
              onChange={(e) => set('streetAddress', e.target.value)} />
          </div>

          {/* Interest Areas */}
          <div className="iem__field iem__field--full">
            <label>Interested Areas / Categories</label>
            <div className="iem__checkboxes">
              {INTEREST_AREAS.map((area) => (
                <label key={area} className="iem__checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.interests.includes(area)}
                    onChange={() => toggleInterest(area)}
                  />
                  <span>{area}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="iem__field iem__field--full">
            <label>Message (Optional)</label>
            <textarea rows={3} placeholder="Description" value={form.message}
              onChange={(e) => set('message', e.target.value)} />
          </div>

          {/* Agree */}
          <div className="iem__field iem__field--full">
            <label className="iem__checkbox-label iem__agree">
              <input type="checkbox" checked={form.agreeContact}
                onChange={(e) => set('agreeContact', e.target.checked)} required />
              <span>* I agree to be contacted by P-SCHOOL regarding this enquiry *</span>
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="iem__submit">Submit Enquiry</button>

        </form>
      </div>
    </div>
  );
}
