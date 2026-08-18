import codingImg      from '../../../assets/images/coding.png';
import electronicsImg from '../../../assets/images/electronics.png';
import mechanicsImg   from '../../../assets/images/mechanics.png';
import roboticsImg    from '../../../assets/images/robotics.png';
import './coursessection.css';

const CATEGORIES = [
  {
    id: 'coding',
    num: '#1',
    img: codingImg,
    label: 'Coding',
    desc: 'Build real programs and hands-on projects',
  },
  {
    id: 'electronics',
    num: '#2',
    img: electronicsImg,
    label: 'Electronics',
    desc: 'Design and simulate electronic circuits',
  },
  {
    id: 'mechanics',
    num: '#3',
    img: mechanicsImg,
    label: 'Mechanics',
    desc: 'Learn mechanical systems visually',
  },
  {
    id: 'robotics',
    num: '#4',
    img: roboticsImg,
    label: 'Robotics',
    desc: 'Assemble and program robots digitally',
  },
];

export default function CoursesSection() {
  return (
    <section id="courses" className="cls">
      <div className="lp-container cls__inner">

        {/* Heading */}
        <div className="cls__hd">
          <h2 className="cls__h2">Core Learning Categories</h2>
          <p className="cls__sub">
            Master STEM fundamentals across coding, electronics,<br />
            mechanics, and robotics
          </p>
        </div>

        {/* Cards */}
        <div className="cls__grid">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="cls__card">
              {/* Image */}
              <div className="cls__card-img">
                <img src={c.img} alt={c.label} />
              </div>

              {/* Body */}
              <div className="cls__card-body">
                <span className="cls__card-num">{c.num}</span>
                <h3 className="cls__card-title">{c.label}</h3>
                <p className="cls__card-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
