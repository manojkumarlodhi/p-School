import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentViewModal from './StudentViewModal';
import './studentlist.css';

const STUDENTS = Array.from({ length: 6 }, (_, i) => ({
  id: 'STU001',
  name: 'Abhay Thakur',
  role: i === 0 ? 'Child' : i === 1 ? 'Junior Student' : i === 2 ? 'Senior Student' : 'Adult',
  institution: i === 2 ? 'Self Enroll' : 'Tech Academy Accra',
  country: 'India',
  ageGroup: i === 0 ? '8-12' : i === 1 ? '13-15' : i === 2 ? '16-19' : '20+',
  status: true,
  subscription: i === 0 || i === 2 ? 'Premium' : 'Standard',
}));

const STATS = [
  { label: 'Total Student',      value: '2000' },
  { label: 'Institute Students', value: '400'  },
  { label: 'Individual Students',value: '400'  },
  { label: 'Subscription',       value: '600'  },
];

const AGE_STATS = [
  { label: 'Age 8-12',  value: '400' },
  { label: 'Age 13-15', value: '600' },
  { label: 'Age 16-19', value: '600' },
  { label: 'Age 20+',   value: '600' },
];

export default function StudentList() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="student-list-page">

      {/* ── Page header ── */}
      <div className="student-page-header">
        <h1 className="student-page-title">Student</h1>
        <span className="student-breadcrumb">User Management &rsaquo; Student</span>
      </div>

      <div className="student-body">

        {/* Stats row 1 */}
        <div className="student-stats-row">
          {STATS.map((s) => (
            <div key={s.label} className="student-stat-card">
              <div className="student-stat-label">{s.label}</div>
              <div className="student-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Stats row 2 */}
        <div className="student-stats-row">
          {AGE_STATS.map((s) => (
            <div key={s.label} className="student-stat-card">
              <div className="student-stat-label">{s.label}</div>
              <div className="student-stat-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="student-table-card">

          {/* Table toolbar */}
          <div className="student-table-header">
            <h2 className="student-table-title">Student List</h2>
            <div className="student-table-actions">
              <div className="student-search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input type="text" placeholder="Search" className="student-search-input" />
              </div>
              <button className="student-filter-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2}>
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                Filters
              </button>
              <button
                className="student-add-btn"
                onClick={() => navigate('/dashboard/students/add')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add New Student
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="student-table-wrap">
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Institution</th>
                  <th>Country</th>
                  <th>Age Group</th>
                  <th>Status</th>
                  <th>Subscription</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS.map((student, i) => (
                  <tr key={i}>
                    <td>{student.id}</td>
                    <td>
                      <div className="student-name-cell">
                        <div className="student-avatar">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="#1ba8d5" strokeWidth={2}>
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                          </svg>
                        </div>
                        {student.name}
                      </div>
                    </td>
                    <td>{student.role}</td>
                    <td>{student.institution}</td>
                    <td>{student.country}</td>
                    <td>{student.ageGroup}</td>
                    <td>
                      <label className="student-toggle">
                        <input type="checkbox" checked={student.status} readOnly />
                        <span className="student-toggle-slider" />
                      </label>
                    </td>
                    <td>
                      <span className={`student-badge ${student.subscription.toLowerCase()}`}>
                        {student.subscription}
                      </span>
                    </td>
                    <td>
                      <div className="student-action-group">
                        {/* Eye — opens view modal */}
                        <button
                          className="student-action-btn"
                          aria-label={`View ${student.name}`}
                          onClick={() => setSelectedStudent(student)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        {/* Settings */}
                        <button className="student-action-btn" aria-label="Settings">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="student-pagination">
            <button className="student-page-btn" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Previous
            </button>
            <div className="student-page-numbers">
              {[1,2,3].map((n) => (
                <button key={n} className={`student-page-num${n === 1 ? ' active' : ''}`}>{n}</button>
              ))}
              <span className="student-page-dots">...</span>
              {[8,9,10].map((n) => (
                <button key={n} className="student-page-num">{n}</button>
              ))}
            </div>
            <button className="student-page-btn">
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ── Student View Modal ── */}
      {selectedStudent && (
        <StudentViewModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

    </div>
  );
}
