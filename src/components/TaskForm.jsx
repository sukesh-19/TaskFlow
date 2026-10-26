import { useState, useEffect, useRef, useCallback } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { validateTaskForm, PRIORITIES, CATEGORIES, getTodayStr } from '../utils/taskHelpers';

const DEFAULT_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  category: '',
  dueDate: '',
};

export default function TaskForm({ task, onSave, onClose }) {
  const isEdit = Boolean(task);
  const [form, setForm] = useState(() =>
    task
      ? { title: task.title, description: task.description, priority: task.priority, category: task.category, dueDate: task.dueDate }
      : { ...DEFAULT_FORM }
  );
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);
  const backdropRef = useRef(null);
  const todayStr = getTodayStr();
  useEffect(() => {
    const timer = setTimeout(() => titleRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const modal = backdropRef.current?.querySelector('.modal-panel');
      if (!modal) return;
      const focusable = modal.querySelectorAll(
        'button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
    }
  }, [errors]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      titleRef.current?.focus();
      return;
    }
    onSave(form);
  }, [form, onSave]);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="modal-backdrop"
      ref={backdropRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-panel" role="document">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {isEdit ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            id="modal-close-btn"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            
            <div className="form-field">
              <label className="form-label" htmlFor="task-title-input">
                Title <span className="required" aria-hidden="true">*</span>
              </label>
              <input
                ref={titleRef}
                id="task-title-input"
                type="text"
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="What do you need to do?"
                value={form.title}
                onChange={e => handleChange('title', e.target.value)}
                aria-required="true"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-error' : undefined}
                maxLength={200}
                autoComplete="off"
              />
              {errors.title && (
                <div id="title-error" className="form-error-message" role="alert">
                  <AlertCircle size={12} aria-hidden="true" />
                  {errors.title}
                </div>
              )}
            </div>

            
            <div className="form-field">
              <label className="form-label" htmlFor="task-description-input">
                Description <span style={{ color: 'var(--color-text-muted)', fontWeight: 400, fontSize: '0.75rem' }}>(optional)</span>
              </label>
              <textarea
                id="task-description-input"
                className="form-textarea"
                placeholder="Add a description or notes…"
                value={form.description}
                onChange={e => handleChange('description', e.target.value)}
                aria-label="Task description"
                maxLength={1000}
              />
            </div>

            
            <div className="form-row">
              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="task-priority-select">Priority</label>
                <select
                  id="task-priority-select"
                  className="form-select"
                  value={form.priority}
                  onChange={e => handleChange('priority', e.target.value)}
                >
                  {PRIORITIES.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="task-category-select">Category</label>
                <select
                  id="task-category-select"
                  className="form-select"
                  value={form.category}
                  onChange={e => handleChange('category', e.target.value)}
                >
                  <option value="">No category</option>
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            
            <div className="form-field" style={{ marginTop: 'var(--space-5)' }}>
              <label className="form-label" htmlFor="task-due-date-input">
                Due Date <span style={{ color: 'var(--color-text-muted)', fontWeight: 400, fontSize: '0.75rem' }}>(optional)</span>
              </label>
              <input
                id="task-due-date-input"
                type="date"
                className="form-input"
                value={form.dueDate}
                onChange={e => handleChange('dueDate', e.target.value)}
                aria-label="Task due date"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              id="cancel-task-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="save-task-btn"
            >
              {isEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
