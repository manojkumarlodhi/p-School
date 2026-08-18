import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './announcements.css';

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="#6b7280" strokeWidth={2} strokeLinecap="round">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

export default function IndividualCreateAnnouncement() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: 'New Chapter Added',
    category: 'Coding',
    ageGroup: '',
    difficulty: 'Beginner',
    course: 'Java Full Stack',
    message: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function handlePost(e) {
    e.preventDefault();
    navigate('/instructor/individual/dashboard/announcements');
  }

  return (
    <div className="ann-page">
      {/* Web header */}
      <div className="ann-web-header">
        <div className="ann-web-header-left">
          <button className="ann-back-icon-btn"
            onClick={() => navigate('/instructor/individual/dashboard/announcements')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <div>
            <h1 className="ann-web-title">Create Announcement</h1>
            <p className="ann-web-breadcrumb">Home / Announcements / Create</p>
          </div>
        </div>
      </div>

      <div className="ann-form-card">
        <form onSubmit={handlePost}>
          {/* Title */}
          <div className="ann-field">
            <label className="ann-label">Title</label>
            <input className="ann-input" type="text" placeholder="Announcement title"
              value={form.title} onChange={e => set('title', e.target.value)} required />
          </div>

          {/* Category */}
          <div className="ann-field">
            <label className="ann-label">Select Category</label>
            <div className="ann-select-wrap">
              <select className="ann-select" value={form.category}
                onChange={e => set('category', e.target.value)}>
                <option>Coding</option>
                <option>Electronics</option>
                <option>Mechanics</option>
                <option>Robotics</option>
              </select>
              <ChevronDown />
            </div>
          </div>

          {/* Age Group */}
          <div className="ann-field">
            <label className="ann-label">Age Group</label>
            <div className="ann-select-wrap">
              <select className="ann-select" value={form.ageGroup}
                onChange={e => set('ageGroup', e.target.value)}>
                <option value="">Select age group</option>
                <option>8-12 (Junior)</option>
                <option>13-15 (Middle)</option>
                <option>16-19 (Senior)</option>
                <option>20+ (Adult)</option>
              </select>
              <ChevronDown />
            </div>
          </div>

          {/* Difficulty */}
          <div className="ann-field">
            <label className="ann-label">Difficulty Level</label>
            <div className="ann-select-wrap">
              <select className="ann-select" value={form.difficulty}
                onChange={e => set('difficulty', e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <ChevronDown />
            </div>
          </div>

          {/* Select Course */}
          <div className="ann-field">
            <label className="ann-label">Select Course</label>
            <div className="ann-select-wrap">
              <select className="ann-select" value={form.course}
                onChange={e => set('course', e.target.value)}>
                <option>Java Full Stack</option>
                <option>Python Basics</option>
                <option>Robotics 101</option>
                <option>Electronics Fundamentals</option>
              </select>
              <ChevronDown />
            </div>
          </div>

          {/* Message */}
          <div className="ann-field">
            <label className="ann-label">Message</label>
            <textarea className="ann-textarea"
              placeholder="Enter detailed instructions for students..."
              value={form.message} onChange={e => set('message', e.target.value)} />
          </div>

          {/* Actions */}
          <div className="ann-form-actions">
            <button type="button" className="ann-btn-cancel"
              onClick={() => navigate('/instructor/individual/dashboard/announcements')}>
              Cancel
            </button>
            <button type="submit" className="ann-btn-post">
              Post Announcement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
