import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from '../utils/taskHelpers';

const STATUS_FILTERS = [
  { id: 'all',       label: 'All' },
  { id: 'active',    label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

const PRIORITY_FILTERS = [
  { id: 'all',    label: 'Any Priority' },
  { id: 'high',   label: '🔴 High' },
  { id: 'medium', label: '🟡 Medium' },
  { id: 'low',    label: '🟢 Low' },
];

export default function FilterBar({
  activeView,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortChange,
  resultCount,
  totalCount,
}) {
  const showStatusFilters = activeView === 'all' || activeView === 'overview';

  return (
    <div className="filter-bar" role="toolbar" aria-label="Task filters and sorting">
      
      {showStatusFilters && (
        <>
          <div className="filter-bar-section" role="group" aria-label="Filter by status">
            {STATUS_FILTERS.map(f => (
              <button
                key={f.id}
                id={`status-filter-${f.id}`}
                className={`filter-btn ${statusFilter === f.id ? 'active' : ''}`}
                onClick={() => onStatusFilterChange(f.id)}
                aria-pressed={statusFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="filter-divider" aria-hidden="true" />
        </>
      )}

      
      <div className="filter-bar-section" role="group" aria-label="Filter by priority">
        <SlidersHorizontal size={14} color="var(--color-text-muted)" aria-hidden="true" />
        <select
          id="priority-filter-select"
          className="sort-select"
          value={priorityFilter}
          onChange={e => onPriorityFilterChange(e.target.value)}
          aria-label="Filter by priority"
        >
          {PRIORITY_FILTERS.map(p => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-divider" aria-hidden="true" />

      
      <div className="filter-bar-section" role="group" aria-label="Sort tasks">
        <ArrowUpDown size={14} color="var(--color-text-muted)" aria-hidden="true" />
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
          aria-label="Sort tasks"
        >
          {SORT_OPTIONS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      
      <div className="filter-results-count" aria-live="polite" aria-atomic="true">
        {resultCount === totalCount
          ? `${totalCount} task${totalCount !== 1 ? 's' : ''}`
          : `${resultCount} of ${totalCount} task${totalCount !== 1 ? 's' : ''}`
        }
      </div>
    </div>
  );
}
