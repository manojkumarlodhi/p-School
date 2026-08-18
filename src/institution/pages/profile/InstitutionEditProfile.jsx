import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutionprofile.css';

/* ── Icons ── */
const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

export default function InstitutionEditProfile() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [logo, setLogo] = useState(null);

  const [form, setForm] = useState({
    institutionName: '',
    instituteCode: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    district: '',
    postalCode: '316541',
    streetAddress: 'House No. 24, Koulouba Street',
    postalCode2: 'Near Central Market',
    streetAddress2: 'House No. 24, Koulouba Street',
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  function handleLogoChange(e) {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  }

  function handleSave(e) {
    e.preventDefault();
    navigate('/institution/dashboard/profile');
  }

  return (
    <div className="iprof-page">

      {/* ── Page header ── */}
      <div className="iprof-page-header">
        <button className="iprof-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
          <span>Edit Profile</span>
        </button>
        <span className="iprof-breadcrumb">
          Dashboard &rsaquo; Profile &rsaquo; Edit Profile
        </span>
      </div>

      <div className="iprof-body">
        <div className="iprof-edit-card">
          <form onSubmit={handleSave}>

            {/* ── Logo upload ── */}
            <div className="iprof-upload-area">
              <button
                type="button"
                className="iprof-upload-btn"
                onClick={() => fileRef.current?.click()}
              >
                {logo
                  ? <img src={logo} alt="logo" className="iprof-upload-preview" />
                  : <PlusIcon />
                }
              </button>
              <span className="iprof-upload-label">Upload Logo</span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleLogoChange}
              />
            </div>

            {/* ── Form grid ── */}
            <div className="iprof-form-grid">

              <div className="iprof-field">
                <label className="iprof-label">Institution Name</label>
                <input className="iprof-input" placeholder="Institution Name"
                  value={form.institutionName} onChange={set('institutionName')} />
              </div>

              <div className="iprof-field">
                <label className="iprof-label">Institute Code</label>
                <input className="iprof-input" placeholder="Institute Code"
                  value={form.instituteCode} onChange={set('instituteCode')} />
              </div>

              <div className="iprof-field">
                <label className="iprof-label">Email</label>
                <input className="iprof-input" type="email" placeholder="Email"
                  value={form.email} onChange={set('email')} />
              </div>

              <div className="iprof-field">
                <label className="iprof-label">Phone Number</label>
                <input className="iprof-input" placeholder="Phone Number"
                  value={form.phone} onChange={set('phone')} />
              </div>

              <div className="iprof-field">
                <label className="iprof-label">Country</label>
                <div className="iprof-select-wrap">
                  <select className="iprof-select" value={form.country} onChange={set('country')}>
                    <option value="">Country</option>
                    <option>India</option>
                    <option>USA</option>
                    <option>UK</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div className="iprof-field">
                <label className="iprof-label">State / Region</label>
                <div className="iprof-select-wrap">
                  <select className="iprof-select" value={form.state} onChange={set('state')}>
                    <option value="">State / Region</option>
                    <option>Madhya Pradesh</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div className="iprof-field">
                <label className="iprof-label">City</label>
                <div className="iprof-select-wrap">
                  <select className="iprof-select" value={form.city} onChange={set('city')}>
                    <option value="">City</option>
                    <option>Indore</option>
                    <option>Bhopal</option>
                    <option>Mumbai</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div className="iprof-field">
                <label className="iprof-label">District / Area</label>
                <div className="iprof-select-wrap">
                  <select className="iprof-select" value={form.district} onChange={set('district')}>
                    <option value="">District / Area</option>
                    <option>Indore</option>
                    <option>Ujjain</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div className="iprof-field">
                <label className="iprof-label">Postal Code</label>
                <input className="iprof-input" placeholder="Postal Code"
                  value={form.postalCode} onChange={set('postalCode')} />
              </div>

              <div className="iprof-field">
                <label className="iprof-label">Street Address</label>
                <input className="iprof-input" placeholder="Street Address"
                  value={form.streetAddress} onChange={set('streetAddress')} />
              </div>

              <div className="iprof-field">
                <label className="iprof-label">Postal Code</label>
                <input className="iprof-input" placeholder="Postal Code"
                  value={form.postalCode2} onChange={set('postalCode2')} />
              </div>

              <div className="iprof-field">
                <label className="iprof-label">Street Address</label>
                <input className="iprof-input" placeholder="Street Address"
                  value={form.streetAddress2} onChange={set('streetAddress2')} />
              </div>

            </div>

            {/* ── Actions ── */}
            <div className="iprof-form-actions">
              <button type="button" className="iprof-btn-cancel"
                onClick={() => navigate('/institution/dashboard/profile')}>
                Cancel
              </button>
              <button type="submit" className="iprof-btn-save">
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
