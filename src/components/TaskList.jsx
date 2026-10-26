import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

export default function TaskList({ tasks, allTasksCount, view, search, onToggle, onEdit, onDelete, onNewTask, onClearFilters }) {
  const hasFilter = search || view !== 'all' || allTasksCount !== tasks.length;

  return (
    <div className="task-list-container" role="region" aria-label="Task list">
      <div className="task-list-header">
        <span className="task-list-title">
          {tasks.length === 0 ? 'No tasks' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      <div className="task-list-body" role="list">
        {tasks.length === 0 ? (
          <EmptyState
            view={view}
            search={search}
            hasFilter={hasFilter}
            onNewTask={onNewTask}
            onClearFilters={onClearFilters}
          />
        ) : (
          tasks.map(task => (
            <div key={task.id} role="listitem">
              <TaskItem
                task={task}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
