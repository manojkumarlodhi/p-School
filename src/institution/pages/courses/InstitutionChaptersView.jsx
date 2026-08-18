import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './institutioncourses.css';

const SearchIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>);
const FilterIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const BackIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>);
const ChevronDown = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>);
const CloseIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>);
const UploadCloudIcon = () => (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1ba8d5" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>);
const HierarchyIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="6" height="4" rx="1"/><rect x="15" y="3" width="6" height="4" rx="1"/><rect x="9" y="17" width="6" height="4" rx="1"/><path d="M6 7v4h12V7M12 11v6"/></svg>);
const TrashIcon = ({ color = "#ef4444", size = 14 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>);
const GearIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>);
const PencilIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);

const VideoIcon = ({ size = 22 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><polygon points="10 8 16 11 10 14 10 8" fill="#3b82f6" stroke="none"/></svg>);
const DocIcon = ({ size = 22 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>);
const TextIcon = ({ size = 22 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>);
const QuizIcon = ({ size = 22 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>);

const CONTENT_TYPES = [
  { key: "video",    label: "Video",          desc: "Upload a video file or add a video link.", Icon: VideoIcon, bg: "#eff6ff" },
  { key: "document", label: "Document (PDF)", desc: "Upload a PDF file for learners to read.",  Icon: DocIcon,   bg: "#fff" },
  { key: "text",     label: "Text Content",   desc: "Add detailed content using a rich text editor.", Icon: TextIcon, bg: "#fff" },
  { key: "quiz",     label: "Quiz",           desc: "Create interactive questions for learners.", Icon: QuizIcon, bg: "#fff" },
];

const HIERARCHIES = [
  "Course >> Subject >> Chapter >> Content",
  "Course >> Chapter >> Content",
];

const DEMO_CHAPTERS = [
  {
    id: 1,
    title: "Section 1: Introduction to Programming",
    items: 4,
    contents: [
      { id: 1, type: "video",    title: "What is Programming",      desc: "Learn the basics of programming and get started with your first program." },
      { id: 2, type: "document", title: "Programming Basics Notes", desc: "Learn the basics of programming and get started with your first program." },
      { id: 3, type: "quiz",     title: "Introduction Quiz",        desc: "Learn the basics of programming and get started with your first program." },
      { id: 4, type: "text",     title: "Text Content",             desc: "Learn the basics of programming and get started with your first program.",
        textContent: "1. What is Programming (Video Content)\n\nContent Text (for description / preview):\nProgramming is the art of telling a computer what to do using a set of instructions called code. These instructions are written in programming languages like Java, Python, or JavaScript.\n\nIn this video, you will learn:\n- What programming actually means\n- How computers understand code\n- Real-life examples of programming\n- Basic overview of programming languages" },
    ],
  },
  { id: 2, title: "Section 2: Variables and Data Types",        items: 3, contents: [] },
  { id: 3, title: "Section 3: Control Flow",                    items: 3, contents: [] },
  { id: 4, title: "Section 4: Functions and Methods",           items: 3, contents: [] },
  { id: 5, title: "Section 5: Object-Oriented Programming",     items: 3, contents: [] },
  { id: 6, title: "Section 6: Advanced Topics",                 items: 3, contents: [] },
];

function typeLabel(type) {
  return { video: "Video", document: "PDF", quiz: "Quiz", text: "Text" }[type] || type;
}

function ContentTypeIcon({ type }) {
  const cfg = {
    video:    { bg: "#dbeafe", Icon: VideoIcon },
    document: { bg: "#fee2e2", Icon: DocIcon },
    quiz:     { bg: "#ede9fe", Icon: QuizIcon },
    text:     { bg: "#fef3c7", Icon: TextIcon },
  }[type] || { bg: "#f3f4f6", Icon: TextIcon };
  return (
    <div style={{ width: 44, height: 44, borderRadius: 10, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <cfg.Icon size={22} />
    </div>
  );
}

function EmptyState({ message = "No Content Yet", sub = "Add chapters to get started." }) {
  return (
    <div className="icm-empty-state">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
      <p className="icm-empty-title">{message}</p>
      <p className="icm-empty-desc">{sub}</p>
    </div>
  );
}

function DropZone({ hint }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  function handleDrop(e) { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) setFile(f.name); }
  function handleChange(e) { const f = e.target.files?.[0]; if (f) setFile(f.name); }
  return (
    <div className={"icm-drop-zone" + (dragging ? " dragging" : "") + (file ? " has-file" : "")}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => ref.current?.click()}>
      <UploadCloudIcon />
      {file ? <p className="icm-drop-filename">{file}</p> : <>
        <p className="icm-drop-text"><span className="icm-drop-link">Upload a file</span> or drag and drop</p>
        <p className="icm-drop-hint">{hint}</p>
      </>}
      <input ref={ref} type="file" style={{ display: "none" }} onChange={handleChange} />
    </div>
  );
}

function SelectTypeModal({ onClose, onNext }) {
  const [selected, setSelected] = useState("video");
  return (
    <div className="icm-modal-overlay" onClick={onClose}>
      <div className="icm-modal" onClick={e => e.stopPropagation()}>
        <div className="icm-modal-header">
          <div>
            <h3 className="icm-modal-title">Select Content Type</h3>
            <p className="icm-modal-subtitle">Choose the type of content you want to add.</p>
          </div>
          <button className="icm-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="icm-modal-body">
          <div className="icm-content-type-grid">
            {CONTENT_TYPES.map(ct => (
              <label key={ct.key} className={"icm-content-type-card" + (selected === ct.key ? " selected" : "")}
                style={selected === ct.key ? { background: ct.bg } : {}}
                onClick={() => setSelected(ct.key)}>
                <div className="icm-ct-top">
                  <ct.Icon size={28} />
                  <input type="radio" className="icm-ct-radio" checked={selected === ct.key} onChange={() => setSelected(ct.key)} />
                </div>
                <div className="icm-ct-label">{ct.label}</div>
                <div className="icm-ct-desc">{ct.desc}</div>
              </label>
            ))}
          </div>
          <div className="icm-modal-actions">
            <button className="icm-btn-primary" onClick={() => onNext(selected)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddVideoModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("10 min");
  const [desc, setDesc] = useState("");
  return (
    <div className="icm-modal-overlay" onClick={onClose}>
      <div className="icm-modal" onClick={e => e.stopPropagation()}>
        <div className="icm-modal-header">
          <h3 className="icm-modal-title">Add Video</h3>
          <button className="icm-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="icm-modal-body">
          <div className="icm-form-field">
            <label className="icm-form-label">Title</label>
            <input className="icm-form-input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="icm-form-field">
            <label className="icm-form-label">Upload Video</label>
            <DropZone hint="Video files" />
          </div>
          <div className="icm-form-field">
            <label className="icm-form-label">Duration</label>
            <input className="icm-form-input" placeholder="e.g. 10 min" value={duration} onChange={e => setDuration(e.target.value)} />
          </div>
          <div className="icm-form-field">
            <label className="icm-form-label">Description</label>
            <textarea className="icm-form-textarea" rows={3} placeholder="Enter short description" value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <div className="icm-modal-actions">
            <button className="icm-btn-primary" onClick={onClose}>Upload Video</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddDocumentModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className="icm-modal-overlay" onClick={onClose}>
      <div className="icm-modal" onClick={e => e.stopPropagation()}>
        <div className="icm-modal-header">
          <h3 className="icm-modal-title">Add Document</h3>
          <button className="icm-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="icm-modal-body">
          <div className="icm-form-field">
            <label className="icm-form-label">Title</label>
            <input className="icm-form-input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="icm-form-field">
            <label className="icm-form-label">Upload PDF</label>
            <DropZone hint="PDF files up to 100MB" />
          </div>
          <div className="icm-form-field">
            <label className="icm-form-label">File Size</label>
            <input className="icm-form-input" value="Auto-Fetched" readOnly style={{ color: "#9ca3af" }} />
            <p className="icm-form-hint">File size is automatically calculated</p>
          </div>
          <div className="icm-form-field">
            <label className="icm-form-label">Description</label>
            <textarea className="icm-form-textarea" rows={3} placeholder="Enter short description" value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <div className="icm-modal-actions">
            <button className="icm-btn-primary" onClick={onClose}>Upload Document</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddTextModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("1. What is Programming (Video Content)\n\nContent Text (for description / preview):\nProgramming is the art of telling a computer what to do using a set of instructions called code.\n\nIn this video, you will learn:");
  return (
    <div className="icm-modal-overlay" onClick={onClose}>
      <div className="icm-modal" onClick={e => e.stopPropagation()}>
        <div className="icm-modal-header">
          <h3 className="icm-modal-title">Add Text Content</h3>
          <button className="icm-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="icm-modal-body">
          <div className="icm-form-field">
            <label className="icm-form-label">Title</label>
            <input className="icm-form-input" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="icm-form-field">
            <label className="icm-form-label">Description</label>
            <textarea className="icm-form-textarea" rows={3} placeholder="Enter short description" value={desc} onChange={e => setDesc(e.target.value)} />
          </div>
          <div className="icm-form-field">
            <label className="icm-form-label">Content</label>
            <textarea className="icm-form-textarea" rows={7} value={content} onChange={e => setContent(e.target.value)} />
          </div>
          <div className="icm-modal-actions">
            <button className="icm-btn-primary" onClick={onClose}>Upload Text Content</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const EMPTY_QUESTION = (n) => ({ id: n, type: "mcq", text: "", options: ["Option A", "Option B", "Option C", "Option D"], answer: "" });

function AddQuizModal({ onClose }) {
  const [tab, setTab] = useState("single");
  const [questions, setQuestions] = useState([
    { id: 1, type: "mcq", text: "", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option D" },
    { id: 2, type: "tf",  text: "", options: [], answer: "True" },
  ]);
  const [csvFile, setCsvFile] = useState(null);
  const csvRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function addQuestion() { setQuestions(prev => [...prev, EMPTY_QUESTION(Date.now())]); }
  function removeQuestion(id) { setQuestions(prev => prev.filter(q => q.id !== id)); }
  function setQType(id, type) {
    setQuestions(prev => prev.map(q => q.id === id
      ? { ...q, type, options: type === "mcq" ? ["Option A","Option B","Option C","Option D"] : [], answer: type === "tf" ? "True" : "" } : q));
  }
  function setQText(id, text) { setQuestions(prev => prev.map(q => q.id === id ? { ...q, text } : q)); }
  function setQOption(id, idx, val) {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, options: q.options.map((o, i) => i === idx ? val : o) } : q));
  }
  function setQAnswer(id, val) { setQuestions(prev => prev.map(q => q.id === id ? { ...q, answer: val } : q)); }

  return (
    <div className="icm-modal-overlay" onClick={onClose}>
      <div className="icm-modal icm-modal--quiz" onClick={e => e.stopPropagation()}>
        <div className="icm-modal-header">
          <h3 className="icm-modal-title">Add Quiz</h3>
          <button className="icm-modal-close" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="icm-quiz-tabs">
          <button className={"icm-quiz-tab" + (tab === "single" ? " active" : "")} onClick={() => setTab("single")}>Single</button>
          <button className={"icm-quiz-tab" + (tab === "bulk" ? " active" : "")} onClick={() => setTab("bulk")}>Bulk</button>
        </div>
        <div className="icm-modal-body">
          {tab === "single" && (
            <>
              <div className="icm-quiz-header-row">
                <span className="icm-quiz-section-title">Questions</span>
                <button className="icm-add-q-btn" onClick={addQuestion}>+ Add Questions</button>
              </div>
              <div className="icm-questions-list">
                {questions.map((q, idx) => (
                  <div key={q.id} className="icm-question-card">
                    <div className="icm-question-top">
                      <span className="icm-question-label">Questions {String(idx + 1).padStart(2, "0")}</span>
                      <button className="icm-q-delete-btn" onClick={() => removeQuestion(q.id)}>
                        <TrashIcon color="#ef4444" size={14} />
                      </button>
                    </div>
                    <div className="icm-q-type-row">
                      <span className="icm-q-type-label">Type</span>
                      <label className="icm-q-radio-label"><input type="radio" className="icm-q-radio" checked={q.type === "mcq"} onChange={() => setQType(q.id, "mcq")} /> MCQ</label>
                      <label className="icm-q-radio-label"><input type="radio" className="icm-q-radio" checked={q.type === "tf"} onChange={() => setQType(q.id, "tf")} /> True &amp; False</label>
                    </div>
                    <div className="icm-q-field">
                      <label className="icm-form-label">Questions Text</label>
                      <textarea className="icm-form-textarea" rows={3} placeholder="Enter The Question Text....." value={q.text} onChange={e => setQText(q.id, e.target.value)} />
                    </div>
                    {q.type === "mcq" && (
                      <div className="icm-q-field">
                        <label className="icm-form-label">Option</label>
                        {q.options.map((opt, i) => (
                          <input key={i} className="icm-form-input icm-q-option-input" value={opt} onChange={e => setQOption(q.id, i, e.target.value)} />
                        ))}
                      </div>
                    )}
                    <div className="icm-q-field">
                      <label className="icm-form-label">Correct Answer</label>
                      <input className="icm-form-input" value={q.answer} onChange={e => setQAnswer(q.id, e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === "bulk" && (
            <>
              <p className="icm-quiz-section-title" style={{ marginBottom: 14 }}>Upload Quiz File</p>
              <div className={"icm-drop-zone" + (dragging ? " dragging" : "") + (csvFile ? " has-file" : "")}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) setCsvFile(f.name); }}
                onClick={() => csvRef.current?.click()}>
                <UploadCloudIcon />
                {csvFile ? <p className="icm-drop-filename">{csvFile}</p> : <>
                  <p className="icm-drop-text"><span className="icm-drop-link">Upload a file</span> or drag and drop</p>
                  <p className="icm-drop-hint">Upload Bulk Quiz File / Excel File</p>
                </>}
                <input ref={csvRef} type="file" accept=".csv,.xlsx,.xls" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) setCsvFile(f.name); }} />
              </div>
            </>
          )}
          <div className="icm-modal-actions" style={{ marginTop: 20 }}>
            <button className="icm-btn-primary" onClick={onClose}>Upload Quiz</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterItem({ chapter, onAddContent, onDeleteSection }) {
  const [open, setOpen] = useState(chapter.id === 1);
  return (
    <div className="icm-chapter-item">
      <button className="icm-chapter-header" onClick={() => setOpen(o => !o)}>
        <div className="icm-chapter-info">
          <div className="icm-chapter-title">{chapter.title}</div>
          <div className="icm-chapter-meta">Content Items: {chapter.items}</div>
        </div>
        <span className={"icm-chapter-chevron" + (open ? " open" : "")}><ChevronDown /></span>
      </button>
      {open && (
        <div className="icm-chapter-content">
          {chapter.contents && chapter.contents.length > 0 ? (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
                {chapter.contents.map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 14, background: "#fff", borderRadius: 10, border: "1px solid #e8eaf0" }}>
                    <ContentTypeIcon type={item.type} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{item.title}</div>
                      <div style={{ fontSize: 11.5, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{typeLabel(item.type)}</div>
                      <div style={{ fontSize: 12.5, color: "#6b7280", lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><GearIcon /></button>
                      <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><PencilIcon /></button>
                      <button style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #fecaca", background: "#fff5f5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><TrashIcon color="#ef4444" size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
              {chapter.contents.find(c => c.type === "text" && c.textContent) && (
                <div style={{ padding: 16, background: "#f9fafb", borderRadius: 10, border: "1px solid #e8eaf0", marginBottom: 16 }}>
                  <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {chapter.contents.find(c => c.type === "text" && c.textContent)?.textContent}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button onClick={() => onDeleteSection?.(chapter.id)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid #fecaca", background: "#fff5f5", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <TrashIcon color="#ef4444" size={14} /> Delete Section
                </button>
                <button className="icm-add-content-btn" onClick={onAddContent}>+ Add Content</button>
              </div>
            </>
          ) : (
            <>
              <div className="icm-empty-state" style={{ padding: "32px 20px" }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <p className="icm-empty-title">No Content Yet</p>
                <p className="icm-empty-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                <button onClick={() => onDeleteSection?.(chapter.id)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid #fecaca", background: "#fff5f5", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <TrashIcon color="#ef4444" size={14} /> Delete Section
                </button>
                <button className="icm-add-content-btn" onClick={onAddContent}>+ Add Content</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function InstitutionChaptersView() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [chapters, setChapters] = useState(DEMO_CHAPTERS);
  const [modal, setModal] = useState(null);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [selectedHierarchy, setSelectedHierarchy] = useState("Course >> Chapter >> Content");

  function handleAddChapter() {
    if (!newChapterTitle.trim()) return;
    setChapters(prev => [...prev, { id: Date.now(), title: newChapterTitle.trim(), items: 0, contents: [] }]);
    setNewChapterTitle("");
    setModal(null);
  }

  function handleDeleteSection(id) { setChapters(prev => prev.filter(c => c.id !== id)); }
  function handleContentTypeNext(type) { setModal(type); }

  const filtered = chapters.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="icm-page" onClick={() => showHierarchy && setShowHierarchy(false)}>
      <div className="icm-page-header">
        <button className="icm-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /><span>Core Java</span>
        </button>
        <span className="icm-breadcrumb">Course Management</span>
      </div>

      <div className="icm-body">
        <div className="icm-toolbar">
          <h2 className="icm-section-title">Chapters Listing</h2>
          <div className="icm-toolbar-right">
            <div className="icm-search-wrap">
              <SearchIcon />
              <input className="icm-search" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="icm-btn icm-btn--outline"><FilterIcon /> Filters</button>
            <div style={{ position: "relative" }}>
              <button className="icm-btn icm-btn--outline" onClick={e => { e.stopPropagation(); setShowHierarchy(v => !v); }}>
                <HierarchyIcon /> Switch Hierarchy
              </button>
              {showHierarchy && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 200, minWidth: 280, overflow: "hidden" }} onClick={e => e.stopPropagation()}>
                  {HIERARCHIES.map(h => (
                    <div key={h}
                      style={{ padding: "13px 18px", fontSize: 13.5, cursor: "pointer", borderBottom: "1px solid #f3f4f6", background: selectedHierarchy === h ? "#1ba8d5" : "#fff", color: selectedHierarchy === h ? "#fff" : "#374151", fontWeight: selectedHierarchy === h ? 600 : 400 }}
                      onClick={() => { setSelectedHierarchy(h); setShowHierarchy(false); }}>
                      {h}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="icm-btn icm-btn--primary" onClick={() => setModal("addChapter")}>+ Add Chapter</button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8eaf0", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
            <EmptyState message="No Content Yet" sub="Click Add Chapter to create your first chapter." />
          </div>
        ) : (
          <div className="icm-chapters-list">
            {filtered.map(ch => (
              <ChapterItem key={ch.id} chapter={ch} onAddContent={() => setModal("select")} onDeleteSection={handleDeleteSection} />
            ))}
          </div>
        )}
      </div>

      {modal === "addChapter" && (
        <div className="icm-modal-overlay" onClick={() => setModal(null)}>
          <div className="icm-modal" onClick={e => e.stopPropagation()}>
            <div className="icm-modal-header">
              <h3 className="icm-modal-title">Add Chapter</h3>
              <button className="icm-modal-close" onClick={() => setModal(null)}><CloseIcon /></button>
            </div>
            <div className="icm-modal-body">
              <div className="icm-form-field">
                <label className="icm-form-label">Chapter Title</label>
                <input className="icm-form-input" placeholder="Title" value={newChapterTitle} onChange={e => setNewChapterTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAddChapter()} autoFocus />
              </div>
              <div className="icm-modal-actions">
                <button className="icm-btn-primary" onClick={handleAddChapter}>Add Chapter</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal === "select"   && <SelectTypeModal  onClose={() => setModal(null)} onNext={handleContentTypeNext} />}
      {modal === "video"    && <AddVideoModal    onClose={() => setModal(null)} />}
      {modal === "document" && <AddDocumentModal onClose={() => setModal(null)} />}
      {modal === "text"     && <AddTextModal     onClose={() => setModal(null)} />}
      {modal === "quiz"     && <AddQuizModal     onClose={() => setModal(null)} />}
    </div>
  );
}
