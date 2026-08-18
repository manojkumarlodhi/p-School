import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './instructorauth.css';

const LANGUAGES = [
  { code: 'en',  label: 'English',          flag: '🇬🇧' },
  { code: 'fr',  label: 'Français (French)', flag: '🇫🇷' },
  { code: 'hi',  label: 'हिन्दी (Hindi)',    flag: '🇮🇳' },
  { code: 'bn',  label: 'Bangla (বাংলা)',    flag: '🇧🇩' },
  { code: 'ar',  label: 'Arabic (العربية)',  flag: '🇸🇦' },
  { code: 'ar2', label: 'Arabic (العربية)',  flag: '🇦🇪' },
  { code: 'es',  label: 'Español (Spanish)', flag: '🇪🇸' },
  { code: 'pt',  label: 'Português',         flag: '🇵🇹' },
];

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

export default function InstructorChooseLanguage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('en');
  const [search, setSearch] = useState('');

  const filtered = LANGUAGES.filter(l =>
    l.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inauth-page">
      {/* Left — branding */}
      <div className="inauth-left-brand">
        <span className="inauth-brand-diamond inauth-brand-diamond--1" />
        <span className="inauth-brand-diamond inauth-brand-diamond--2" />
        <span className="inauth-brand-diamond inauth-brand-diamond--3" />
        <div className="inauth-brand-logo">P</div>
        <h2 className="inauth-brand-title">Welcome to P-School</h2>
        <p className="inauth-brand-sub">
          Choose your preferred language to get the best experience on our platform.
        </p>
        <div className="inauth-brand-tags">
          <span className="inauth-brand-tag">STEM Courses</span>
          <span className="inauth-brand-tag">Virtual Labs</span>
          <span className="inauth-brand-tag">Smart Progress</span>
        </div>
      </div>

      {/* Right — language picker */}
      <div className="inauth-right">
        <div className="inauth-form-inner">
          <h1 className="inauth-form-title">Choose Your Language</h1>
          <p className="inauth-form-sub">
            Select the language you prefer to use in P-SCHOOL.
          </p>

          {/* Search */}
          <div className="inauth-lang-search-wrap">
            <SearchIcon />
            <input
              className="inauth-lang-search"
              placeholder="Search Language"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Language list */}
          <div className="inauth-lang-list">
            {filtered.map(lang => (
              <button
                key={lang.code}
                type="button"
                className={`inauth-lang-item${selected === lang.code ? ' selected' : ''}`}
                onClick={() => setSelected(lang.code)}
              >
                <span className="inauth-lang-flag">{lang.flag}</span>
                <span className="inauth-lang-label">{lang.label}</span>
                <span className={`inauth-lang-radio${selected === lang.code ? ' checked' : ''}`} />
              </button>
            ))}
          </div>

          <button
            className="inauth-btn"
            style={{ marginTop: 24 }}
            onClick={() => navigate('/instructor/choose-role')}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
