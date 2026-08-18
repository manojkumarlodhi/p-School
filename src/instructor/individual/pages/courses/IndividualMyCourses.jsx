import { useNavigate } from 'react-router-dom';
import './individualcourses.css';
import codingImg      from '../../../../assets/images/coding.png';
import roboticsImg    from '../../../../assets/images/RoboticComputerGrafics.png';
import electronicsImg from '../../../../assets/images/electronicChargingBattery.png';
import mechanicsImg   from '../../../../assets/images/roboticArmIcon.png';

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const CATEGORIES = [
  { id: 'coding',      label: 'Coding',      desc: 'Create and sell coding courses.',      img: codingImg,       bg: '#eff6ff', count: 4 },
  { id: 'mechanical',  label: 'Mechanical',  desc: 'Create and sell Mechanical courses.',  img: mechanicsImg,    bg: '#fff7ed', count: 2 },
  { id: 'robotic',     label: 'Robotic',     desc: 'Create and sell robotic courses.',     img: roboticsImg,     bg: '#f0fdf4', count: 3 },
  { id: 'electronic',  label: 'Electronic',  desc: 'Create and sell Electronic courses.',  img: electronicsImg,  bg: '#fdf4ff', count: 1 },
];

export default function IndividualMyCourses() {
  const navigate = useNavigate();
  const total = CATEGORIES.reduce((s, c) => s + c.count, 0);

  return (
    <div className="imc-page">
      {/* Header */}
      <div className="imc-page-header">
        <div>
          <h1 className="imc-page-title">My Courses</h1>
          <p className="imc-breadcrumb">Home / Courses</p>
        </div>
        <button className="imc-create-btn"
          onClick={() => navigate('/instructor/individual/dashboard/courses/create')}>
          <PlusIcon /> Create Course
        </button>
      </div>

      {/* Stats bar */}
      <div className="imc-stats-bar">
        <span className="imc-stats-label">Categories</span>
        <span className="imc-stats-total">Total — {total}</span>
      </div>

      {/* Category grid */}
      <div className="imc-category-grid">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="imc-category-card"
            style={{ background: cat.bg }}
            onClick={() => navigate(`/instructor/individual/dashboard/courses/${cat.id}`)}>
            <div className="imc-category-body">
              <h3 className="imc-category-name">{cat.label}</h3>
              <p className="imc-category-desc">{cat.desc}</p>
              <button className="imc-category-arrow">
                <ArrowIcon />
              </button>
            </div>
            <div className="imc-category-img-wrap">
              <img src={cat.img} alt={cat.label} className="imc-category-img" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
