import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './revenue.css';

/* ── Stat cards data ── */
const STAT_CARDS = [
  { label: 'Total Earnings',             value: '$284,592', trend: '+12.5%', up: true  },
  { label: 'Subscription Income',        value: '$94,864',  trend: '+12.5%', up: true  },
  { label: 'Annual Revenue',             value: '$1.14M',   trend: '+12.5%', up: true  },
  { label: 'Fresh Revenue',              value: '$42,350',  trend: '+12.5%', up: true  },
  { label: 'Customer Loss Rate',         value: '$8,420',   trend: '-12.5%', up: false },
  { label: 'Pending Instructor Payments',value: '$56,780',  trend: '+12.5%', up: true  },
  { label: 'Average Earnings per User',  value: '$127.50',  trend: '+12.5%', up: true  },
  { label: 'Lifetime Revenue',           value: '$8.42M',   trend: '+12.5%', up: true  },
];

/* ── Revenue Trend data ── */
const TREND_DATA = [
  { month: 'Mar', value: 25000 },
  { month: 'Apr', value: 22000 },
  { month: 'May', value: 28000 },
  { month: 'May', value: 35000 },
  { month: 'Jun', value: 30000 },
  { month: 'Aug', value: 100000 },
  { month: 'Sep', value: 45000 },
  { month: 'Oct', value: 25000 },
];

/* ── Revenue by Plan Type (donut) ── */
const PLAN_DATA = [
  { name: 'Basic 35%',      value: 35, color: '#1ba8d5' },
  { name: 'Enterprise 15%', value: 15, color: '#f59e0b' },
  { name: 'Pro 15%',        value: 15, color: '#a855f7' },
  { name: 'Premium 5%',     value: 5,  color: '#1e293b' },
  { name: 'Other',          value: 30, color: '#e5e7eb' },
];

/* ── New vs Cancelled Subscriptions ── */
const SUB_DATA = [
  { month: 'Jan', new: 80, cancelled: 20 },
  { month: 'Feb', new: 70, cancelled: 30 },
  { month: 'Mar', new: 85, cancelled: 15 },
  { month: 'Apr', new: 60, cancelled: 40 },
  { month: 'May', new: 75, cancelled: 25 },
  { month: 'Jun', new: 90, cancelled: 10 },
  { month: 'Jul', new: 65, cancelled: 35 },
];

/* ── Top Institutions by Revenue ── */
const TOP_INSTITUTIONS = [
  { name: 'Tech University',  value: 45000, max: 45000 },
  { name: 'Business School',  value: 38000, max: 45000 },
  { name: 'Design Academy',   value: 29000, max: 45000 },
  { name: 'Medical College',  value: 22000, max: 45000 },
  { name: 'Law Institute',    value: 15000, max: 45000 },
];

/* ── Stat card icon ── */
function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#1ba8d5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  );
}

/* ── Trend arrow ── */
function TrendBadge({ trend, up }) {
  return (
    <span className={`rv-trend-badge${up ? ' rv-trend-up' : ' rv-trend-down'}`}>
      {up ? '↑' : '↓'} {trend}
    </span>
  );
}

/* ── Custom tooltip for area chart ── */
function AreaTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rv-tooltip">
      <span>{payload[0].value.toLocaleString()}</span>
    </div>
  );
}

/* ── Custom donut label ── */
function renderCustomLabel({ cx, cy, midAngle, outerRadius, name, value, color }) {
  if (value < 10) return null;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 36;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central" fontSize={11} fontWeight={600}>
      {name}
    </text>
  );
}

/* ══════════════════════════════════════════
   Main component
══════════════════════════════════════════ */
export default function Revenue() {
  return (
    <div className="rv-page">

      {/* ── Page header ── */}
      <div className="rv-page-header">
        <h1 className="rv-page-title">Revenue</h1>
        <span className="rv-breadcrumb">Revenue</span>
      </div>

      <div className="rv-body">

        {/* ── Stat cards grid (2 rows × 4) ── */}
        <div className="rv-stats-grid">
          {STAT_CARDS.map((card) => (
            <div key={card.label} className="rv-stat-card">
              <div className="rv-stat-top">
                <div className="rv-stat-icon"><CardIcon /></div>
                <TrendBadge trend={card.trend} up={card.up} />
              </div>
              <div className="rv-stat-label">{card.label}</div>
              <div className="rv-stat-value">{card.value}</div>
            </div>
          ))}
        </div>

        {/* ── Charts row 1: Trend + Donut ── */}
        <div className="rv-charts-row">

          {/* Revenue Trend — area chart */}
          <div className="rv-chart-card rv-chart-card--wide">
            <h3 className="rv-chart-title">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1ba8d5" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#1ba8d5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => v >= 1000 ? `${v/1000}k` : v}/>
                <Tooltip content={<AreaTooltip />}/>
                <Area type="monotone" dataKey="value"
                  stroke="#1ba8d5" strokeWidth={2.5}
                  fill="url(#trendGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#1ba8d5', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Plan Type — donut */}
          <div className="rv-chart-card rv-chart-card--narrow">
            <h3 className="rv-chart-title">Revenue by Plan Type</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={PLAN_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {PLAN_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* ── Charts row 2: Bar + Horizontal bars ── */}
        <div className="rv-charts-row">

          {/* New vs Cancelled Subscriptions — bar chart */}
          <div className="rv-chart-card rv-chart-card--wide">
            <h3 className="rv-chart-title">New vs Cancelled Subscriptions</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={SUB_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                barCategoryGap="40%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f5" vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${v}%`}/>
                <Tooltip formatter={(v, name) => [`${v}%`, name === 'new' ? 'New' : 'Cancelled']}/>
                <Bar dataKey="new"       fill="#1ba8d5" radius={[4,4,0,0]} maxBarSize={14}/>
                <Bar dataKey="cancelled" fill="#86efac" radius={[4,4,0,0]} maxBarSize={14}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Institutions by Revenue — horizontal progress bars */}
          <div className="rv-chart-card rv-chart-card--narrow">
            <div className="rv-top-inst-header">
              <h3 className="rv-chart-title" style={{ margin: 0 }}>Top Institutions by Revenue</h3>
              <span className="rv-top-inst-badge">Revenue – 45000</span>
            </div>
            <div className="rv-top-inst-list">
              {TOP_INSTITUTIONS.map((inst) => (
                <div key={inst.name} className="rv-top-inst-row">
                  <span className="rv-top-inst-name">{inst.name}</span>
                  <div className="rv-top-inst-bar-track">
                    <div
                      className="rv-top-inst-bar-fill"
                      style={{ width: `${(inst.value / inst.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
