const statusLabels = {
  TODO: 'To do',
  IN_PROGRESS: 'In progress',
  REVIEW: 'Review',
  DONE: 'Done'
};

export default function TaskCard({ task, onEdit, onDelete }) {
  const overdue = task.dueDate && new Date(`${task.dueDate}T23:59:59`) < new Date() && task.status !== 'DONE';

  return (
    <article className="task-card">
      <div className="task-card-header">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        <span className={`status status-${task.status.toLowerCase()}`}>{statusLabels[task.status]}</span>
      </div>
      <h2>{task.title}</h2>
      <p>{task.description || 'No description provided.'}</p>
      <div className="task-meta">
        <span>Owner: <strong>{task.assignee}</strong></span>
        <span className={overdue ? 'overdue' : ''}>
          Due: <strong>{task.dueDate || 'Not set'}</strong>
        </span>
      </div>
      <div className="task-actions">
        <button className="text-button" onClick={() => onEdit(task)}>Edit</button>
        <button className="text-button danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </article>
  );
}
