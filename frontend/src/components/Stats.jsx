const cards = [
  ['total', 'Total tasks'],
  ['active', 'Active'],
  ['overdue', 'Overdue'],
  ['completed', 'Completed']
];

export default function Stats({ stats }) {
  return (
    <section className="stats-grid" aria-label="Task statistics">
      {cards.map(([key, label]) => (
        <article className="stat-card" key={key}>
          <span>{label}</span>
          <strong>{stats[key]}</strong>
        </article>
      ))}
    </section>
  );
}
