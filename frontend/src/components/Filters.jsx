export default function Filters({ filters, onChange }) {
  const update = (field) => (event) => onChange({ ...filters, [field]: event.target.value });

  return (
    <section className="filter-panel">
      <input
        value={filters.search}
        onChange={update('search')}
        placeholder="Search title, description, or assignee"
        aria-label="Search tasks"
      />
      <select value={filters.status} onChange={update('status')} aria-label="Filter by status">
        <option value="">All statuses</option>
        <option value="TODO">To do</option>
        <option value="IN_PROGRESS">In progress</option>
        <option value="REVIEW">Review</option>
        <option value="DONE">Done</option>
      </select>
      <select value={filters.priority} onChange={update('priority')} aria-label="Filter by priority">
        <option value="">All priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="CRITICAL">Critical</option>
      </select>
    </section>
  );
}
