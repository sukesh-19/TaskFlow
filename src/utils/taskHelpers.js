

export function createTask({ title, description = '', priority = 'medium', category = '', dueDate = '' }) {
  return {
    id: generateId(),
    title: title.trim(),
    description: description.trim(),
    priority,
    category: category.trim(),
    dueDate,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}


export function generateId() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}


export function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateOnly = new Date(year, month - 1, day);

    if (dateOnly.getTime() === today.getTime()) return 'Today';
    if (dateOnly.getTime() === tomorrow.getTime()) return 'Tomorrow';

    const diff = dateOnly.getTime() - today.getTime();
    const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return diffDays === -1 ? 'Yesterday' : `${Math.abs(diffDays)}d ago`;
    }
    if (diffDays < 7) return `In ${diffDays}d`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined });
  } catch {
    return null;
  }
}


export function isOverdue(dateStr) {
  if (!dateStr) return false;
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  } catch {
    return false;
  }
}


export function isToday(dateStr) {
  if (!dateStr) return false;
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  } catch {
    return false;
  }
}


export function isUpcoming(dateStr) {
  if (!dateStr) return false;
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAhead = new Date(today);
    weekAhead.setDate(today.getDate() + 7);
    return date > today && date <= weekAhead;
  } catch {
    return false;
  }
}


export function calcStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const todayTasks = tasks.filter(t => isToday(t.dueDate) && !t.completed).length;
  const overdueTasks = tasks.filter(t => isOverdue(t.dueDate) && !t.completed).length;

  return { total, completed, active, percentage, todayTasks, overdueTasks };
}


export function filterTasks(tasks, { view, search, priority, sortBy }) {
  let filtered = [...tasks];
  switch (view) {
    case 'active':
      filtered = filtered.filter(t => !t.completed);
      break;
    case 'completed':
      filtered = filtered.filter(t => t.completed);
      break;
    case 'today':
      filtered = filtered.filter(t => isToday(t.dueDate) || (isOverdue(t.dueDate) && !t.completed));
      break;
    case 'upcoming':
      filtered = filtered.filter(t => isUpcoming(t.dueDate) && !t.completed);
      break;
    default:
      break;
  }
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }
  if (priority && priority !== 'all') {
    filtered = filtered.filter(t => t.priority === priority);
  }
  switch (sortBy) {
    case 'due-asc':
      filtered.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
      break;
    case 'due-desc':
      filtered.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return b.dueDate.localeCompare(a.dueDate);
      });
      break;
    case 'priority':
      {
        const order = { high: 0, medium: 1, low: 2 };
        filtered.sort((a, b) => (order[a.priority] ?? 1) - (order[b.priority] ?? 1));
      }
      break;
    case 'az':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'created-asc':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'created-desc':
    default:
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }

  return filtered;
}


export function loadTasksFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(t =>
      t &&
      typeof t.id === 'string' &&
      typeof t.title === 'string' &&
      typeof t.completed === 'boolean'
    );
  } catch {
    return [];
  }
}


export function saveTasksToStorage(key, tasks) {
  try {
    localStorage.setItem(key, JSON.stringify(tasks));
  } catch {
  }
}


export function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export function validateTaskForm({ title }) {
  const errors = {};
  if (!title || !title.trim()) {
    errors.title = 'Task title is required.';
  } else if (title.trim().length > 200) {
    errors.title = 'Title must be 200 characters or fewer.';
  }
  return errors;
}


export const VIEWS = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'all', label: 'All Tasks', icon: 'ListTodo' },
  { id: 'today', label: 'Today', icon: 'Sun' },
  { id: 'upcoming', label: 'Upcoming', icon: 'CalendarDays' },
  { id: 'completed', label: 'Completed', icon: 'CheckCircle2' },
];

export const PRIORITIES = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const CATEGORIES = [
  'Work', 'Personal', 'Health', 'Learning', 'Shopping', 'Finance', 'Other',
];

export const SORT_OPTIONS = [
  { value: 'created-desc', label: 'Newest first' },
  { value: 'created-asc', label: 'Oldest first' },
  { value: 'due-asc', label: 'Due date ↑' },
  { value: 'due-desc', label: 'Due date ↓' },
  { value: 'priority', label: 'Priority' },
  { value: 'az', label: 'A → Z' },
];

export const PRODUCTIVITY_TIPS = [
  'Break large tasks into smaller subtasks.',
  'Set due dates to stay on track.',
  'Use priorities to focus on what matters most.',
  'Mark tasks complete to track your momentum.',
  'Review your Upcoming tasks each morning.',
  'Consistent small wins beat rare big efforts.',
];
