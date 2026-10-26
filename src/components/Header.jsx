import { Search, Moon, Sun, Plus, Menu, X } from 'lucide-react';

const VIEW_TITLES = {
  overview: 'Overview',
  all: 'All Tasks',
  today: "Today's Tasks",
  upcoming: 'Upcoming',
  completed: 'Completed',
};

export default function Header({
  activeView,
  search,
  onSearchChange,
  onNewTask,
  theme,
  onToggleTheme,
  onMenuToggle,
}) {
  const title = VIEW_TITLES[activeView] ?? 'TaskFlow';

  return (
    <header className="header" role="banner">
      <div className="header-left">
        
        <button
          className="header-menu-btn"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          id="menu-toggle-btn"
        >
          <Menu size={20} strokeWidth={2} aria-hidden="true" />
        </button>

        <h1 className="header-title">{title}</h1>
      </div>

      
      <div className="search-wrapper" role="search">
        <Search className="search-icon" aria-hidden="true" />
        <input
          id="task-search-input"
          type="search"
          className="search-input"
          placeholder="Search tasks…"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Search tasks by title or description"
          autoComplete="off"
        />
        {search && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={10} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="header-right">
        
        <button
          id="theme-toggle-btn"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light'
            ? <Moon size={16} strokeWidth={2} aria-hidden="true" />
            : <Sun size={16} strokeWidth={2} aria-hidden="true" />
          }
        </button>

        
        <button
          id="new-task-btn"
          className="btn-new-task"
          onClick={onNewTask}
          aria-label="Create new task"
        >
          <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
          <span className="btn-label">New Task</span>
        </button>
      </div>
    </header>
  );
}
