import {
  LayoutDashboard, ListTodo, Sun, CalendarDays, CheckCircle2,
  ChevronLeft, ChevronRight, Zap, ClipboardList,
} from 'lucide-react';
import { PRODUCTIVITY_TIPS } from '../utils/taskHelpers';
import { useMemo } from 'react';

const ICON_MAP = {
  LayoutDashboard, ListTodo, Sun, CalendarDays, CheckCircle2,
};

const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview',   icon: 'LayoutDashboard', showCount: false },
  { id: 'all',        label: 'All Tasks',  icon: 'ListTodo',        showCount: true,  countKey: 'total' },
  { id: 'today',      label: 'Today',      icon: 'Sun',             showCount: true,  countKey: 'todayTasks' },
  { id: 'upcoming',   label: 'Upcoming',   icon: 'CalendarDays',    showCount: false },
  { id: 'completed',  label: 'Completed',  icon: 'CheckCircle2',    showCount: true,  countKey: 'completed' },
];

export default function Sidebar({ activeView, onViewChange, stats, collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const tip = useMemo(() => {
    const idx = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % PRODUCTIVITY_TIPS.length;
    return PRODUCTIVITY_TIPS[idx];
  }, []);

  function getCount(item) {
    if (!item.showCount) return null;
    const val = stats[item.countKey];
    return val ?? null;
  }

  return (
    <>
      
      <div
        className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        aria-label="Application navigation"
      >
        
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" aria-hidden="true">
            <ClipboardList size={18} strokeWidth={2.5} />
          </div>
          <span className="sidebar-logo-text">TaskFlow</span>
        </div>

        
        <nav className="sidebar-nav" aria-label="Main navigation">
          <div className="sidebar-section-label">Navigation</div>
          {NAV_ITEMS.map(item => {
            const Icon = ICON_MAP[item.icon];
            const count = getCount(item);
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => { onViewChange(item.id); onCloseMobile(); }}
                aria-current={isActive ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="nav-icon" size={16} strokeWidth={2} aria-hidden="true" />
                <span className="nav-label">{item.label}</span>
                {count !== null && <span className="nav-count" aria-label={`${count} tasks`}>{count}</span>}
              </button>
            );
          })}
        </nav>

        
        <div className="sidebar-footer">
          <button
            className="sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed
              ? <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
              : <ChevronLeft size={14} strokeWidth={2.5} aria-hidden="true" />
            }
          </button>

          <div className="sidebar-tip" role="note" aria-label="Productivity tip">
            <div className="sidebar-tip-title">
              <Zap size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} aria-hidden="true" />
              Tip of the day
            </div>
            <div className="sidebar-tip-text">{tip}</div>
          </div>
        </div>
      </aside>
    </>
  );
}
