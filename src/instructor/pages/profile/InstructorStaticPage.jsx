import { useNavigate, useParams } from 'react-router-dom';
import './profile.css';

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const LEGAL_SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    text: 'By accessing and using P-SCHOOL, you accept and agree to be bound by the terms and provision of this agreement.',
  },
  {
    title: '2. Use License',
    text: 'Permission is granted to temporarily download one copy of the materials on P-SCHOOL for personal, non-commercial transitory viewing only.',
  },
  {
    title: '3. Disclaimer',
    text: 'The materials on P-SCHOOL are provided on an \'as is\' basis. P-SCHOOL makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
  },
  {
    title: '4. Limitations',
    text: 'In no event shall P-SCHOOL or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on P-SCHOOL.',
  },
  {
    title: '5. Accuracy of Materials',
    text: 'The materials appearing on P-SCHOOL could include technical, typographical, or photographic errors. P-SCHOOL does not warrant that any of the materials on P-SCHOOL are accurate, complete, or current.',
  },
];

const PAGE_TITLES = {
  about:   'About App',
  privacy: 'Privacy Policy',
  terms:   'Terms of Service',
};

export default function InstructorStaticPage() {
  const navigate = useNavigate();
  const { pageType } = useParams();
  const title = PAGE_TITLES[pageType] || 'About App';

  return (
    <div className="prof-static-page">
      <div className="prof-static-header">
        <button className="prof-back-btn" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <h1 className="prof-static-title">{title}</h1>
      </div>

      {LEGAL_SECTIONS.map(s => (
        <div key={s.title} className="prof-static-section">
          <h3 className="prof-static-section-title">{s.title}</h3>
          <p className="prof-static-text">{s.text}</p>
        </div>
      ))}
    </div>
  );
}
