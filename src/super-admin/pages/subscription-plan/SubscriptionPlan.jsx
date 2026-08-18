import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './subscriptionplan.css';

/* ── Tabs ── */
const TABS = ['Institute', 'Instructor', 'Student'];

/* ── Institute plans data ── */
const INSTITUTE_PLANS = [
  { id: 1, name: 'Per-Seat Licensing',   category: 'Free Plan',    monthly: 1000, annual: 1000, lifetime: 1000, active: true  },
  { id: 2, name: 'Concurrent Licensing', category: 'Basic Plan',   monthly: 2000, annual: 2000, lifetime: 2000, active: true  },
  { id: 3, name: 'Unlimited Licensing',  category: 'Premium Plan', monthly: 3000, annual: 3000, lifetime: 3000, active: true  },
];

/* ── Instructor plans data ── */
const INSTRUCTOR_PLANS = [
  { id: 1, name: 'Free Instructor', category: 'Free Plan',  annual: 0,    yearly: 0,    active: true },
  { id: 2, name: 'Pro Instructor',  category: 'Basic Plan', annual: 2000, yearly: 2000, active: true },
];

/* ── Student plans data ── */
const STUDENT_PLANS = [
  { id: 1, name: 'Free',                    category: 'Free Plan',  monthly: '00',  annual: '00',  lifetime: '00',  active: true },
  { id: 2, name: 'Basic (Single Discipline)',category: 'Basic Plan', monthly: 2000,  annual: 2000,  lifetime: 2000,  active: true },
  { id: 3, name: 'Premium',                 category: 'Basic Plan', monthly: 3000,  annual: 3000,  lifetime: 3000,  active: true },
  { id: 4, name: 'Family',                  category: 'Basic Plan', monthly: 3000,  annual: 3000,  lifetime: 3000,  active: true },
];

const TOTAL_PAGES = 10;

/* ── Toggle switch ── */
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`sp-toggle${checked ? ' sp-toggle--on' : ''}`}
    >
      <span className="sp-toggle-thumb" />
    </button>
  );
}

/* ── Action buttons ── */
function ActionBtns() {
  return (
    <div className="sp-action-btns">
      {/* View */}
      <button className="sp-action-btn sp-action-btn--view" title="View">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
      {/* Edit */}
      <button className="sp-action-btn sp-action-btn--edit" title="Edit">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>
      {/* Delete */}
      <button className="sp-action-btn sp-action-btn--delete" title="Delete">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
        </svg>
      </button>
    </div>
  );
}

/* ── Search icon ── */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}

/* ── Filter icon ── */
function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  );
}

/* ── Pagination ── */
function Pagination({ currentPage, setCurrentPage }) {
  return (
    <div className="sp-pagination">
      <button className="sp-page-prev"
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}>
        ← Previous
      </button>
      <div className="sp-page-numbers">
        {[1, 2, 3].map(n => (
          <button key={n}
            className={`sp-page-num${currentPage === n ? ' active' : ''}`}
            onClick={() => setCurrentPage(n)}>
            {n}
          </button>
        ))}
        <span className="sp-page-ellipsis">...</span>
        {[8, 9, 10].map(n => (
          <button key={n}
            className={`sp-page-num${currentPage === n ? ' active' : ''}`}
            onClick={() => setCurrentPage(n)}>
            {n}
          </button>
        ))}
      </div>
      <button className="sp-page-next"
        onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))}
        disabled={currentPage === TOTAL_PAGES}>
        Next →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function SubscriptionPlan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState('Institute');
  const [search, setSearch]           = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [instPlans, setInstPlans]     = useState(INSTITUTE_PLANS);
  const [instrPlans, setInstrPlans]   = useState(INSTRUCTOR_PLANS);
  const [studPlans, setStudPlans]     = useState(STUDENT_PLANS);

  function toggleInst(id) {
    setInstPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }
  function toggleInstr(id) {
    setInstrPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }
  function toggleStud(id) {
    setStudPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSearch('');
    setCurrentPage(1);
  }

  const breadcrumbSub = activeTab === 'Institute' ? 'Institute'
    : activeTab === 'Instructor' ? 'Instructor' : 'Student';

  return (
    <div className="sp-page">

      {/* ── Page header ── */}
      <div className="sp-page-header">
        <h1 className="sp-page-title">Subscription plan</h1>
        <span className="sp-breadcrumb">
          Subscription plan &rsaquo; {breadcrumbSub}
        </span>
      </div>

      {/* ── Tabs ── */}
      <div className="sp-tabs">
        {TABS.map(tab => (
          <button key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            className={`sp-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => handleTabChange(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div className="sp-body">

        {/* ── Institute tab ── */}
        {activeTab === 'Institute' && (
          <div className="sp-table-card">
            {/* Toolbar */}
            <div className="sp-toolbar">
              <h2 className="sp-section-title">Institutions Plan List</h2>
              <div className="sp-toolbar-actions">
                <div className="sp-search">
                  <SearchIcon />
                  <input type="text" placeholder="Search" className="sp-search-input"
                    value={search} onChange={e => setSearch(e.target.value)} aria-label="Search"/>
                </div>
                <button className="sp-filter-btn"><FilterIcon /> Filters</button>
                <button className="sp-create-btn"
                  onClick={() => navigate('/dashboard/subscription-plan/create-institute')}>
                  + Create Institutions Plan
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="sp-table-wrap">
              <table className="sp-table">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Plan Category</th>
                    <th>Monthly Price</th>
                    <th>Annual Price</th>
                    <th>Life Time Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {instPlans
                    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) ||
                                 p.category.toLowerCase().includes(search.toLowerCase()))
                    .map(plan => (
                      <tr key={plan.id}>
                        <td className="sp-td-name">{plan.name}</td>
                        <td>{plan.category}</td>
                        <td>{plan.monthly}</td>
                        <td>{plan.annual}</td>
                        <td>{plan.lifetime}</td>
                        <td><Toggle checked={plan.active} onChange={() => toggleInst(plan.id)}/></td>
                        <td><ActionBtns /></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
        )}

        {/* ── Instructor tab ── */}
        {activeTab === 'Instructor' && (
          <div className="sp-table-card">
            {/* Toolbar */}
            <div className="sp-toolbar">
              <h2 className="sp-section-title">Instructor plan list</h2>
              <div className="sp-toolbar-actions">
                <div className="sp-search">
                  <SearchIcon />
                  <input type="text" placeholder="Search" className="sp-search-input"
                    value={search} onChange={e => setSearch(e.target.value)} aria-label="Search"/>
                </div>
                <button className="sp-filter-btn"><FilterIcon /> Filters</button>
                <button className="sp-create-btn"
                  onClick={() => navigate('/dashboard/subscription-plan/create-instructor')}>
                  + Create Instructor plan
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="sp-table-wrap">
              <table className="sp-table">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Plan Category</th>
                    <th>Annual Price</th>
                    <th>Yearly / Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {instrPlans
                    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) ||
                                 p.category.toLowerCase().includes(search.toLowerCase()))
                    .map(plan => (
                      <tr key={plan.id}>
                        <td className="sp-td-name">{plan.name}</td>
                        <td>{plan.category}</td>
                        <td>{plan.annual}</td>
                        <td>{plan.yearly}</td>
                        <td><Toggle checked={plan.active} onChange={() => toggleInstr(plan.id)}/></td>
                        <td><ActionBtns /></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
        )}

        {/* ── Student tab ── */}
        {activeTab === 'Student' && (
          <div className="sp-table-card">
            <div className="sp-toolbar">
              <h2 className="sp-section-title">Student List</h2>
              <div className="sp-toolbar-actions">
                <div className="sp-search">
                  <SearchIcon />
                  <input type="text" placeholder="Search" className="sp-search-input"
                    value={search} onChange={e => setSearch(e.target.value)} aria-label="Search"/>
                </div>
                <button className="sp-filter-btn"><FilterIcon /> Filters</button>
                <button className="sp-create-btn"
                  onClick={() => navigate('/dashboard/subscription-plan/create-student')}>
                  + Create Student plan
                </button>
              </div>
            </div>
            <div className="sp-table-wrap">
              <table className="sp-table">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Plan Category</th>
                    <th>Monthly Price</th>
                    <th>Annual Price</th>
                    <th>Life Time Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studPlans
                    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) ||
                                 p.category.toLowerCase().includes(search.toLowerCase()))
                    .map(plan => (
                      <tr key={plan.id}>
                        <td className="sp-td-name">{plan.name}</td>
                        <td>{plan.category}</td>
                        <td>{plan.monthly}</td>
                        <td>{plan.annual}</td>
                        <td>{plan.lifetime}</td>
                        <td><Toggle checked={plan.active} onChange={() => toggleStud(plan.id)}/></td>
                        <td><ActionBtns /></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
          </div>
        )}

      </div>
    </div>
  );
}
