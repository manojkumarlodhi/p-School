import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const ACTIVITY_DATA = [
  { month: 'Mar', v: 320  },
  { month: 'Apr', v: 500  },
  { month: 'May', v: 580  },
  { month: 'May', v: 760  },
  { month: 'Jun', v: 660  },
  { month: 'Aug', v: 1200 },
  { month: 'Sep', v: 820  },
  { month: 'Oct', v: 560  },
];

const COURSE_USAGE = [
  { name: 'Coding',      value: 38, color: '#1ba8d5' },
  { name: 'Electronics', value: 27, color: '#f59e0b' },
  { name: 'Mechanics',   value: 15, color: '#a855f7' },
  { name: 'Robotics',    value: 20, color: '#1e293b' },
];

const PEAK_DATA = [
  { label: 'Mon', v: 77,  color: '#1ba8d5' },
  { label: 'Tue', v: 70,  color: '#1ba8d5' },
  { label: 'Wed', v: 60,  color: '#1ba8d5' },
  { label: 'Thu', v: 90,  color: '#22c55e' },
  { label: 'Fri', v: 50,  color: '#1ba8d5' },
  { label: 'Sat', v: 75,  color: '#1ba8d5' },
];

const STATS = [
  { label: 'Total User',           value: '90000'  },
  { label: 'Total Students',       value: '82,910' },
  { label: 'Total Instructors',    value: '1,284'  },
  { label: 'Total Institutions',   value: '1,182'  },
  { label: 'Active Subscriptions', value: '1,182'  },
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
const InstitutionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h1v11H4zm15 0h1v11h-1zM9 10h1v11H9zm5 0h1v11h-1z"/>
  </svg>
);
const PlanIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
  </svg>
);

/* ─────────────────────────────────────────
   AREA CHART TOOLTIP
───────────────────────────────────────── */
function AreaTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="dash-tooltip">
      <div className="dash-tooltip-value">{payload[0].value}</div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ALWAYS-VISIBLE PEAK BUBBLE (1200)
   Custom dot — only renders at value=1200
───────────────────────────────────────── */
function PeakDot(props) {
  const { cx, cy, value } = props;
  if (value !== 1200) {
    // invisible dot for other points
    return <circle cx={cx} cy={cy} r={0} fill="none" />;
  }
  const bw = 50, bh = 28, br = 7, tail = 7;
  const bx = cx - bw / 2;
  const by = cy - bh - tail - 8;
  return (
    <g>
      <rect x={bx} y={by} width={bw} height={bh} rx={br} fill="#1ba8d5" />
      <polygon
        points={`${cx - 6},${by + bh} ${cx + 6},${by + bh} ${cx},${by + bh + tail}`}
        fill="#1ba8d5"
      />
      <text
        x={cx} y={by + bh / 2 + 1}
        textAnchor="middle" dominantBaseline="middle"
        fill="#fff" fontSize={13} fontWeight={700}
      >
        {value}
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
    <text
      x={x} y={y}
      fill={fill}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12} fontWeight={700}
    >
      {value}%
    </text>
  );
}

/* ─────────────────────────────────────────
   CUSTOM BAR — rounded top, per-entry color
───────────────────────────────────────── */
function RoundedBar(props) {
  const { x, y, width, height, index } = props;
  if (!height || height <= 0) return null;
  const color = PEAK_DATA[index]?.color ?? '#1ba8d5';
  const r = Math.min(5, width / 2);
  return (
    <path
      d={`
        M${x + r},${y}
        L${x + width - r},${y}
        Q${x + width},${y} ${x + width},${y + r}
        L${x + width},${y + height}
        L${x},${y + height}
        L${x},${y + r}
        Q${x},${y} ${x + r},${y}
        Z
      `}
      fill={color}
    />
  );
}

/* ─────────────────────────────────────────
   WEEKLY SELECT
───────────────────────────────────────── */
function WeeklySelect() {
  return (
    <div className="dash-select-wrap">
      <select className="dash-select" aria-label="Time range">
        <option>weekly</option>
        <option>monthly</option>
        <option>yearly</option>
      </select>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
        stroke="#6b7280" strokeWidth={2.5} strokeLinecap="round"
        className="dash-select-chevron">
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
    <div className="dash-chart-card dash-chart-card--narrow">
      <div className="dash-chart-header">
        <h3 className="dash-chart-title">{title}</h3>
        <WeeklySelect />
      </div>

      <div className="dash-donut-wrap">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <Pie
              data={COURSE_USAGE}
              cx="50%" cy="50%"
              innerRadius={52} outerRadius={76}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={DonutLabel}
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
            >
              {COURSE_USAGE.map(entry => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 2×2 legend */}
      <div className="dash-donut-legend">
        {COURSE_USAGE.map(item => (
          <div key={item.name} className="dash-legend-item">
            <div className="dash-legend-dot" style={{ background: item.color }} />
            <div className="dash-legend-body">
              <span className="dash-legend-name">{item.name}</span>
              <span className="dash-legend-pct">{item.value}%</span>
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
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dash-page">

      {/* ── Page header ── */}
      <div className="dash-page-header">
        <h1 className="dash-page-title">Dashboard</h1>
        <span className="dash-breadcrumb">Dashboard</span>
      </div>

      <div className="dash-body">

        {/* ════ STATS BANNER ════ */}
        <div className="dash-stats-banner">
          <span className="dash-deco dash-deco--1" aria-hidden="true" />
          <span className="dash-deco dash-deco--2" aria-hidden="true" />
          <span className="dash-deco dash-deco--3" aria-hidden="true" />
          <div className="dash-stats-grid">
            {STATS.map(stat => (
              <div key={stat.label} className="dash-stat-card">
                <div className="dash-stat-label">{stat.label}</div>
                <div className="dash-stat-value">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ════ QUICK ACTIONS ════ */}
        <div className="dash-section">
          <h2 className="dash-section-title">Quick Actions</h2>
          <div className="dash-quick-actions">
            <button className="dash-quick-btn"
              onClick={() => navigate('/dashboard/students/add')}>
              <div className="dash-quick-icon"><StudentIcon /></div>
              <span className="dash-quick-label">Add New Student</span>
              <span className="dash-quick-plus">+</span>
            </button>
            <button className="dash-quick-btn"
              onClick={() => navigate('/dashboard/instructors/add')}>
              <div className="dash-quick-icon"><InstructorIcon /></div>
              <span className="dash-quick-label">Add New Instructor</span>
              <span className="dash-quick-plus">+</span>
            </button>
            <button className="dash-quick-btn"
              onClick={() => navigate('/dashboard/institutions')}>
              <div className="dash-quick-icon"><InstitutionIcon /></div>
              <span className="dash-quick-label">Add New Institution</span>
              <span className="dash-quick-plus">+</span>
            </button>
            <button className="dash-quick-btn"
              onClick={() => navigate('/dashboard/subscription-plan')}>
              <div className="dash-quick-icon"><PlanIcon /></div>
              <span className="dash-quick-label">Create New Plan</span>
              <span className="dash-quick-plus">+</span>
            </button>
          </div>
        </div>

        {/* ════ CHARTS ROW 1 ════ */}
        <div className="dash-charts-row">

          {/* User Activity — area chart */}
          <div className="dash-chart-card">
            <div className="dash-chart-header">
              <h3 className="dash-chart-title">User Activity</h3>
              <WeeklySelect />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={ACTIVITY_DATA}
                margin={{ top: 52, right: 16, left: -8, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="dashActGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1ba8d5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1ba8d5" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false} tickLine={false}
                  domain={[200, 1400]}
                  ticks={[200, 400, 600, 800, 1000, 1200, 1400]}
                />
                <Tooltip content={<AreaTooltip />} />
                <ReferenceLine
                  x="Aug"
                  stroke="#1ba8d5"
                  strokeDasharray="4 3"
                  strokeWidth={1.5}
                  strokeOpacity={0.45}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#1ba8d5"
                  strokeWidth={2.5}
                  fill="url(#dashActGrad)"
                  activeDot={{ r: 6, fill: '#fff', stroke: '#1ba8d5', strokeWidth: 2.5 }}
                  dot={<PeakDot />}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Course Usage donut */}
          <DonutCard title="Course Usage" />

        </div>

        {/* ════ CHARTS ROW 2 ════ */}
        <div className="dash-charts-row">

          {/* Platform Peak Usage Time — bar chart */}
          <div className="dash-chart-card">
            <div className="dash-chart-header">
              <h3 className="dash-chart-title">Platform Peak Usage Time</h3>
              <WeeklySelect />
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={PEAK_DATA}
                margin={{ top: 30, right: 16, left: -8, bottom: 0 }}
                barCategoryGap="55%"
                barSize={28}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tickFormatter={v => `${v}%`}
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false} tickLine={false}
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Tooltip
                  formatter={v => [`${v}%`, 'Usage']}
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
                    formatter: v => `${v}%`,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Course Usage donut (second) */}
          <DonutCard title="Course Usage" />

        </div>

      </div>
    </div>
  );
}
