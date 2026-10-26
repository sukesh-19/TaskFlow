import { ListTodo, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

function StatCard({ label, value, sub, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="stat-card" role="region" aria-label={label}>
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className="stat-card-icon" style={{ background: iconBg }} aria-hidden="true">
          <Icon size={16} color={iconColor} strokeWidth={2.5} />
        </div>
      </div>
      <div className="stat-card-value" aria-label={`${value} ${label}`}>{value}</div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  );
}

function ProgressCard({ stats }) {
  const { total, completed, active, percentage } = stats;
  const isFull = percentage === 100 && total > 0;

  return (
    <div className="progress-card" role="region" aria-label="Completion progress">
      <div className="progress-card-header">
        <span className="progress-card-title">Completion Progress</span>
        <span
          className="progress-percentage"
          aria-label={`${percentage}% complete`}
        >{percentage}%</span>
      </div>

      <div
        className="progress-bar-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percentage}% of tasks completed`}
      >
        <div
          className={`progress-bar-fill ${isFull ? 'full' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="progress-legend">
        <div className="progress-legend-item">
          <div className="progress-legend-dot" style={{ background: 'var(--color-success)' }} aria-hidden="true" />
          <span>{completed} completed</span>
        </div>
        <div className="progress-legend-item">
          <div className="progress-legend-dot" style={{ background: 'var(--color-accent)' }} aria-hidden="true" />
          <span>{active} active</span>
        </div>
        {total === 0 && (
          <div className="progress-legend-item" style={{ color: 'var(--color-text-muted)' }}>
            Add your first task to get started!
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardStats({ stats, onNewTask }) {
  const { total, active, completed, percentage, todayTasks, overdueTasks } = stats;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getSummaryText = () => {
    if (total === 0) return 'No tasks yet. Create your first task to get started.';
    if (active === 0 && completed > 0) return `All ${completed} task${completed !== 1 ? 's' : ''} completed. Excellent work! 🎉`;
    if (todayTasks > 0 && overdueTasks > 0) return `${todayTasks} task${todayTasks !== 1 ? 's' : ''} due today · ${overdueTasks} overdue`;
    if (todayTasks > 0) return `${todayTasks} task${todayTasks !== 1 ? 's' : ''} due today`;
    if (overdueTasks > 0) return `${overdueTasks} overdue task${overdueTasks !== 1 ? 's' : ''} need attention`;
    return `${active} active task${active !== 1 ? 's' : ''} remaining`;
  };

  return (
    <div>
      
      <div className="dashboard-welcome">
        <h1>{getGreeting()} 👋</h1>
        <p>{getSummaryText()}</p>
      </div>

      
      <div className="stats-grid">
        <StatCard
          label="Total Tasks"
          value={total}
          sub="All time"
          icon={ListTodo}
          iconBg="rgba(109,40,217,0.1)"
          iconColor="var(--color-accent)"
        />
        <StatCard
          label="Active"
          value={active}
          sub="In progress"
          icon={Clock}
          iconBg="rgba(217,119,6,0.1)"
          iconColor="var(--color-warning)"
        />
        <StatCard
          label="Completed"
          value={completed}
          sub="Tasks done"
          icon={CheckCircle2}
          iconBg="rgba(5,150,105,0.1)"
          iconColor="var(--color-success)"
        />
        <StatCard
          label="Progress"
          value={`${percentage}%`}
          sub={total > 0 ? `${completed} of ${total} done` : 'No tasks yet'}
          icon={TrendingUp}
          iconBg="rgba(109,40,217,0.1)"
          iconColor="var(--color-accent)"
        />
      </div>

      
      <ProgressCard stats={stats} />
    </div>
  );
}
