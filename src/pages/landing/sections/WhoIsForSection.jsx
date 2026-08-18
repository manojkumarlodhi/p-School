import { useState } from 'react';
import studentImg          from '../../../assets/images/student.png';
import adultImg            from '../../../assets/images/adult.png';
import institutionImg      from '../../../assets/images/institution.png';
import builtForSchoolImg   from '../../../assets/images/buitdForSchoolAndTranningCenter.png';
import InstitutionEnquiryModal from './InstitutionEnquiryModal';
import './whoisforsection.css';

const WHO = [
  {
    id: 'students',
    img: studentImg,
    label: 'Students',
    desc: 'Guided learning with age-appropriate content and assessments',
    active: false,
  },
  {
    id: 'adult',
    img: adultImg,
    label: 'Adult Learners',
    desc: 'Guided learning with age-appropriate content and assessments',
    active: true,
  },
  {
    id: 'institutions',
    img: institutionImg,
    label: 'Institutions',
    desc: 'Guided learning with age-appropriate content and assessments',
    active: false,
  },
];

const FEATURES = [
  'No Physical Lab Dependency',
  'Centralized Learning Delivery',
  'Scalable Student Access',
  'Dedicated Onboarding & Support',
];

export default function WhoIsForSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="for-institutions" className="wif">
      <div className="lp-container wif__inner">

        {/* ── Heading ── */}
        <div className="wif__hd">
          <h2 className="wif__h2">Who is P-School For?</h2>
          <p className="wif__sub">Designed for everyone ready to learn STEM</p>
        </div>

        {/* ── Who Cards ── */}
        <div className="wif__cards">
          {WHO.map((w) => (
            <div
              key={w.id}
              className={`wif__card${w.active ? ' wif__card--active' : ''}`}
            >
              {/* Top: text */}
              <div className="wif__card-text">
                <h3 className="wif__card-title">{w.label}</h3>
                <p className="wif__card-desc">{w.desc}</p>
              </div>

              {/* Bottom: gradient bg + image + diamonds */}
              <div className="wif__card-img">
                {/* Decorative diamonds behind image */}
                <span className="wif__diamond wif__diamond--1" />
                <span className="wif__diamond wif__diamond--2" />
                <span className="wif__diamond wif__diamond--3" />
                <img src={w.img} alt={w.label} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Built for Schools Banner ── */}
        <div className="wif__banner">
          {/* Left: text */}
          <div className="wif__banner-text">
            <h2 className="wif__banner-h2">Built for Schools &amp; Training Centers</h2>
            <p className="wif__banner-sub">
              P-SCHOOL is designed to help schools, academies, and training institutes deliver
              practical STEM education without the limitations of physical labs.
            </p>
            <ul className="wif__banner-features">
              {FEATURES.map((f) => (
                <li key={f} className="wif__banner-feature">
                  <span className="wif__banner-bar" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className="wif__banner-btn"
              onClick={() => setModalOpen(true)}
            >
              Request Institution Enquiry
            </button>
          </div>

          {/* Right: image + diamonds */}
          <div className="wif__banner-img">
            <span className="wif__banner-diamond wif__banner-diamond--1" />
            <span className="wif__banner-diamond wif__banner-diamond--2" />
            <span className="wif__banner-diamond wif__banner-diamond--3" />
            <img src={builtForSchoolImg} alt="School building" />
          </div>
        </div>

      </div>

      {/* Modal */}
      <InstitutionEnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
