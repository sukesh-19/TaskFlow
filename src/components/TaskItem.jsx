import { Check, Pencil, Trash2, Calendar, Tag, Flag } from 'lucide-react';
import { formatDate, isOverdue, isToday } from '../utils/taskHelpers';

const PRIORITY_LABELS = { high: 'High', medium: 'Medium', low: 'Low' };
const PRIORITY_ICONS = { high: '●', medium: '●', low: '●' };

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const { id, title, description, priority, category, dueDate, completed } = task;

  const dateLabel = formatDate(dueDate);
  const overdue = !completed && isOverdue(dueDate);
  const today = !completed && isToday(dueDate);

  const dueDateClass = overdue ? 'overdue' : today ? 'due-today' : '';

  return (
    <div
      className={`task-item ${completed ? 'completed' : ''}`}
      role="article"
      aria-label={`Task: ${title}`}
    >
      
      <div className="task-checkbox-wrapper">
        <button
          id={`toggle-task-${id}`}
          className={`task-checkbox ${completed ? 'checked' : ''}`}
          onClick={() => onToggle(id)}
          aria-label={completed ? `Mark "${title}" as incomplete` : `Mark "${title}" as complete`}
          aria-pressed={completed}
          role="checkbox"
          aria-checked={completed}
        >
          {completed && <Check size={11} color="white" strokeWidth={3} aria-hidden="true" />}
        </button>
      </div>

      
      <div className="task-content">
        <div className="task-main-row">
          <span className={`task-title ${completed ? 'completed-text' : ''}`}>
            {title}
          </span>
        </div>

        {description && (
          <p className={`task-description ${completed ? 'completed-text' : ''}`}>
            {description}
          </p>
        )}

        <div className="task-meta">
          
          <span
            className={`priority-badge ${priority}`}
            aria-label={`Priority: ${PRIORITY_LABELS[priority]}`}
          >
            <Flag size={10} aria-hidden="true" />
            {PRIORITY_LABELS[priority]}
          </span>

          
          {category && (
            <span className="category-badge" aria-label={`Category: ${category}`}>
              <Tag size={10} style={{ marginRight: 3 }} aria-hidden="true" />
              {category}
            </span>
          )}

          
          {dateLabel && (
            <span
              className={`task-due-date ${dueDateClass}`}
              aria-label={`Due: ${dateLabel}${overdue ? ' — overdue' : today ? ' — due today' : ''}`}
            >
              <Calendar size={11} aria-hidden="true" />
              {overdue && <span aria-hidden="true">⚠ </span>}
              {dateLabel}
            </span>
          )}
        </div>
      </div>

      
      <div className="task-actions" role="group" aria-label={`Actions for task: ${title}`}>
        <button
          id={`edit-task-${id}`}
          className="task-action-btn edit-btn"
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${title}`}
          title="Edit task"
        >
          <Pencil size={14} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          id={`delete-task-${id}`}
          className="task-action-btn delete-btn"
          onClick={() => onDelete(task)}
          aria-label={`Delete task: ${title}`}
          title="Delete task"
        >
          <Trash2 size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
