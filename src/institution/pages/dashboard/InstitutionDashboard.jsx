import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import './institutiondashboard.css';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const ACTIVITY_DATA = [
  { day: 'Mon', v: 118 },
  { day: 'Tue', v: 136 },
  { day: 'Wed', v: 150 },
  { day: 'Thu', v: 165 },
  { day: 'Fri', v: 153 },
  { day: 'Sat', v: 210 },
  { day: 'Sun', v: 138 },
];

const COURSE_USAGE = [
  { name: 'Coding',      value: 38, color: '#1ba8d5' },
  { name: 'Electronics', value: 27, color: '#f59e0b' },
  { name: 'Mechanics',   value: 15, color: '#a855f7' },
  { name: 'Robotics',    value: 20, color: '#1e293b' },
];

const ENGAGEMENT_DATA = [
  { label: 'Mon', v: 77  },
  { label: 'Tue', v: 70  },
  { label: 'Wed', v: 60  },
  { label: 'Thu', v: 90  },
  { label: 'Fri', v: 50  },
  { label: 'Sat', v: 75  },
  { label: 'Sun', v: 75  },
];

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const StudentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const InstructorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const AssignIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5zM6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const ReportIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4zm15 0h1v11h-1zM9 10h1v11H9zm5 0h1v11h-1z"/>
  </svg>
);

/* ─────────────────────────────────────────
   AREA TOOLTIP
───────────────────────────────────────── */
function AreaTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="idash-tooltip">
      <div className="idash-tooltip-label">Students</div>
      <div className="idash-tooltip-value">{payload[0].value}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PEAK BUBBLE — "Students" + "90" at Sat
───────────────────────────────────────── */
function PeakDot(props) {
  const { cx, cy, value } = props;
  if (value !== 210) {
    return <circle cx={cx} cy={cy} r={0} fill="none" />;
  }
  const bw = 62, bh = 34, br = 8, tail = 7;
  const bx = cx - bw / 2;
  const by = cy - bh - tail - 8;
  return (
    <g>
      <rect x={bx} y={by} width={bw} height={bh} rx={br} fill="#1ba8d5" />
      <polygon
        points={`${cx - 6},${by + bh} ${cx + 6},${by + bh} ${cx},${by + bh + tail}`}
        fill="#1ba8d5"
      />
      {/* "Students" — small top line */}
      <text
        x={cx} y={by + 12}
        textAnchor="middle" dominantBaseline="middle"
        fill="rgba(255,255,255,0.82)" fontSize={9.5} fontWeight={500}
      >
        Students
      </text>
      {/* "90" — large bottom line */}
      <text
        x={cx} y={by + 25}
        textAnchor="middle" dominantBaseline="middle"
        fill="#fff" fontSize={14} fontWeight={800}
      >
        90
      </text>
      <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#1ba8d5" strokeWidth={2.5} />
    </g>
  );
}

/* ─────────────────────────────────────────
   DONUT EXTERNAL LABELS
───────────────────────────────────────── */
function DonutLabel({ cx, cy, midAngle, outerRadius, value, fill }) {
  const RADIAN = Math.PI / 180;
  const r = outerRadius + 30;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill={fill}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12} fontWeight={700}>
      {value}%
    </text>
  );
}

/* ─────────────────────────────────────────
   CUSTOM ROUNDED BAR — all cyan
───────────────────────────────────────── */
function RoundedBar(props) {
  const { x, y, width, height } = props;
  if (!height || height <= 0) return null;
  const r = Math.min(5, width / 2);
  return (
    <path
      d={`M${x + r},${y}
          L${x + width - r},${y}
          Q${x + width},${y} ${x + width},${y + r}
          L${x + width},${y + height}
          L${x},${y + height}
          L${x},${y + r}
          Q${x},${y} ${x + r},${y} Z`}
      fill="#1ba8d5"
    />
  );
}

/* ─────────────────────────────────────────
   WEEKLY SELECT
───────────────────────────────────────── */
function WeeklySelect() {
  return (
    <div className="idash-select-wrap">
      <select className="idash-select" aria-label="Time range">
        <option>weekly</option>
        <option>monthly</option>
        <option>yearly</option>
      </select>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth={2.5} strokeLinecap="round"
        className="idash-select-chevron">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   DONUT CARD
───────────────────────────────────────── */
function DonutCard({ title }) {
  return (
    <div className="idash-chart-card idash-chart-card--narrow">
      <div className="idash-chart-header">
        <h3 className="idash-chart-title">{title}</h3>
        <WeeklySelect />
      </div>

      <div className="idash-donut-wrap">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart margin={{ top: 20, right: 32, bottom: 20, left: 32 }}>
            <Pie
              data={COURSE_USAGE}
              cx="50%" cy="50%"
              innerRadius={52} outerRadius={76}
              paddingAngle={3} dataKey="value"
              labelLine={false} label={DonutLabel}
              strokeWidth={0}
              startAngle={90} endAngle={-270}
            >
              {COURSE_USAGE.map(entry => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 2×2 legend — name + pct stacked, matching design */}
      <div className="idash-donut-legend">
        {COURSE_USAGE.map(item => (
          <div key={item.name} className="idash-legend-item">
            <div className="idash-legend-dot" style={{ background: item.color }} />
            <div className="idash-legend-body">
              <span className="idash-legend-name">{item.name}</span>
              <span className="idash-legend-pct">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────── */
export default function InstitutionDashboard() {
  const navigate = useNavigate();

  return (
    <div className="idash-page">

      {/* ── Page header ── */}
      <div className="idash-page-header">
        <h1 className="idash-page-title">Dashboard</h1>
        <span className="idash-breadcrumb">Dashboard</span>
      </div>

      <div className="idash-body">

        {/* ════ STATS BANNER ════ */}
        <div className="idash-stats-banner">
          <span className="idash-deco idash-deco--1" aria-hidden="true" />
          <span className="idash-deco idash-deco--2" aria-hidden="true" />
          <span className="idash-deco idash-deco--3" aria-hidden="true" />
          <div className="idash-stats-grid">

            <div className="idash-stat-card">
              <div className="idash-stat-label">Total Students</div>
              <div className="idash-stat-value">1,248</div>
            </div>

            <div className="idash-stat-card">
              <div className="idash-stat-label">Total Instructors</div>
              <div className="idash-stat-value">42</div>
            </div>

            <div className="idash-stat-card">
              <div className="idash-stat-label">Active Licenses</div>
              <div className="idash-stat-value idash-stat-value--row">
                <span>Total-1,200</span>
                <span>Total-1,200</span>
              </div>
            </div>

            <div className="idash-stat-card">
              <div className="idash-stat-label">Courses Assigned</div>
              <div className="idash-stat-value">36</div>
            </div>

          </div>
        </div>

        {/* ════ QUICK ACTIONS ════ */}
        <div className="idash-section">
          <h2 className="idash-section-title">Quick Actions</h2>
          <div className="idash-quick-actions">

            <button className="idash-quick-btn"
              onClick={() => navigate('/institution/dashboard/students')}>
              <div className="idash-quick-icon"><StudentIcon /></div>
              <span className="idash-quick-label">Add New Student</span>
              <span className="idash-quick-plus">+</span>
            </button>

            <button className="idash-quick-btn"
              onClick={() => navigate('/institution/dashboard/instructors')}>
              <div className="idash-quick-icon"><InstructorIcon /></div>
              <span className="idash-quick-label">Add New Instructor</span>
              <span className="idash-quick-plus">+</span>
            </button>

            <button className="idash-quick-btn"
              onClick={() => navigate('/institution/dashboard/courses')}>
              <div className="idash-quick-icon"><AssignIcon /></div>
              <span className="idash-quick-label">Assign Courses</span>
              <span className="idash-quick-plus">+</span>
            </button>

            <button className="idash-quick-btn"
              onClick={() => navigate('/institution/dashboard/reports')}>
              <div className="idash-quick-icon"><ReportIcon /></div>
              <span className="idash-quick-label">View Reports</span>
              <span className="idash-quick-arrow-circle">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </span>
            </button>

          </div>
        </div>

        {/* ════ CHARTS ROW 1 ════ */}
        <div className="idash-charts-row">

          {/* Student Activity */}
          <div className="idash-chart-card">
            <div className="idash-chart-header">
              <h3 className="idash-chart-title">Student Activity (Last 7 Days)</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={ACTIVITY_DATA}
                margin={{ top: 56, right: 16, left: -8, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="iActGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1ba8d5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1ba8d5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
                <XAxis dataKey="day"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false} tickLine={false}
                  domain={[100, 220]}
                  ticks={[100, 120, 140, 160, 180, 200, 220]}
                />
                <Tooltip content={<AreaTooltip />} />
                <ReferenceLine
                  x="Sat"
                  stroke="#1ba8d5"
                  strokeDasharray="4 3"
                  strokeWidth={1.5}
                  strokeOpacity={0.4}
                />
                <Area
                  type="monotone" dataKey="v"
                  stroke="#1ba8d5" strokeWidth={2.5}
                  fill="url(#iActGrad)"
                  activeDot={{ r: 6, fill: '#fff', stroke: '#1ba8d5', strokeWidth: 2.5 }}
                  dot={<PeakDot />}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Course Usage donut */}
          <DonutCard title="Course Usage" />

        </div>

        {/* ════ CHARTS ROW 2 — full width bar chart only ════ */}
        <div className="idash-chart-card">
          <div className="idash-chart-header">
            <h3 className="idash-chart-title">Course Engagement</h3>
            <WeeklySelect />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={ENGAGEMENT_DATA}
              margin={{ top: 30, right: 16, left: -8, bottom: 0 }}
              barCategoryGap="55%"
              barSize={28}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
              <XAxis dataKey="label"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false} tickLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                formatter={v => [`${v}`, 'Engagement']}
                cursor={{ fill: 'rgba(27,168,213,0.06)' }}
              />
              <Bar
                dataKey="v"
                shape={<RoundedBar />}
                label={{
                  position: 'top',
                  fontSize: 11,
                  fill: '#374151',
                  fontWeight: 600,
                  formatter: v => `${v}`,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
