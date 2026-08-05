import { useState } from 'react';

const emptyTask = {
  title: '',
  description: '',
  assignee: '',
  status: 'TODO',
  priority: 'MEDIUM',
  dueDate: ''
};

export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(task ? {
    ...task,
    dueDate: task.dueDate || ''
  } : emptyTask);

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  function submit(event) {
    event.preventDefault();
    onSave({ ...form, dueDate: form.dueDate || null });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="modal" onMouseDown={(event) => event.stopPropagation()} aria-modal="true" role="dialog">
        <div className="modal-header">
          <div>
            <span className="eyebrow">Task details</span>
            <h2>{task ? 'Edit task' : 'Create task'}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={submit} className="task-form">
          <label>Title<input value={form.title} onChange={update('title')} maxLength="120" required /></label>
          <label>Description<textarea value={form.description} onChange={update('description')} maxLength="1000" rows="4" /></label>
          <label>Assignee<input value={form.assignee} onChange={update('assignee')} maxLength="80" required /></label>
          <div className="form-row">
            <label>Status
              <select value={form.status} onChange={update('status')}>
                <option value="TODO">To do</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="REVIEW">Review</option>
                <option value="DONE">Done</option>
              </select>
            </label>
            <label>Priority
              <select value={form.priority} onChange={update('priority')}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </label>
          </div>
          <label>Due date<input type="date" value={form.dueDate} onChange={update('dueDate')} /></label>
          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button">{task ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
