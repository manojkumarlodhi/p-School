import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './createcategory.css';

export default function CreateCategory() {
  const navigate = useNavigate();
  const [name, setName]   = useState('');
  const [desc, setDesc]   = useState('');
  const [logo, setLogo]   = useState(null);
  const fileRef = useRef();

  const handleLogoChange = (e) => {
    const file = e.target.files[0]; 
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="cc-page">

      {/* ── Page header ── */}
      <div className="cc-page-header">
        <div className="cc-header-left">
          <button className="cc-back-btn"
            onClick={() => navigate('/dashboard/course-management')} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
          <h1 className="cc-page-title">Create New Categories</h1>
        </div>
        <span className="cc-breadcrumb">
          Course Management &rsaquo; Add New Course
        </span>
      </div>

      {/* ── Card ── */}
      <div className="cc-body">
        <div className="cc-card">

          {/* Logo upload */}
          <div className="cc-logo-upload">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleLogoChange}
            />
            <button
              className="cc-logo-box"
              onClick={() => fileRef.current.click()}
              type="button"
              aria-label="Upload logo"
            >
              {logo ? (
                <img src={logo} alt="Logo preview" className="cc-logo-preview" />
              ) : (
                <>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="#9ca3af" strokeWidth={2} strokeLinecap="round">
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                </>
              )}
            </button>
            <span className="cc-logo-label">Upload Logo</span>
          </div>

          {/* Categories Name */}
          <div className="cc-form-group">
            <label className="cc-label" htmlFor="cat-name">Categories Name</label>
            <input
              id="cat-name"
              className="cc-input"
              type="text"
              placeholder="Programming"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Course Description */}
          <div className="cc-form-group">
            <label className="cc-label" htmlFor="cat-desc">Course Description</label>
            <textarea
              id="cat-desc"
              className="cc-textarea"
              placeholder="Your Java Programming quiz is scheduled for tomorrow. Please revise OOP concepts and attempt the quiz within the given time."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
            />
          </div>
   
          {/* Actions */}  
          <div className="cc-actions">
            <button className="cc-btn-cancel"
              onClick={() => navigate('/dashboard/course-management')}>
              Cancel
            </button>
            <button className="cc-btn-draft">
              Save as Draft
            </button>
            <button className="cc-btn-publish">
              Publish Course
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
