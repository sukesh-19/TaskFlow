import { ClipboardList, SearchX, Filter, Sun, CalendarDays, CheckCircle2, Plus } from 'lucide-react';

const EMPTY_CONFIGS = {
  noTasks: {
    icon: ClipboardList,
    title: 'No tasks yet',
    description: 'Create your first task and start tracking your progress.',
    actionLabel: '+ Create your first task',
    showClear: false,
  },
  search: {
    icon: SearchX,
    title: 'No results found',
    description: 'No tasks match your search. Try different keywords or clear the search.',
    actionLabel: '+ New task',
    showClear: true,
    clearLabel: 'Clear search',
  },
  filter: {
    icon: Filter,
    title: 'No matching tasks',
    description: 'No tasks match the current filters. Try adjusting the filters.',
    actionLabel: '+ New task',
    showClear: true,
    clearLabel: 'Clear filters',
  },
  today: {
    icon: Sun,
    title: 'Nothing due today',
    description: "You're all clear for today! Set due dates on tasks to see them here.",
    actionLabel: '+ Add a task for today',
    showClear: false,
  },
  upcoming: {
    icon: CalendarDays,
    title: 'Nothing upcoming',
    description: 'No tasks due in the next 7 days. Assign due dates to plan ahead.',
    actionLabel: '+ Schedule a task',
    showClear: false,
  },
  completed: {
    icon: CheckCircle2,
    title: 'No completed tasks',
    description: 'Complete some tasks to see them here. You got this!',
    actionLabel: '+ Add a task',
    showClear: false,
  },
};

export default function EmptyState({ view, search, hasFilter, onNewTask, onClearFilters }) {
  let config;

  if (search) {
    config = EMPTY_CONFIGS.search;
  } else if (hasFilter) {
    config = EMPTY_CONFIGS.filter;
  } else {
    config = EMPTY_CONFIGS[view] ?? EMPTY_CONFIGS.noTasks;
  }

  const Icon = config.icon;

  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state-icon" aria-hidden="true">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h2 className="empty-state-title">{config.title}</h2>
      <p className="empty-state-description">{config.description}</p>
      <div className="empty-state-action">
        <button className="btn btn-primary" onClick={onNewTask} id="empty-state-new-task-btn">
          <Plus size={14} aria-hidden="true" />
          {config.actionLabel}
        </button>
        {config.showClear && onClearFilters && (
          <button className="btn btn-secondary" onClick={onClearFilters} id="empty-state-clear-btn">
            {config.clearLabel}
          </button>
        )}
      </div>
    </div>
  );
}
