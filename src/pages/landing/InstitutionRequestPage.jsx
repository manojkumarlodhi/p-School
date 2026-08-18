import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSection   from './sections/HeaderSection';
import ContactSection  from './sections/ContactSection';
import CTABannerSection from './sections/CTABannerSection';
import FooterSection   from './sections/FooterSection';
import iphoneImg from '../../assets/images/iPhone.png';
import './institutionrequestpage.css';

/* ── Form data ── */
const INSTITUTION_TYPES = ['School', 'University', 'Training Center', 'Vocational Institute', 'Other'];
const STUDENT_RANGES    = ['00-200', '200-400', '400-800', '800-1600', '1600+'];
const INTEREST_AREAS    = ['Coding', 'Electronics', 'Mechanics', 'Robotics'];

const INIT = {
  institutionName: '', institutionType: '',
  contactPersonName: '', designation: '',
  email: '', pinCode: '',
  approxStudents: '', country: '',
  state: '', city: '',
  district: '', postalZone: '',
  courseAddress: '', streetAddress: '',
  interests: [], message: '',
  agreeContact: false,
};

/* ── Feature icons ── */
function ScalableIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a8fe3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function NoLabIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a8fe3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
    </svg>
  );
}

function CentralIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" stroke="#ef4444" strokeWidth="2.2" />
      <line x1="6" y1="6" x2="18" y2="18" stroke="#ef4444" strokeWidth="2.2" />
    </svg>
  );
}

const FEATURES = [
  { id: 'scalable', Icon: ScalableIcon, title: 'Scalable Access',     desc: 'Complete STEM education for students without any equipment required.' },
  { id: 'nolab',    Icon: NoLabIcon,    title: 'No Physical Labs',    desc: 'Complete STEM labs in your pocket. Design circuits, write code, and build robots—all virtually.' },
  { id: 'central',  Icon: CentralIcon,  title: 'Centralised Platform', desc: 'Complete STEM labs for all STEM learning data management and progress tracking.' },
];

/* ── Form component ── */
function EnquiryForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INIT);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const toggleInterest = (v) =>
    setForm((p) => ({
      ...p,
      interests: p.interests.includes(v)
        ? p.interests.filter((i) => i !== v)
        : [...p.interests, v],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    /* TODO: wire to API */
    navigate('/');
  };

  return (
    <form className="irp__form" onSubmit={handleSubmit}>
      <h3 className="irp__form-title">Request an Institution Demo</h3>
      <p className="irp__form-sub">
        Tell us about your institution and learning goals. Our team will be in
        touch to schedule a personalized demo.
      </p>

      <div className="irp__row">
        <div className="irp__field">
          <label>Institution Name</label>
          <input type="text" placeholder="Pschoolndia" value={form.institutionName}
            onChange={(e) => set('institutionName', e.target.value)} required />
        </div>
        <div className="irp__field">
          <label>Institution Type *</label>
          <select value={form.institutionType} onChange={(e) => set('institutionType', e.target.value)} required>
            <option value="">University</option>
            {INSTITUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="irp__row">
        <div className="irp__field">
          <label>Contact Person Name</label>
          <input type="text" placeholder="Contact Person Name" value={form.contactPersonName}
            onChange={(e) => set('contactPersonName', e.target.value)} required />
        </div>
        <div className="irp__field">
          <label>Designation</label>
          <input type="text" placeholder="CEO" value={form.designation}
            onChange={(e) => set('designation', e.target.value)} />
        </div>
      </div>

      <div className="irp__row">
        <div className="irp__field">
          <label>Email *</label>
          <input type="email" placeholder="Pschoolndia@gmail.com" value={form.email}
            onChange={(e) => set('email', e.target.value)} required />
        </div>
        <div className="irp__field">
          <label>Pin Code / Zip</label>
          <input type="text" placeholder="P-address" value={form.pinCode}
            onChange={(e) => set('pinCode', e.target.value)} />
        </div>
      </div>

      <div className="irp__row">
        <div className="irp__field">
          <label>Approximate Number of Students *</label>
          <select value={form.approxStudents} onChange={(e) => set('approxStudents', e.target.value)} required>
            <option value="">Camp Status</option>
            {STUDENT_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="irp__field">
          <label>Country</label>
          <input type="text" placeholder="Country" value={form.country}
            onChange={(e) => set('country', e.target.value)} />
        </div>
      </div>

      <div className="irp__row">
        <div className="irp__field">
          <label>State / Region</label>
          <input type="text" placeholder="State / Region" value={form.state}
            onChange={(e) => set('state', e.target.value)} />
        </div>
        <div className="irp__field">
          <label>City</label>
          <input type="text" placeholder="City" value={form.city}
            onChange={(e) => set('city', e.target.value)} />
        </div>
      </div>

      <div className="irp__row">
        <div className="irp__field">
          <label>District / Area</label>
          <input type="text" placeholder="District / Area" value={form.district}
            onChange={(e) => set('district', e.target.value)} />
        </div>
        <div className="irp__field">
          <label>Postal Zone</label>
          <input type="text" placeholder="Your Carrier Wallet" value={form.postalZone}
            onChange={(e) => set('postalZone', e.target.value)} />
        </div>
      </div>

      <div className="irp__field irp__field--full">
        <label>Course Address</label>
        <input type="text" placeholder="104, Khushbu Nagar" value={form.courseAddress}
          onChange={(e) => set('courseAddress', e.target.value)} />
      </div>

      <div className="irp__field irp__field--full">
        <label>Street Address</label>
        <input type="text" placeholder="104, Khushbu Nagar" value={form.streetAddress}
          onChange={(e) => set('streetAddress', e.target.value)} />
      </div>

      <div className="irp__field irp__field--full">
        <label>Interested Areas / Categories</label>
        <div className="irp__checkboxes">
          {INTEREST_AREAS.map((area) => (
            <label key={area} className="irp__check-label">
              <input type="radio" name="interest" value={area}
                checked={form.interests.includes(area)}
                onChange={() => toggleInterest(area)} />
              <span>{area}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="irp__field irp__field--full">
        <label>Message (Optional)</label>
        <textarea rows={3} placeholder="Description" value={form.message}
          onChange={(e) => set('message', e.target.value)} />
      </div>

      <div className="irp__field irp__field--full">
        <label className="irp__check-label irp__agree">
          <input type="checkbox" checked={form.agreeContact}
            onChange={(e) => set('agreeContact', e.target.checked)} required />
          <span>* I agree to be contacted by P-SCHOOL regarding this enquiry *</span>
        </label>
      </div>

      <button type="submit" className="irp__submit">Submit Enquiry</button>
    </form>
  );
}

/* ── Page ── */
export default function InstitutionRequestPage() {
  return (
    <div className="irp">

      {/* Shared navbar — hide enquiry & login buttons on this page */}
      <HeaderSection hideEnquiry />

      {/* ── Hero ── */}
      <section className="irp__hero">
        <div className="irp__hero-top">
          <div className="irp__hero-left">
            <h1 className="irp__hero-h1">P-SCHOOL for Institutions</h1>
            <p className="irp__hero-sub">
              Deliver practical STEM education at scale with no physical lab dependency. Perfect
              for schools, training centers, and educational programs.
            </p>
          </div>
        </div>
      </section>

      {/* Form card — phone image floats behind it on the right */}
      <div className="irp__form-wrap">
        {/* Phone image — absolutely positioned behind form card */}
        <div className="irp__phone-behind">
          <span className="irp__hero-diamond irp__hero-diamond--1" />
          <span className="irp__hero-diamond irp__hero-diamond--2" />
          <img src={iphoneImg} alt="P-School App" />
        </div>
        <div className="irp__form-card">
          <EnquiryForm />
        </div>
      </div>

      {/* ── Features strip ── */}
      <section className="irp__features">
        <div className="irp__features-inner">
          {FEATURES.map((f) => (
            <div key={f.id} className="irp__feature">
              <div className="irp__feature-icon"><f.Icon /></div>
              <h4 className="irp__feature-title">{f.title}</h4>
              <p className="irp__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Shared sections ── */}
      <ContactSection />
      <CTABannerSection />
      <FooterSection />

    </div>
  );
}
