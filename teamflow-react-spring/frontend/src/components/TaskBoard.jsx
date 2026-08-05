import TaskCard from './TaskCard.jsx';

export default function TaskBoard({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks match the current filters.</div>;
  }

  return (
    <section className="task-grid" aria-label="Tasks">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
