import { useEffect, useRef } from 'react';
import { Trash2, X } from 'lucide-react';

export default function ConfirmationDialog({ task, onConfirm, onCancel }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => cancelRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onCancel();
  }

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
    >
      <div className="modal-panel confirm-modal">
        <div className="modal-header">
          <h2 id="confirm-dialog-title" className="modal-title">Delete Task</h2>
          <button
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Cancel deletion"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          <div className="confirm-icon-wrap" aria-hidden="true">
            <Trash2 size={22} strokeWidth={2} />
          </div>
          <p id="confirm-dialog-desc" className="confirm-message">
            Are you sure you want to delete{' '}
            <strong>"{task?.title}"</strong>?{' '}
            This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer">
          <button
            ref={cancelRef}
            className="btn btn-secondary"
            onClick={onCancel}
            id="confirm-cancel-btn"
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onConfirm(task.id)}
            id="confirm-delete-btn"
          >
            <Trash2 size={14} aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
