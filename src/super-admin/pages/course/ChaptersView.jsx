import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './chaptersview.css';

/* ── Flow indicator banner ── */
function FlowBanner({ isDirect }) {
  if (isDirect) {
    // Flow 2: Course >> Chapter >> Content
    return (
      <div className="ch-flow-banner">
        <span className="ch-flow-label">Flow</span>
        <div className="ch-flow-steps">
          <span className="ch-flow-dash" />
          <span className="ch-flow-step ch-flow-step-active">Course</span>
          <span className="ch-flow-chevron">»</span>
          <span className="ch-flow-step ch-flow-step-active">Chapter</span>
          <span className="ch-flow-chevron">»</span>
          <span className="ch-flow-step">Content</span>
          <span className="ch-flow-arrow">→</span>
        </div>
      </div>
    );
  }
  // Flow 1: Course >> Subject >> Chapter >> Content
  return (
    <div className="ch-flow-banner">
      <span className="ch-flow-label">Flow</span>
      <div className="ch-flow-steps">
        <span className="ch-flow-dash" />
        <span className="ch-flow-step ch-flow-step-active">Course</span>
        <span className="ch-flow-chevron">»</span>
        <span className="ch-flow-step ch-flow-step-active">Subject</span>
        <span className="ch-flow-chevron">»</span>
        <span className="ch-flow-step ch-flow-step-active">Chapter</span>
        <span className="ch-flow-chevron">»</span>
        <span className="ch-flow-step">Content</span>
        <span className="ch-flow-arrow">→</span>
      </div>
    </div>
  );
}

/* ── Empty illustration ── */
function EmptyIllustration() {
  return (
    <svg width="200" height="170" viewBox="0 0 260 220" fill="none">
      <ellipse cx="130" cy="140" rx="110" ry="70" fill="#e0f7ff" opacity="0.5"/>
      <ellipse cx="130" cy="140" rx="85" ry="52" fill="#b3ecff" opacity="0.4"/>
      <rect x="72" y="105" width="116" height="80" rx="6" fill="#1ba8d5" opacity="0.85"/>
      <rect x="72" y="97" width="48" height="14" rx="4" fill="#1ba8d5" opacity="0.85"/>
      <rect x="72" y="115" width="116" height="70" rx="6" fill="#38bdf8"/>
      <text x="122" y="160" fontSize="28" fontWeight="800" fill="#fff" textAnchor="middle" fontFamily="system-ui">X</text>
      <rect x="155" y="78" width="36" height="44" rx="4" fill="#fff" stroke="#b3ecff" strokeWidth="1.5"/>
      <line x1="161" y1="90" x2="185" y2="90" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round"/>
      <line x1="161" y1="97" x2="185" y2="97" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round"/>
      <rect x="68" y="62" width="30" height="38" rx="4" fill="#fff" stroke="#b3ecff" strokeWidth="1.5"/>
      <line x1="74" y1="73" x2="92" y2="73" stroke="#b3ecff" strokeWidth="2" strokeLinecap="round"/>
      <text x="148" y="75" fontSize="18" fontWeight="700" fill="#1ba8d5" fontFamily="system-ui">?</text>
      <text x="72" y="58" fontSize="14" fontWeight="700" fill="#38bdf8" fontFamily="system-ui">?</text>
      <text x="58" y="108" fontSize="14" fontWeight="700" fill="#f87171" fontFamily="system-ui">×</text>
      <circle cx="88" cy="96" r="10" fill="#fbbf24"/>
      <path d="M78 93 Q88 82 98 93" fill="#1e293b"/>
      <rect x="82" y="106" width="12" height="22" rx="3" fill="#1e293b"/>
      <path d="M80 128 Q88 140 96 128Z" fill="#1e293b"/>
      <line x1="82" y1="112" x2="70" y2="102" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
      <line x1="94" y1="112" x2="104" y2="118" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
      <line x1="86" y1="128" x2="84" y2="148" stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
      <line x1="90" y1="128" x2="92" y2="148" stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="83" cy="149" rx="5" ry="3" fill="#0f172a"/>
      <ellipse cx="93" cy="149" rx="5" ry="3" fill="#0f172a"/>
    </svg>
  );
}

/* ── Content type icons ── */
function ContentIcon({ type }) {
  const icons = {
    Video: { bg: '#dbeafe', color: '#2563eb', path: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z' },
    PDF:   { bg: '#fee2e2', color: '#dc2626', path: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
    Quiz:  { bg: '#ede9fe', color: '#7c3aed', path: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    Text:  { bg: '#fef3c7', color: '#d97706', path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  };
  const icon = icons[type] || icons.Text;
  return (
    <div className="ch-content-icon" style={{ background: icon.bg }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke={icon.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={icon.path}/>
      </svg>
    </div>
  );
}

/* ── Start with sample sections for "with content" state ── */
const SAMPLE_PREVIEW = {
  title: '1. What is Programming (Video Content)',
  body: `Content Text (for description / preview):\nProgramming is the art of telling a computer what to do using a set of instructions called code. These instructions are written in programming languages like Java, Python, or JavaScript.\n\nIn this video, you will learn:\n• What programming actually means\n• How computers understand code\n• Real-life examples of programming\n• Basic overview of programming languages`,
};

const INITIAL_SECTIONS = [
  {
    id: 1,
    title: 'Section 1: Introduction to Programming',
    contentItems: 3,
    expanded: true,
    contents: [
      { id: 1, type: 'Video', title: 'What is Programming', desc: 'Learn the basics of programming and get started with your first program.' },
      { id: 2, type: 'PDF',   title: 'Programming Basics Notes', desc: 'Learn the basics of programming and get started with your first program.' },
      { id: 3, type: 'Quiz',  title: 'Introduction Quiz', desc: 'Learn the basics of programming and get started with your first program.' },
      { id: 4, type: 'Text',  title: 'Text Content', desc: 'Learn the basics of programming and get started with your first program.' },
    ],
    preview: SAMPLE_PREVIEW,
  },
  { id: 2, title: 'Section 1: Introduction to Programming', contentItems: 3, expanded: false, contents: [], preview: null },
  { id: 3, title: 'Section 1: Introduction to Programming', contentItems: 3, expanded: false, contents: [], preview: null },
  { id: 4, title: 'Section 1: Introduction to Programming', contentItems: 3, expanded: false, contents: [], preview: null },
];

/* ── Create Chapter Modal ── */
function CreateChapterModal({ onClose, onAdd }) {
  const [title, setTitle] = useState('');
  return (
    <div className="ch-modal-backdrop" onClick={onClose}>
      <div className="ch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ch-modal-header">
          <h2 className="ch-modal-title">Add Chapter</h2>
          <button className="ch-modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="ch-modal-divider"/>
        <div className="ch-modal-body">
          <div className="ch-form-group">
            <label className="ch-label">Chapter Title</label>
            <input className="ch-input" type="text" placeholder="Title"
              value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
        </div>
        <div className="ch-modal-footer">
          <button className="ch-btn-primary" onClick={() => { onAdd(title); onClose(); }}>
            Add Chapter
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Quiz Modal — Single & Bulk tabs ── */
function QuizModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('single');
  const [questions, setQuestions] = useState([
    { id: 1, type: 'mcq',  text: '', options: ['', '', '', ''], answer: '' },
    { id: 2, type: 'true-false', text: '', answer: 'True' },
  ]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, {
      id: Date.now(), type: 'mcq', text: '', options: ['', '', '', ''], answer: '',
    }]);
  };

  const updateQuestion = (id, key, val) =>
    setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, [key]: val } : q));

  const deleteQuestion = (id) =>
    setQuestions((prev) => prev.filter((q) => q.id !== id));

  return (
    <div className="ch-modal-backdrop" onClick={onClose}>
      <div className="ch-modal ch-modal-wide ch-modal-quiz" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="ch-modal-header">
          <h2 className="ch-modal-title">Add Quiz</h2>
          <button className="ch-modal-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="ch-quiz-tabs">
          <button
            className={`ch-quiz-tab${activeTab === 'single' ? ' ch-quiz-tab-active' : ''}`}
            onClick={() => setActiveTab('single')}
          >Single</button>
          <button
            className={`ch-quiz-tab${activeTab === 'bulk' ? ' ch-quiz-tab-active' : ''}`}
            onClick={() => setActiveTab('bulk')}
          >Bulk</button>
        </div>
        <div className="ch-modal-divider" style={{ margin: 0 }} />

        {/* Single tab */}
        {activeTab === 'single' && (
          <div className="ch-modal-body ch-quiz-body">
            <div className="ch-quiz-questions-header">
              <span className="ch-quiz-questions-title">Questions</span>
              <button className="ch-quiz-add-btn" onClick={addQuestion}>
                + Add Questions
              </button>
            </div>

            {questions.map((q, idx) => (
              <div key={q.id} className="ch-quiz-question-card">
                <div className="ch-quiz-question-header">
                  <span className="ch-quiz-question-num">
                    Questions {String(questions.length - idx).padStart(2, '0')}
                  </span>
                  <button className="ch-quiz-delete-btn" onClick={() => deleteQuestion(q.id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                    </svg>
                  </button>
                </div>

                {/* Type */}
                <div className="ch-quiz-type-row">
                  <span className="ch-label">Type</span>
                  <div className="ch-quiz-type-options">
                    <label className="ch-quiz-radio">
                      <input type="radio" name={`type-${q.id}`} value="mcq"
                        checked={q.type === 'mcq'}
                        onChange={() => updateQuestion(q.id, 'type', 'mcq')} />
                      MCQ
                    </label>
                    <label className="ch-quiz-radio">
                      <input type="radio" name={`type-${q.id}`} value="true-false"
                        checked={q.type === 'true-false'}
                        onChange={() => updateQuestion(q.id, 'type', 'true-false')} />
                      True &amp; False
                    </label>
                  </div>
                </div>

                {/* Question text */}
                <div className="ch-form-group">
                  <label className="ch-label">Questions Text</label>
                  <textarea className="ch-textarea" placeholder="Enter The Question Text....."
                    value={q.text} onChange={(e) => updateQuestion(q.id, 'text', e.target.value)} rows={3} />
                </div>

                {/* MCQ options */}
                {q.type === 'mcq' && (
                  <div className="ch-form-group">
                    <label className="ch-label">Option</label>
                    {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, i) => (
                      <input key={i} className="ch-input ch-quiz-option-input" type="text"
                        placeholder={opt}
                        value={q.options[i] || ''}
                        onChange={(e) => {
                          const opts = [...q.options];
                          opts[i] = e.target.value;
                          updateQuestion(q.id, 'options', opts);
                        }} />
                    ))}
                  </div>
                )}

                {/* Correct answer */}
                <div className="ch-form-group">
                  <label className="ch-label">Correct Answer</label>
                  <input className="ch-input" type="text"
                    placeholder={q.type === 'true-false' ? 'True' : 'Option D'}
                    value={q.answer}
                    onChange={(e) => updateQuestion(q.id, 'answer', e.target.value)} />
                </div>
              </div>
            ))}

            <div className="ch-modal-footer ch-modal-footer-right">
              <button className="ch-btn-primary" onClick={onClose}>Upload Quiz</button>
            </div>
          </div>
        )}

        {/* Bulk tab */}
        {activeTab === 'bulk' && (
          <div className="ch-modal-body">
            <h3 className="ch-quiz-upload-title">Upload Quiz File</h3>
            <div className="ch-upload-area ch-quiz-upload-area">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="#1ba8d5" strokeWidth={1.5} strokeLinecap="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#e0f7ff" stroke="none"/>
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p className="ch-upload-text">
                <span className="ch-upload-link">Upload a file</span> or drag and drop
              </p>
              <p className="ch-upload-hint">Upload Bulk Quiz File / Excel File</p>
            </div>
            <div className="ch-modal-footer ch-modal-footer-right">
              <button className="ch-btn-primary" onClick={onClose}>Upload Quiz</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Add Content Modal ── */
function AddContentModal({ onClose }) {
  const [step, setStep] = useState(1); // 1=select type, 2=form
  const [selectedType, setSelectedType] = useState('Video');
  const [formData, setFormData] = useState({
    title: '', duration: '', description: '', content: '', fileSize: 'Auto- Fetched',
  });

  const CONTENT_TYPES = [
    { id: 'Video',    label: 'Video',          desc: 'Upload a video file or add a video link.', bg: '#dbeafe', color: '#2563eb', icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z' },
    { id: 'PDF',      label: 'Document (PDF)', desc: 'Upload a PDF file for learners to read.',  bg: '#fee2e2', color: '#dc2626', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { id: 'Text',     label: 'Text Content',   desc: 'Add detailed content using a rich text editor.', bg: '#fef3c7', color: '#d97706', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'Quiz',     label: 'Quiz',           desc: 'Create interactive questions for learners.', bg: '#ede9fe', color: '#7c3aed', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleChange = (key, val) => setFormData((p) => ({ ...p, [key]: val }));

  return (
    <div className="ch-modal-backdrop" onClick={onClose}>
      <div className="ch-modal ch-modal-wide" onClick={(e) => e.stopPropagation()}>

        {/* ── Step 1: Select Type ── */}
        {step === 1 && (
          <>
            <div className="ch-modal-header">
              <div>
                <h2 className="ch-modal-title">Select Content Type</h2>
                <p className="ch-modal-subtitle">Choose the type of content you want to add to your course.</p>
              </div>
              <button className="ch-modal-close" onClick={onClose} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="ch-modal-divider"/>
            <div className="ch-content-type-grid">
              {CONTENT_TYPES.map((ct) => (
                <label key={ct.id}
                  className={`ch-content-type-card${selectedType === ct.id ? ' selected' : ''}`}>
                  <input type="radio" name="contentType" value={ct.id}
                    checked={selectedType === ct.id}
                    onChange={() => setSelectedType(ct.id)}
                    className="ch-radio-hidden"/>
                  <div className="ch-content-type-radio">
                    {selectedType === ct.id && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1ba8d5">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="5" fill="#fff"/>
                      </svg>
                    )}
                  </div>
                  <div className="ch-content-type-icon" style={{ background: ct.bg }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke={ct.color} strokeWidth={2} strokeLinecap="round">
                      <path d={ct.icon}/>
                    </svg>
                  </div>
                  <div>
                    <div className="ch-content-type-label">{ct.label}</div>
                    <div className="ch-content-type-desc">{ct.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="ch-modal-footer ch-modal-footer-right">
              <button className="ch-btn-primary" onClick={() => setStep(2)}>Next</button>
            </div>
          </>
        )}

        {/* ── Step 2: Add Video ── */}
        {step === 2 && selectedType === 'Video' && (
          <>
            <div className="ch-modal-header">
              <h2 className="ch-modal-title">Add Video</h2>
              <button className="ch-modal-close" onClick={onClose} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="ch-modal-divider"/>
            <div className="ch-modal-body">
              <div className="ch-form-group">
                <label className="ch-label">Title</label>
                <input className="ch-input" type="text" placeholder="Title"
                  value={formData.title} onChange={(e) => handleChange('title', e.target.value)}/>
              </div>
              <div className="ch-form-group">
                <label className="ch-label">Upload Video</label>
                <div className="ch-upload-area">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p className="ch-upload-text">
                    <span className="ch-upload-link">Upload a file</span> or drag and drop
                  </p>
                  <p className="ch-upload-hint">Video files</p>
                </div>
              </div>
              <div className="ch-form-group">
                <label className="ch-label">Duration</label>
                <input className="ch-input" type="text" placeholder="10 min"
                  value={formData.duration} onChange={(e) => handleChange('duration', e.target.value)}/>
              </div>
              <div className="ch-form-group">
                <label className="ch-label">Description</label>
                <textarea className="ch-textarea" placeholder="Enter short description"
                  value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={3}/>
              </div>
            </div>
            <div className="ch-modal-footer ch-modal-footer-right">
              <button className="ch-btn-primary" onClick={onClose}>Upload Video</button>
            </div>
          </>
        )}

        {/* ── Step 2: Add Document (PDF) ── */}
        {step === 2 && selectedType === 'PDF' && (
          <>
            <div className="ch-modal-header">
              <h2 className="ch-modal-title">Add Document</h2>
              <button className="ch-modal-close" onClick={onClose} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="ch-modal-divider"/>
            <div className="ch-modal-body">
              <div className="ch-form-group">
                <label className="ch-label">Title</label>
                <input className="ch-input" type="text" placeholder="Title"
                  value={formData.title} onChange={(e) => handleChange('title', e.target.value)}/>
              </div>
              <div className="ch-form-group">
                <label className="ch-label">Upload PDF</label>
                <div className="ch-upload-area">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                    stroke="#1ba8d5" strokeWidth={2} strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p className="ch-upload-text">
                    <span className="ch-upload-link">Upload a file</span> or drag and drop
                  </p>
                  <p className="ch-upload-hint">PDF files up to 100MB</p>
                </div>
              </div>
              <div className="ch-form-group">
                <label className="ch-label">File Size</label>
                <input className="ch-input" type="text" placeholder="Auto- Fetched"
                  value={formData.fileSize} onChange={(e) => handleChange('fileSize', e.target.value)} disabled/>
                <p className="ch-field-hint">File size is automatically calculated</p>
              </div>
              <div className="ch-form-group">
                <label className="ch-label">Description</label>
                <textarea className="ch-textarea" placeholder="Enter short description"
                  value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={3}/>
              </div>
            </div>
            <div className="ch-modal-footer ch-modal-footer-right">
              <button className="ch-btn-primary" onClick={onClose}>Upload Document</button>
            </div>
          </>
        )}

        {/* ── Step 2: Add Text Content ── */}
        {step === 2 && selectedType === 'Text' && (
          <>
            <div className="ch-modal-header">
              <h2 className="ch-modal-title">Add Text Content</h2>
              <button className="ch-modal-close" onClick={onClose} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="ch-modal-divider"/>
            <div className="ch-modal-body">
              <div className="ch-form-group">
                <label className="ch-label">Title</label>
                <input className="ch-input" type="text" placeholder="Title"
                  value={formData.title} onChange={(e) => handleChange('title', e.target.value)}/>
              </div>
              <div className="ch-form-group">
                <label className="ch-label">Description</label>
                <textarea className="ch-textarea" placeholder="Enter short description"
                  value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={3}/>
              </div>
              <div className="ch-form-group">
                <label className="ch-label">Content</label>
                <textarea className="ch-textarea ch-textarea-large" placeholder="1. What is Programming (Video Content)&#10;&#10;Content Text (for description / preview):&#10;Programming is the art of telling a computer what to do using a set of instructions called code. These instructions are written in programming languages like Java, Python, or JavaScript.&#10;&#10;In this video, you will learn:"
                  value={formData.content} onChange={(e) => handleChange('content', e.target.value)} rows={10}/>
              </div>
            </div>
            <div className="ch-modal-footer ch-modal-footer-right">
              <button className="ch-btn-primary" onClick={onClose}>Upload Text Content</button>
            </div>
          </>
        )}

        {/* ── Step 2: Add Quiz (placeholder) ── */}
        {step === 2 && selectedType === 'Quiz' && (
          <QuizModal onClose={onClose} />
        )}
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function ChaptersView() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();

  // Detect flow: Flow 2 = /courses/:courseId/chapters, Flow 1 = /subjects/:subjectId/chapters
  const isDirect = !location.pathname.includes('/subjects/');

  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [showCreateChapter, setShowCreateChapter] = useState(false);
  const [showAddContent, setShowAddContent] = useState(false);
  const [search, setSearch] = useState('');

  const toggleSection = (id) =>
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, expanded: !s.expanded } : s));

  const handleAddChapter = (title) => {
    if (!title.trim()) return;
    setSections((prev) => [...prev, {
      id: Date.now(),
      title: `Section ${prev.length + 1}: ${title}`,
      contentItems: 0,
      expanded: true,
      contents: [],
      preview: null,
    }]);
  };

  const handleDeleteSection = (id) =>
    setSections((prev) => prev.filter((s) => s.id !== id));

  const handleSwitchHierarchy = () => {
    if (isDirect) {
      navigate(`/dashboard/course-management/courses/${courseId}/subjects`);
    } else {
      navigate(`/dashboard/course-management/courses/${courseId}/chapters`);
    }
  };

  return (
    <div className="ch-page">

      {/* ── Page header ── */}
      <div className="ch-page-header">
        <div className="ch-header-left">
          <button className="ch-back-btn" onClick={() => navigate(-1)} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <h1 className="ch-page-title">Core Java</h1>
        </div>
        <span className="ch-breadcrumb">Course Management</span>
      </div>

      {/* ── Body ── */}
      <div className="ch-body">

        {/* Toolbar */}
        <div className="ch-toolbar">
          <span className="ch-toolbar-label">Chapters Listing</span>
          <div className="ch-toolbar-actions">
            <div className="ch-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search" className="ch-search-input"
                value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <button className="ch-filter-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filters
            </button>
            {/* Switch hierarchy — only in Flow 2 (direct) when no sections yet */}
            {isDirect && sections.length === 0 && (
              <button className="ch-switch-btn" onClick={handleSwitchHierarchy}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
                Switch hierarchy
              </button>
            )}
            <button className="ch-add-btn" onClick={() => setShowCreateChapter(true)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              + Add Chapter
            </button>
          </div>
        </div>

        {/* Sections list */}
        {sections.length === 0 ? (
          <div className="ch-empty-wrap">
            <div className="ch-empty">
              <EmptyIllustration/>
              <h2 className="ch-empty-title">No Content Yet</h2>
              <p className="ch-empty-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
            </div>
          </div>
        ) : (
          <div className="ch-sections">
            {sections.map((section) => (
              <div key={section.id} className="ch-section">
                {/* Section header */}
                <div className="ch-section-header" onClick={() => toggleSection(section.id)}>
                  <div>
                    <div className="ch-section-title">{section.title}</div>
                    <div className="ch-section-meta">Content Items: {section.contentItems}</div>
                  </div>
                  <button className="ch-section-toggle" aria-label="Toggle section">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d={section.expanded ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}/>
                    </svg>
                  </button>
                </div>

                {/* Section content */}
                {section.expanded && (
                  <div className="ch-section-body">
                    {section.contents.length === 0 ? (
                      <div className="ch-section-empty">
                        <EmptyIllustration/>
                        <h3 className="ch-empty-title" style={{ fontSize: 18 }}>No Content Yet</h3>
                        <p className="ch-empty-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                      </div>
                    ) : (
                      <>
                        {/* Content items */}
                        <div className="ch-content-list">
                          {section.contents.map((item) => (
                            <div key={item.id} className="ch-content-item">
                              <ContentIcon type={item.type}/>
                              <div className="ch-content-info">
                                <div className="ch-content-title">{item.title}</div>
                                <div className="ch-content-type-tag">{item.type}</div>
                                <div className="ch-content-desc">{item.desc}</div>
                              </div>
                              <div className="ch-content-actions">
                                <button className="ch-icon-btn" aria-label="Settings">
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth={1.8}>
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                                  </svg>
                                </button>
                                <button className="ch-icon-btn" aria-label="Edit">
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                  </svg>
                                </button>
                                <button className="ch-icon-btn ch-icon-btn-danger" aria-label="Delete">
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                                    <path d="M10 11v6M14 11v6"/>
                                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Preview block */}
                        {section.preview && (
                          <div className="ch-preview-block">
                            <div className="ch-preview-title">{section.preview.title}</div>
                            <div className="ch-preview-body">
                              {section.preview.body.split('\n').map((line, i) => (
                                <p key={i} className="ch-preview-line">{line}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Section footer actions */}
                    <div className="ch-section-footer">
                      <button className="ch-btn-delete-section"
                        onClick={() => handleDeleteSection(section.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                        </svg>
                        Delete Section
                      </button>
                      <button className="ch-btn-add-content"
                        onClick={() => setShowAddContent(true)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                          <path d="M12 5v14M5 12h14"/>
                        </svg>
                        + Add Content
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Bottom actions */}
      <div className="ch-bottom-actions">
        <button className="ch-btn-back-nav" onClick={() => navigate(-1)}>Back</button>
        <button className="ch-btn-draft">Save as Draft</button>
        <button className="ch-btn-publish">Published</button>
      </div>

      {/* Modals */}
      {showCreateChapter && (
        <CreateChapterModal
          onClose={() => setShowCreateChapter(false)}
          onAdd={handleAddChapter}
        />
      )}
      {showAddContent && (
        <AddContentModal onClose={() => setShowAddContent(false)}/>
      )}
    </div>
  );
}
